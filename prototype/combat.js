// JoustLine combat scene (bert/gameplay). Modeled on lance-and-crown js/match.js,
// reordered per Leon: PREPARE (knights hold still, no timer) -> CHARGE -> STRIKE -> RESOLVE.
export const FIGHTS = {
  first_lance:   { name: 'First Lance', foe: 'Sir Gaspard', hp: 3, skill: 0.35 },
  henri_ii:      { name: 'Saving Henri II', foe: "Montgomery's Shadow", hp: 4, skill: 0.5 },
  leonardo_helm: { name: "Leonardo's Helm", foe: 'The Iron Bishop', hp: 4, skill: 0.6 },
  catherine:     { name: "Catherine's Favor", foe: 'Chevalier Noir', hp: 5, skill: 0.7 },
  final_joust:   { name: 'The Final Joust', foe: "The Baron's Champion", hp: 6, skill: 0.8, finale: true },
};
const ZONES = [
  { id: 'head', label: 'Helm', dmg: 2, risk: 0.35, angle: 2 },
  { id: 'shield', label: 'Shield', dmg: 1, risk: 0.1, angle: 1 },
  { id: 'body', label: 'Breastplate', dmg: 1.5, risk: 0.2, angle: 0 },
];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const r1 = (v) => Math.round(v * 10) / 10;

export class Combat {
  constructor({ fightId = 'first_lance', canvas, ui, onFinish }) {
    this.f = FIGHTS[fightId]; this.cv = canvas; this.ctx = canvas.getContext('2d');
    this.ui = ui; this.onFinish = onFinish;
    this.you = { hp: 5, max: 5 }; this.foe = { hp: this.f.hp, max: this.f.hp };
    this.pass = 0; this.done = false; this.beginPass();
  }
  beginPass() {
    this.pass++; this.phase = 'prepare'; this.t = 0; this.x = 0;
    this.prep = { zone: 1, angle: 1, grip: 1 }; this.needle = 0; this.dir = 1; this.q = null;
    this.ui.prompt('PREPARE YOUR STRIKE', 'Knights hold at the lists. Pick aim, angle and grip, then CHARGE.');
    this.ui.showPrep(true, this.prep);
  }
  setPrep(k, v) { if (this.phase === 'prepare') { this.prep[k] = v; this.ui.showPrep(true, this.prep); } }
  charge() {
    if (this.phase !== 'prepare') return;
    this.phase = 'charge'; this.t = 0; this.ui.showPrep(false);
    this.ui.prompt('CHARGE!', 'Tap STRIKE when the needle hits gold');
  }
  strike() {
    if (this.phase !== 'charge' || this.q) return;
    const d = Math.abs(this.needle - 0.5); this.q = d < 0.08 ? 'perfect' : d < 0.2 ? 'good' : 'poor';
  }
  resolve() {
    this.phase = 'resolve'; this.t = 0;
    const z = ZONES[this.prep.zone];
    const fit = this.prep.angle === z.angle ? 1.25 : 0.85;
    const qm = { perfect: 1.5, good: 1, poor: 0.4 }[this.q] || 0;
    const hit = qm > 0 && Math.random() > z.risk * (this.q === 'perfect' ? 0.3 : 1);
    const dmg = hit ? r1(z.dmg * fit * qm) : 0;
    const guard = [0.6, 1, 1.3][this.prep.grip];
    const foeHit = Math.random() < this.f.skill;
    const taken = foeHit ? r1(1.2 / guard) : 0;
    this.foe.hp = r1(clamp(this.foe.hp - dmg, 0, 99)); this.you.hp = r1(clamp(this.you.hp - taken, 0, 99));
    const unhorse = dmg >= 2.5;
    this.ui.prompt(`${(this.q || 'no strike').toUpperCase()}: ${hit ? z.label + ' hit for ' + dmg : 'glanced off'}`,
      `${this.f.foe} ${foeHit ? 'struck you for ' + taken : 'missed'}${unhorse ? ' · UNHORSED!' : ''}`);
    this.after = unhorse || this.foe.hp <= 0 ? 'win' : this.you.hp <= 0 ? 'lose' : 'next';
  }
  finish(outcome) { this.done = true; this.onFinish?.({ fight: this.f, outcome }); }
  update(dt) {
    if (this.done) return; this.t += dt;
    if (this.phase === 'charge') {
      this.x = clamp(this.t / 2.3, 0, 1);
      this.needle += this.dir * dt / 0.75;
      if (this.needle > 1 || this.needle < 0) { this.dir *= -1; this.needle = clamp(this.needle, 0, 1); }
      if (this.x >= 1) this.resolve();
    } else if (this.phase === 'resolve' && this.t > 2) {
      if (this.after === 'next') this.beginPass();
      else if (this.after === 'win' && this.f.finale) { this.phase = 'choice'; this.ui.finaleChoice(); }
      else this.finish(this.after);
    }
  }
  draw() {
    const { ctx, cv } = this, W = cv.width, H = cv.height, g = H * 0.7;
    ctx.fillStyle = '#7fb3e0'; ctx.fillRect(0, 0, W, g); ctx.fillStyle = '#5c8a3a'; ctx.fillRect(0, g, W, H - g);
    ctx.fillStyle = '#8b5a2b'; ctx.fillRect(0, g - 18, W, 6);
    const gap = W * 0.38 * (1 - this.x);
    this.knight(W / 2 - 30 - gap, g, '#2a78d6', 1); this.knight(W / 2 + 30 + gap, g, '#b02a2a', -1);
    ctx.fillStyle = '#18181b'; ctx.font = '16px sans-serif';
    ctx.fillText(`${this.f.name} · Pass ${this.pass}`, 12, 22);
    ctx.fillText(`You ${this.you.hp}/${this.you.max}   ${this.f.foe} ${this.foe.hp}/${this.foe.max}`, 12, 44);
    if (this.phase === 'charge') {
      const mx = W * 0.15, mw = W * 0.7, my = H * 0.85;
      ctx.fillStyle = '#ddd'; ctx.fillRect(mx, my, mw, 14);
      ctx.fillStyle = '#e6b800'; ctx.fillRect(mx + mw * 0.42, my, mw * 0.16, 14);
      ctx.fillStyle = '#18181b'; ctx.fillRect(mx + mw * this.needle - 2, my - 6, 4, 26);
    }
  }
  knight(x, y, c, f) {
    const ctx = this.ctx; ctx.fillStyle = '#5a3d22'; ctx.fillRect(x - 28, y - 40, 56, 22);
    ctx.fillStyle = c; ctx.fillRect(x - 8, y - 70, 16, 32);
    const a = this.phase === 'prepare' ? -1.2 : -0.12 * (this.prep.angle - 1);
    ctx.strokeStyle = '#ccc'; ctx.lineWidth = 4; ctx.beginPath();
    ctx.moveTo(x, y - 58); ctx.lineTo(x + f * 70 * Math.cos(a), y - 58 + 70 * Math.sin(a)); ctx.stroke();
  }
}
