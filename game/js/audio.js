// Tiny procedural sound engine — no audio files, everything is synthesised.

let ctx = null;
let master = null;
let muted = false;

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.6;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

export function unlock() {
  ac();
}

export function setMuted(v) {
  muted = v;
  if (master) master.gain.value = v ? 0 : 0.6;
}

export function isMuted() {
  return muted;
}

// Buffers are expensive to fill on the main thread; the same handful of noise
// lengths is asked for all game long, so build each once and reuse it.
const noiseCache = new Map();
function cachedNoise(a, dur, shape) {
  const len = Math.max(1, Math.floor(a.sampleRate * dur));
  const key = shape + ':' + len;
  let buf = noiseCache.get(key);
  if (buf) return buf;
  buf = a.createBuffer(1, len, a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const k = i / len;
    const env = shape === 'decay' ? 1 - k : 0.45 + 0.55 * Math.sin(k * Math.PI);
    d[i] = (Math.random() * 2 - 1) * env;
  }
  noiseCache.set(key, buf);
  if (noiseCache.size > 16) noiseCache.delete(noiseCache.keys().next().value);
  return buf;
}

function tone({ type = 'sine', f0 = 440, f1 = f0, dur = 0.15, vol = 0.3, delay = 0, curve = 'exp' }) {
  const a = ac();
  if (!a || muted) return;
  const t0 = a.currentTime + delay;
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(Math.max(20, f0), t0);
  if (curve === 'exp') osc.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + dur);
  else osc.frequency.linearRampToValueAtTime(Math.max(20, f1), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + Math.min(0.02, dur * 0.3));
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(master);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

function noise({ dur = 0.3, vol = 0.3, delay = 0, f0 = 1200, f1 = 300, q = 1, type = 'lowpass' }) {
  const a = ac();
  if (!a || muted) return;
  const t0 = a.currentTime + delay;
  const src = a.createBufferSource();
  src.buffer = cachedNoise(a, dur, 'decay');
  const filt = a.createBiquadFilter();
  filt.type = type;
  filt.Q.value = q;
  filt.frequency.setValueAtTime(f0, t0);
  filt.frequency.exponentialRampToValueAtTime(Math.max(60, f1), t0 + dur);
  const g = a.createGain();
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filt).connect(g).connect(master);
  src.start(t0);
}

// A plucked gut string: two detuned oscillators through a closing lowpass, with
// a tiny plectrum click. Cheap, but it reads as a lute rather than a synth.
function pluck(freq, { dur = 0.6, vol = 0.12, delay = 0 } = {}) {
  const a = ac();
  if (!a || muted) return;
  const t0 = a.currentTime + delay;
  const g = a.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  const lp = a.createBiquadFilter();
  lp.type = 'lowpass';
  lp.Q.value = 0.4;
  lp.frequency.setValueAtTime(3200, t0);
  lp.frequency.exponentialRampToValueAtTime(800, t0 + dur);
  const o1 = a.createOscillator();
  o1.type = 'triangle';
  o1.frequency.value = freq;
  const o2 = a.createOscillator();
  o2.type = 'sawtooth';
  o2.frequency.value = freq * 1.004;
  const mix = a.createGain();
  mix.gain.value = 0.22;
  o1.connect(g);
  o2.connect(mix).connect(g);
  g.connect(lp).connect(master);
  o1.start(t0);
  o2.start(t0);
  o1.stop(t0 + dur + 0.05);
  o2.stop(t0 + dur + 0.05);
  noise({ dur: 0.035, vol: vol * 0.5, f0: 4200, f1: 1800, q: 0.7, type: 'bandpass', delay });
}

// Crowd noise that rises and falls instead of decaying from the first frame.
function swell(power = 0.5, dur = 1.6) {
  const a = ac();
  if (!a || muted) return;
  const t0 = a.currentTime;
  const src = a.createBufferSource();
  src.buffer = cachedNoise(a, dur, 'swell');
  const filt = a.createBiquadFilter();
  filt.type = 'bandpass';
  filt.Q.value = 0.55;
  filt.frequency.setValueAtTime(900, t0);
  filt.frequency.linearRampToValueAtTime(1700, t0 + dur * 0.55);
  filt.frequency.linearRampToValueAtTime(1100, t0 + dur);
  const g = a.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(Math.max(0.001, 0.2 * power), t0 + dur * 0.4);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filt).connect(g).connect(master);
  src.start(t0);
  src.stop(t0 + dur);
}

