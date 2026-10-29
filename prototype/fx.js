// ---- Strike impact FX ----
const TIERS = {
  perfect: { label: 'PERFECT', color: '#e6b800', shake: 18, flash: 0.85, stop: 0.12, n: 40, vib: [60, 40, 140], recoil: 1, pow: 1 },
  good: { label: 'Solid', color: '#ffffff', shake: 10, flash: 0.6, stop: 0.1, n: 22, vib: [80], recoil: 0.6, pow: 0.75 },
  poor: { label: 'Glancing', color: '#cfcfcf', shake: 4, flash: 0.35, stop: 0.08, n: 8, vib: [30], recoil: 0.3, pow: 0.45 },
};
let AC = null;
export function playCue(name, power = 1) {
  if (name !== 'lance_impact') return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === 'suspended') AC.resume();
    const t = AC.currentTime, out = AC.createGain(); out.gain.value = 0.9; out.connect(AC.destination);
    const o = AC.createOscillator(), og = AC.createGain(); o.type = 'sine';
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(38, t + 0.35);
    og.gain.setValueAtTime(power, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    o.connect(og).connect(out); o.start(t); o.stop(t + 0.5);
    const len = Math.floor(AC.sampleRate * 0.25), buf = AC.createBuffer(1, len, AC.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const n = AC.createBufferSource(), f = AC.createBiquadFilter(), ng = AC.createGain();
    n.buffer = buf; f.type = 'lowpass'; f.frequency.value = 1800; ng.gain.value = 0.7 * power;
    n.connect(f).connect(ng).connect(out); n.start(t);
  } catch (e) { /* audio unavailable */ }
}
const vibrate = (p) => { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) { /* no haptics */ } };
export class StrikeFX {
  constructor() { this.stop = 0; this.shake = 0; this.flash = 0; this.parts = []; this.nums = []; this.label = null; this.reset(); }
  reset() { this.rec = { you: 0, foe: 0 }; this.unhorse = null; }
  hit({ q, hit, dmg, foeHit, taken, unhorse, cx, cy }) {
    const T = TIERS[hit ? q : 'poor'];
    this.stop = T.stop; this.shake = T.shake; this.flash = T.flash;
    this.label = { text: T.label, color: T.color, t: 0 };
    const n = hit ? T.n : 6;
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, v = 120 + Math.random() * (hit ? 380 : 150);
      this.parts.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 120, r: Math.random() * 6, life: 0.9 + Math.random() * 0.6, w: 2 + Math.random() * 6 }); }
    if (hit) { this.rec.foe = T.recoil; this.nums.push({ x: cx + 60, y: cy - 20, text: '-' + dmg, color: '#ff4040', t: 0 }); }
    else this.nums.push({ x: cx + 60, y: cy - 20, text: 'MISS', color: '#cfcfcf', t: 0 });
    if (foeHit) { this.rec.you = 0.5; this.nums.push({ x: cx - 60, y: cy - 20, text: '-' + taken, color: '#ffb000', t: 0 }); }
    if (unhorse) this.unhorse = { t: 0 };
    vibrate(hit ? T.vib : [25]);
    playCue('lance_impact', hit ? T.pow : 0.35);
  }
  update(dt) {
    this.shake = Math.max(0, this.shake - dt * 40); this.flash = Math.max(0, this.flash - dt * 3);
    for (const p of this.parts) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 600 * dt; p.r += dt * 8; p.life -= dt; }
    this.parts = this.parts.filter((p) => p.life > 0);
    for (const m of this.nums) { m.t += dt; m.y -= 40 * dt; }
    this.nums = this.nums.filter((m) => m.t < 1.4);
    if (this.label) { this.label.t += dt; if (this.label.t > 1.6) this.label = null; }
    this.rec.you = Math.max(0, this.rec.you - dt * 0.8); this.rec.foe = Math.max(0, this.rec.foe - dt * 0.8);
    if (this.unhorse) this.unhorse.t += dt;
  }
  drawParts(ctx) {
    for (const p of this.parts) { ctx.save(); ctx.globalAlpha = Math.min(1, p.life); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = '#c8a46a'; ctx.fillRect(-p.w / 2, -1.5, p.w, 3); ctx.restore(); }
  }
  drawOverlay(ctx, W, H) {
    ctx.save(); ctx.textAlign = 'center';
    for (const m of this.nums) { ctx.globalAlpha = Math.max(0, 1 - m.t / 1.4); ctx.font = 'bold 30px sans-serif';
      ctx.lineWidth = 4; ctx.strokeStyle = '#18181b'; ctx.strokeText(m.text, m.x, m.y); ctx.fillStyle = m.color; ctx.fillText(m.text, m.x, m.y); }
    if (this.label) { const L = this.label, k = Math.min(1, L.t * 8), sc = 1 + (1 - k) * 0.8;
      ctx.save(); ctx.translate(W / 2, H * 0.32); ctx.scale(sc, sc); ctx.globalAlpha = Math.max(0, Math.min(1, 1.6 - L.t));
      ctx.font = 'bold 64px sans-serif'; ctx.lineWidth = 8; ctx.strokeStyle = '#18181b'; ctx.strokeText(L.text, 0, 0);
      ctx.fillStyle = L.color; ctx.fillText(L.text, 0, 0); ctx.restore(); }
    ctx.restore();
    if (this.flash > 0) { ctx.save(); ctx.globalAlpha = this.flash; ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  }
}
export function drawBar(ctx, x, y, name, s, col) {
  ctx.save(); ctx.fillStyle = '#18181b'; ctx.fillRect(x, y, 200, 16);
  ctx.fillStyle = col; ctx.fillRect(x + 2, y + 2, 196 * Math.max(0, s.hp / s.max), 12);
  ctx.fillStyle = '#18181b'; ctx.font = '14px sans-serif'; ctx.textAlign = 'left';
  ctx.fillText(`${name} ${s.hp}/${s.max}`, x, y + 32); ctx.restore();
}
// Unlock WebAudio on first user gesture (mobile browsers require it).
if (typeof window !== 'undefined') {
  const unlock = () => { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); AC.resume(); } catch (e) { /* ignore */ } };
  window.addEventListener('pointerdown', unlock, { once: true }); window.addEventListener('keydown', unlock, { once: true });
}