export const Sfx = {
  tap() {
    tone({ type: 'triangle', f0: 620, f1: 880, dur: 0.07, vol: 0.12 });
  },
  ui() {
    tone({ type: 'triangle', f0: 400, f1: 520, dur: 0.06, vol: 0.1 });
  },
  lock() {
    tone({ type: 'square', f0: 300, f1: 460, dur: 0.09, vol: 0.08 });
    tone({ type: 'sine', f0: 900, f1: 1200, dur: 0.1, vol: 0.06, delay: 0.03 });
  },
  hoof(rate = 1, phase = 0) {
    const f = 400 + (phase % 2) * 55;
    noise({ dur: 0.09, vol: 0.1 * rate, f0: f, f1: 85, q: 2.8 });
    // the occasional bit of harness tack ringing on the move
    if (Math.random() < 0.16) {
      tone({ type: 'triangle', f0: 2300, f1: 1900, dur: 0.04, vol: 0.02 * rate });
    }
  },
  whoosh() {
    noise({ dur: 0.5, vol: 0.16, f0: 2600, f1: 320, q: 0.8, type: 'bandpass' });
  },
  good() {
    tone({ type: 'triangle', f0: 520, f1: 780, dur: 0.14, vol: 0.16 });
  },
  perfect() {
    tone({ type: 'sawtooth', f0: 660, f1: 990, dur: 0.1, vol: 0.1 });
    tone({ type: 'triangle', f0: 990, f1: 1480, dur: 0.18, vol: 0.14, delay: 0.06 });
  },
  poor() {
    tone({ type: 'sine', f0: 240, f1: 130, dur: 0.2, vol: 0.16 });
  },
  impact(big = 1) {
    noise({ dur: 0.36, vol: 0.42 * big, f0: 2400, f1: 120, q: 0.6 });
    tone({ type: 'square', f0: 180, f1: 48, dur: 0.26, vol: 0.3 * big });
    tone({ type: 'triangle', f0: 90, f1: 40, dur: 0.4, vol: 0.22 * big, delay: 0.02 });
  },
  crack() {
    noise({ dur: 0.22, vol: 0.3, f0: 5200, f1: 900, q: 1.4, type: 'bandpass' });
    tone({ type: 'square', f0: 1400, f1: 400, dur: 0.1, vol: 0.1 });
  },
  // Ash shaft letting go: a broad crack, then dry wooden staves tumbling.
  splinter() {
    noise({ dur: 0.18, vol: 0.34, f0: 5200, f1: 900, q: 1.2, type: 'bandpass' });
    [1800, 1250, 2400].forEach((f, i) =>
      tone({ type: 'square', f0: f, f1: f * 0.55, dur: 0.06, vol: 0.055, delay: 0.02 + i * 0.035 })
    );
    noise({ dur: 0.3, vol: 0.16, f0: 3000, f1: 600, q: 0.8, type: 'bandpass', delay: 0.05 });
  },
  // A short lute flourish for a clean, perfect strike.
  lute() {
    [440, 587.33, 880].forEach((f, i) => pluck(f, { delay: i * 0.085, dur: 0.6, vol: 0.13 }));
    pluck(587.33, { delay: 0.34, dur: 0.95, vol: 0.075 });
  },
  crowdSwell(power = 0.5, dur = 1.6) {
    swell(power, dur);
  },
  // Canon sound cues: a hopeful harp that gets cut off, a slide whistle and a
  // hay-bale thump on every "Charles Horse", and a flat herald's trumpet.
  harp() {
    [392, 494, 587, 784].forEach((f, i) => pluck(f, { delay: i * 0.06, dur: 0.7, vol: 0.09 }));
  },
  harpCut() {
    pluck(523, { dur: 0.5, vol: 0.1 });
    pluck(659, { delay: 0.07, dur: 0.4, vol: 0.1 });
    pluck(784, { delay: 0.14, dur: 0.16, vol: 0.09 });
  },
  slide() {
    tone({ type: 'sine', f0: 700, f1: 1500, dur: 0.26, vol: 0.11 });
    tone({ type: 'sine', f0: 1500, f1: 420, dur: 0.4, vol: 0.11, delay: 0.26 });
  },
  thump() {
    tone({ type: 'sine', f0: 120, f1: 45, dur: 0.3, vol: 0.32 });
    noise({ dur: 0.16, vol: 0.13, f0: 500, f1: 100, q: 1.2 });
  },
  trumpet() {
    tone({ type: 'sawtooth', f0: 392, f1: 392, dur: 0.18, vol: 0.1 });
    tone({ type: 'sawtooth', f0: 523, f1: 523, dur: 0.34, vol: 0.1, delay: 0.16 });
    tone({ type: 'triangle', f0: 784, f1: 784, dur: 0.3, vol: 0.05, delay: 0.2 });
  },
  crowdMurmur(dur = 2.4) {
    swell(0.15, dur);
  },
  cheer() {
    noise({ dur: 1.1, vol: 0.16, f0: 900, f1: 1600, q: 0.5, type: 'bandpass' });
    noise({ dur: 0.9, vol: 0.1, f0: 1600, f1: 700, q: 0.4, type: 'bandpass', delay: 0.2 });
  },
  boo() {
    noise({ dur: 0.9, vol: 0.14, f0: 300, f1: 160, q: 0.7, type: 'lowpass' });
  },
  coin() {
    tone({ type: 'triangle', f0: 1180, f1: 1180, dur: 0.07, vol: 0.12 });
    tone({ type: 'triangle', f0: 1560, f1: 1560, dur: 0.12, vol: 0.12, delay: 0.07 });
  },
  fanfare() {
    const notes = [523, 659, 784, 1046];
    notes.forEach((f, i) => tone({ type: 'triangle', f0: f, f1: f, dur: 0.34, vol: 0.16, delay: i * 0.12 }));
  },
  defeat() {
    const notes = [392, 349, 294, 233];
    notes.forEach((f, i) => tone({ type: 'sine', f0: f, f1: f * 0.99, dur: 0.4, vol: 0.16, delay: i * 0.16 }));
  },
  upgrade() {
    [620, 830, 1240].forEach((f, i) => tone({ type: 'triangle', f0: f, f1: f * 1.02, dur: 0.18, vol: 0.14, delay: i * 0.08 }));
  },
};

export function vibrate(pattern) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {
    /* not supported — ignore */
  }
}
