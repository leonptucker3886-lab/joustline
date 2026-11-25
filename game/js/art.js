// Procedural artwork: sky, crowd, lists, knights. No bitmap assets anywhere.

const TAU = Math.PI * 2;
const rnd = (a, b) => a + Math.random() * (b - a);

let cache = { W: 0, H: 0, bg: null, crowd: [], posts: [] };

/* ---------------------------------------------------------------- utils */

function rr(ctx, x, y, w, h, r) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

function limb(ctx, ax, ay, bx, by, l1, l2, bend, w, color) {
  let dx = bx - ax;
  let dy = by - ay;
  let d = Math.hypot(dx, dy) || 0.001;
  const maxd = l1 + l2 - 0.5;
  if (d > maxd) {
    const s = maxd / d;
    bx = ax + dx * s;
    by = ay + dy * s;
    dx = bx - ax;
    dy = by - ay;
    d = maxd;
  }
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const ux = dx / d;
  const uy = dy / d;
  const kx = ax + ux * a - uy * h * bend;
  const ky = ay + uy * a + ux * h * bend;
  ctx.strokeStyle = color;
  ctx.lineWidth = w;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.quadraticCurveTo(kx, ky, bx, by);
  ctx.stroke();
}

/* ------------------------------------------------------------- backdrop */

function paintBackdrop(W, H, dpr) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(W * dpr));
  c.height = Math.max(1, Math.round(H * dpr));
  const g = c.getContext('2d');
  g.scale(dpr, dpr);

  const hz = H * 0.5;

  // sky
  const sky = g.createLinearGradient(0, 0, 0, hz * 1.15);
  sky.addColorStop(0, '#a9c6d6');
  sky.addColorStop(0.42, '#cfe0e0');
  sky.addColorStop(0.78, '#eee1c0');
  sky.addColorStop(1, '#f7eed6');
  g.fillStyle = sky;
  g.fillRect(0, 0, W, hz * 1.16);

  // gold-leaf flecks where an illuminator would have laid the burnish
  for (let i = 0; i < 18; i++) {
    const sx = Math.random() * W;
    const sy = Math.random() * hz * 0.5;
    const a = 0.08 + Math.random() * 0.22;
    g.fillStyle = `rgba(169,130,42,${a})`;
    g.beginPath();
    g.arc(sx, sy, Math.random() * 1.2 + 0.3, 0, TAU);
    g.fill();
  }

  // sun
  const sx = W * 0.72;
  const sy = hz * 0.88;
  const glow = g.createRadialGradient(sx, sy, 1, sx, sy, H * 0.34);
  glow.addColorStop(0, 'rgba(255,246,205,0.85)');
  glow.addColorStop(0.18, 'rgba(240,205,110,0.38)');
  glow.addColorStop(0.55, 'rgba(201,162,39,0.12)');
  glow.addColorStop(1, 'rgba(201,162,39,0)');
  g.fillStyle = glow;
  g.beginPath();
  g.arc(sx, sy, H * 0.34, 0, TAU);
  g.fill();
  // gilded sun with illumination rays, the way a missal would have it
  g.strokeStyle = 'rgba(169,130,42,0.5)';
  g.lineWidth = 1.1;
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * TAU;
    const r1 = H * 0.055;
    const r2 = H * 0.055 + H * (i % 2 ? 0.018 : 0.032);
    g.beginPath();
    g.moveTo(sx + Math.cos(a) * r1, sy + Math.sin(a) * r1);
    g.lineTo(sx + Math.cos(a) * r2, sy + Math.sin(a) * r2);
    g.stroke();
  }
  g.fillStyle = '#e9cf84';
  g.beginPath();
  g.arc(sx, sy, H * 0.042, 0, TAU);
  g.fill();
  g.strokeStyle = 'rgba(138,106,26,0.75)';
  g.lineWidth = 1.2;
  g.stroke();

  // far hills
  const drawHills = (amp, yOff, color, alpha, freq, phase) => {
    g.globalAlpha = alpha;
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(-10, hz + 4);
    for (let x = -10; x <= W + 10; x += 8) {
      const y = hz - yOff + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.7 + phase * 2) * amp * 0.3;
      g.lineTo(x, y);
    }
    g.lineTo(W + 10, hz + 4);
    g.closePath();
    g.fill();
    g.globalAlpha = 1;
  };
  drawHills(H * 0.035, H * 0.055, '#93a271', 0.8, 0.006, 0.6);
  drawHills(H * 0.024, H * 0.028, '#6f8257', 0.9, 0.009, 2.1);

  // castle on the horizon
  const cx = W * 0.16;
  const cy = hz + 2;
  g.fillStyle = '#6b5334';
  const tower = (tx, tw, th) => {
    g.fillRect(tx, cy - th, tw, th);
    for (let i = 0; i < tw / 6; i++) g.fillRect(tx + i * 6, cy - th - 5, 3.4, 6);
  };
  tower(cx - 26, 13, H * 0.075);
  tower(cx - 6, 17, H * 0.105);
  tower(cx + 16, 11, H * 0.066);
  g.fillRect(cx - 34, cy - H * 0.05, 62, H * 0.05);
  // banner
  g.strokeStyle = '#6b5334';
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(cx + 2, cy - H * 0.105 - 5);
  g.lineTo(cx + 2, cy - H * 0.13);
  g.stroke();
  g.fillStyle = '#8f2233';
  g.beginPath();
  g.moveTo(cx + 2, cy - H * 0.13);
  g.lineTo(cx + 14, cy - H * 0.124);
  g.lineTo(cx + 2, cy - H * 0.118);
  g.closePath();
  g.fill();

  // haze on the horizon
  const haze = g.createLinearGradient(0, hz - H * 0.07, 0, hz + 2);
  haze.addColorStop(0, 'rgba(247,238,214,0)');
  haze.addColorStop(1, 'rgba(247,238,214,0.72)');
  g.fillStyle = haze;
  g.fillRect(0, hz - H * 0.07, W, H * 0.075);

  // crowd (ink silhouettes along the far hillside, above the sand line)
  const crowd = [];
  const baseY = H * 0.435;
  for (let row = 0; row < 4; row++) {
    const y = baseY + row * H * 0.017;
    const r = 3.4 + row * 1.1;
    for (let x = -10; x < W + 20; x += r * 2.3 + Math.random() * 5) {
      crowd.push({
        x: x + rnd(-3, 3),
        y: y + rnd(-2, 2),
        r: r * rnd(0.8, 1.2),
        ph: Math.random() * TAU,
        tent: Math.random() < 0.18 ? rnd(0, 1) : -1,
      });
    }
  }
  g.fillStyle = '#4a3a24';
  for (const p of crowd) {
    g.beginPath();
    g.arc(p.x, p.y, p.r, 0, TAU);
    g.fill();
    g.fillRect(p.x - p.r * 0.8, p.y + p.r * 0.6, p.r * 1.6, p.r * 1.5);
  }

  // far stands / tent stripes
  g.globalAlpha = 0.5;
  for (let i = 0; i < 10; i++) {
    const x = (W / 10) * i;
    g.fillStyle = i % 2 ? '#9e2b25' : '#2f5aa8';
    g.beginPath();
    g.moveTo(x, baseY - H * 0.005);
    g.lineTo(x + W / 20, baseY - H * 0.005);
    g.lineTo(x + W / 20 + 8, baseY + H * 0.02);
    g.lineTo(x - 8, baseY + H * 0.02);
    g.closePath();
    g.fill();
  }
  g.globalAlpha = 1;

  // Marginalia is static: bake it into the backdrop instead of redrawing the
  // snail and rabbit on every frame.
  drawMarginalia(g, W, H);

  return c;
}

export function prepare(W, H, dpr) {
  cache = {
    W,
    H,
    bg: paintBackdrop(W, H, dpr),
    crowd: [],
    posts: [],
  };
  // pennants that line the lists
  const n = Math.ceil(W / 54) + 2;
  for (let i = 0; i < n; i++) cache.posts.push(i);
}

/* --------------------------------------------------------------- scene */

export function drawArena(ctx, { W, H, t, scroll, groundY }) {
  const hz = H * 0.5;

  if (cache.bg) ctx.drawImage(cache.bg, 0, 0, W, H);

  // ---- tilt barrier & fence (far side of the lists)
  const fenceY = groundY - H * 0.012;
  const fh = H * 0.05;
  ctx.save();
  ctx.fillStyle = '#6b5334';
  ctx.fillRect(0, fenceY - fh, W, fh + H * 0.02);

  const spacing = Math.max(38, W * 0.11);
  const off = -((scroll * 0.55) % spacing);
  for (let i = -1; i * spacing + off < W + spacing; i++) {
    const x = i * spacing + off;
    ctx.fillStyle = '#8a6a3a';
    ctx.fillRect(x, fenceY - fh - H * 0.012, Math.max(4, W * 0.012), fh + H * 0.012);
    ctx.fillStyle = 'rgba(255,248,224,0.28)';
    ctx.fillRect(x, fenceY - fh - H * 0.012, Math.max(1.5, W * 0.003), fh);
    // pennant
    ctx.fillStyle = i % 3 === 0 ? '#9e2b25' : i % 3 === 1 ? '#2f5aa8' : '#c9a227';
    const pw = W * 0.03;
    const wave = Math.sin(t * 2.4 + i) * 2;
    ctx.beginPath();
    ctx.moveTo(x + pw * 0.3, fenceY - fh - H * 0.012);
    ctx.lineTo(x + pw * 0.3 + pw, fenceY - fh + wave * 0.5);
    ctx.lineTo(x + pw * 0.3, fenceY - fh + H * 0.016);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // ---- ground
  // These three fills cover most of the screen and never change, so build the
  // gradients once per layout instead of allocating a new one every frame.
  if (!cache.ground) {
    const g1 = ctx.createLinearGradient(0, hz, 0, H);
    g1.addColorStop(0, '#dcc28c');
    g1.addColorStop(0.35, '#cbae78');
    g1.addColorStop(1, '#a9895c');

    const g2 = ctx.createLinearGradient(0, groundY - H * 0.02, 0, H);
    g2.addColorStop(0, 'rgba(255,246,214,0.5)');
    g2.addColorStop(0.45, 'rgba(222,186,128,0.3)');
    g2.addColorStop(1, 'rgba(150,116,70,0)');

    const g3 = ctx.createRadialGradient(W * 0.5, groundY, H * 0.12, W * 0.5, groundY, H * 0.92);
    g3.addColorStop(0, 'rgba(90,64,30,0)');
    g3.addColorStop(0.72, 'rgba(90,64,30,0.1)');
    g3.addColorStop(1, 'rgba(74,52,22,0.3)');

    cache.ground = { gg: g1, tg: g2, vg: g3 };
  }
  const { gg, tg, vg } = cache.ground;
  ctx.fillStyle = gg;
  ctx.fillRect(0, hz, W, H - hz);

  // sand track band
  ctx.fillStyle = tg;
  ctx.fillRect(0, groundY - H * 0.02, W, H - groundY);

  // speed streaks on the dirt
  ctx.save();
  ctx.lineCap = 'round';
  for (let i = 0; i < 22; i++) {
    const seed = i * 97.13;
    const y = groundY + ((i * 37) % (H - groundY - 8)) + 2;
    const depth = (y - groundY) / Math.max(1, H - groundY);
    const len = 16 + (i % 5) * 22 + depth * 70;
    const sp = scroll * (0.5 + depth * 1.6);
    const x = ((seed * 7 - sp) % (W + 260) + W + 260) % (W + 260) - 130;
    ctx.strokeStyle = `rgba(90,64,30,${0.05 + depth * 0.12})`;
    ctx.lineWidth = 1 + depth * 2.4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len, y);
    ctx.stroke();
  }
  ctx.restore();

  // horizon shadow so the crowd reads against the sky
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);
}

/* ----------------------------------------------------- manuscript margin */

// Doodles a bored monk would have left in the margin: a mailed snail and a
// rabbit with a lance. Ink line-work only, so they sit under the page with the
// rest of the illumination and never fight the knights for attention.
function drawMarginalia(ctx, W, H) {
  const s = Math.max(0.55, Math.min(1.05, W / 420));
  ctx.save();
  ctx.globalAlpha = 0.42;
  ctx.strokeStyle = '#6b4a1c';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // snail in a helm, top left
  ctx.save();
  ctx.translate(W * 0.085, H * 0.095);
  ctx.scale(s, s);
  ctx.beginPath();
  for (let a = 0; a <= Math.PI * 3.4; a += 0.18) {
    const r = 1.8 + a * 2.1;
    ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-14, 10);
  ctx.quadraticCurveTo(-4, 17, 12, 9);
  ctx.quadraticCurveTo(17, 6, 15, 1);
  ctx.stroke();
  // helm dome and plume
  ctx.beginPath();
  ctx.arc(-1, -4, 7, Math.PI, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-1, -11);
  ctx.quadraticCurveTo(6, -19, 13, -15);
  ctx.stroke();
  // little lance
  ctx.beginPath();
  ctx.moveTo(-16, 7);
  ctx.lineTo(18, -9);
  ctx.stroke();
  ctx.restore();

  // rabbit with a lance, top right
  ctx.save();
  ctx.translate(W * 0.905, H * 0.1);
  ctx.scale(-s, s);
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, TAU);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-3, -5);
  ctx.quadraticCurveTo(-7, -21, -2, -22);
  ctx.quadraticCurveTo(1, -16, 0, -6);
  ctx.moveTo(3, -5);
  ctx.quadraticCurveTo(1, -21, 6, -22);
  ctx.quadraticCurveTo(8, -15, 6, -5);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(11, 8, 6, -0.4, Math.PI * 1.1);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-16, 12);
  ctx.lineTo(20, -12);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(20, -12);
  ctx.lineTo(26, -14);
  ctx.lineTo(22, -8);
  ctx.stroke();
  ctx.restore();

  // leaf flourish along the bottom margin
  ctx.globalAlpha = 0.3;
  for (const x of [W * 0.06, W * 0.94]) {
    ctx.save();
    ctx.translate(x, H * 0.965);
    ctx.scale(s, s);
    ctx.beginPath();
    ctx.moveTo(-22, 4);
    ctx.quadraticCurveTo(-8, -10, 0, 2);
    ctx.quadraticCurveTo(8, -10, 22, 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-14, 2);
    ctx.quadraticCurveTo(-9, -8, -4, 0);
    ctx.moveTo(14, 2);
    ctx.quadraticCurveTo(9, -8, 4, 0);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

export function drawCrowdCheer(ctx, { W, H, t, power }) {
  if (!cache.bg || power <= 0) return;
  const baseY = H * 0.435;
  ctx.save();
  ctx.globalAlpha = Math.min(1, power);
  ctx.fillStyle = '#4a3a24';
  ctx.beginPath(); // one path, one fill: ~130 arcs as separate draws was a stall
  for (let row = 0; row < 3; row++) {
    const y = baseY + row * H * 0.017;
    for (let x = 0; x < W; x += 9) {
      const bounce = Math.abs(Math.sin(t * 6 + x * 0.11 + row)) * 5 * power;
      ctx.moveTo(x + (x % 7) + 3.6, y - bounce);
      ctx.arc(x + (x % 7), y - bounce, 3.6, 0, TAU);
    }
  }
  ctx.fill();
  ctx.restore();
}

/* -------------------------------------------------------------- knight */

export const ART_H = 162;
export const LANCE_REACH = 118;

/** The player's own heraldry. */
export const HERO_PAL = {
  horse: '#3f3230',
  horseDark: '#241b1a',
  cloth: '#8f2233',
  cloth2: '#e8c96a',
  plate: '#dfe5ec',
  plateDark: '#8d96a3',
  plume: '#f2d98a',
};

/* ------------------------------------------------- player heraldry style */

// The player's own look: coat-of-arms field, charge, and how much horse armour
// they have bought. Only applied when drawKnight is handed HERO_PAL, so rivals
// keep their own heraldry.
let heroStyle = { pal: HERO_PAL, barding: 0, charge: 'chevron' };

export function setHeroStyle(style = {}) {
  heroStyle = {
    pal: style.pal || HERO_PAL,
    barding: Math.max(0, Math.min(4, style.barding || 0)),
    charge: style.charge || 'chevron',
  };
}

/** A charge, drawn inside a shield roughly 22 wide and 30 tall. */
function drawCharge(ctx, id, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 2.6;
  if (id === 'cross') {
    ctx.fillRect(-1.6, -10, 3.2, 18);
    ctx.fillRect(-6, -4, 12, 3.2);
  } else if (id === 'saltire') {
    ctx.beginPath();
    ctx.moveTo(-6, -8);
    ctx.lineTo(6, 8);
    ctx.moveTo(6, -8);
    ctx.lineTo(-6, 8);
    ctx.stroke();
  } else if (id === 'chevron') {
    ctx.beginPath();
    ctx.moveTo(-7, 2);
    ctx.lineTo(0, -7);
    ctx.lineTo(7, 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-7, 9);
    ctx.lineTo(0, 0);
    ctx.lineTo(7, 9);
    ctx.stroke();
  } else if (id === 'roundel') {
    ctx.beginPath();
    ctx.arc(0, -1, 5.6, 0, TAU);
    ctx.fill();
  } else if (id === 'crown') {
    ctx.beginPath();
    ctx.moveTo(-7, 6);
    ctx.lineTo(-7, -5);
    ctx.lineTo(-3.5, 0);
    ctx.lineTo(0, -7);
    ctx.lineTo(3.5, 0);
    ctx.lineTo(7, -5);
    ctx.lineTo(7, 6);
    ctx.closePath();
    ctx.fill();
  } else if (id === 'lion') {
    ctx.beginPath();
    ctx.ellipse(-1, 1, 4.8, 3.4, 0.18, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(4, -6, 3.1, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-4, 3);
    ctx.lineTo(-8, 9);
    ctx.moveTo(2, 3);
    ctx.lineTo(6, 9);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-5, -2);
    ctx.quadraticCurveTo(-11, -8, -8, -12);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(0, -1, 4.6, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Draw a mounted jouster.
 * Local units: ground at y=0, up is negative, facing +x, art height ~162.
 */
export function drawKnight(ctx, o) {
  const {
    x,
    y,
    k,
    facing = 1,
    pal: palArg,
    t = 0,
    gait = 0,
    couch = 0.7,
    lean = 0,
    down = 0,
    dim = 0,
    glow = 0,
    shieldOn = true,
  } = o;

  // The player is drawn with their own heraldry and barding; rivals are not.
  const isHero = palArg === HERO_PAL;
  const pal = isHero ? heroStyle.pal : palArg;

  ctx.save();
  ctx.translate(x, y);

  // shadow
  ctx.save();
  ctx.globalAlpha = 0.34 * (1 - dim * 0.45);
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(0, 2 * k, (58 + down * 20) * k, 8.5 * k, 0, 0, TAU);
  ctx.fill();
  ctx.restore();

  ctx.scale(facing * k, k);
  // Aim used to put a 24px canvas shadow on every stroke of the knight, which
  // is the most expensive thing on a phone screen. The rail already marks the
  // target, so the glow costs frames for nothing.
  ctx.globalAlpha = 1 - dim * 0.55;
  ctx.rotate(-lean);
  ctx.translate(0, down * 30);
  if (down > 0) ctx.rotate(down * 0.5);

  const bob = Math.sin(gait * 2) * 2.2;

  /* ---------- tail
   */
  ctx.strokeStyle = pal.horseDark;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-52, -74 + bob);
  ctx.quadraticCurveTo(-72, -60, -70, -26 + Math.sin(t * 6) * 5);
  ctx.stroke();

  /* ---------- legs (far pair first)
   */
  const legY = -52 + bob * 0.4;
  const stride = 21;
  const drawLeg = (hipX, ph, wide, color) => {
    const fx = hipX + Math.cos(ph) * stride;
    const fy = -Math.max(0, Math.sin(ph)) * 15;
    limb(ctx, hipX, legY, fx, fy, 27, 28, 1, wide, color);
    // hoof
    ctx.fillStyle = '#181316';
    ctx.beginPath();
    ctx.ellipse(fx, fy + 1, wide * 0.62, wide * 0.42, 0, 0, TAU);
    ctx.fill();
    // joint
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(hipX, legY, wide * 0.62, 0, TAU);
    ctx.fill();
  };
  drawLeg(-38, gait + 2.4, 6, pal.horseDark);
  drawLeg(30, gait + 0.5, 6, pal.horseDark);

  /* ---------- body
   */
  ctx.fillStyle = pal.horse;
  ctx.beginPath();
  ctx.moveTo(-52, -58 + bob);
  ctx.bezierCurveTo(-60, -84 + bob, -24, -94 + bob, 6, -89 + bob);
  ctx.bezierCurveTo(30, -85 + bob, 45, -78 + bob, 46, -62 + bob);
  ctx.bezierCurveTo(47, -42 + bob, 26, -34 + bob, 0, -34 + bob);
  ctx.bezierCurveTo(-26, -34 + bob, -48, -42 + bob, -52, -58 + bob);
  ctx.closePath();
  ctx.fill();

  // haunch / shoulder shading
  ctx.fillStyle = pal.horseDark;
  ctx.globalAlpha = 0.35;
  ctx.beginPath();
  ctx.ellipse(-36, -62 + bob, 18, 20, 0.2, 0, TAU);
  ctx.fill();
  ctx.globalAlpha = 1;

  /* ---------- caparison (heraldic cloth)
   */
  ctx.fillStyle = pal.cloth;
  ctx.beginPath();
  ctx.moveTo(-40, -84 + bob);
  ctx.lineTo(34, -82 + bob);
  ctx.quadraticCurveTo(40, -58 + bob, 33, -34 + bob);
  ctx.quadraticCurveTo(12, -28 + bob, -6, -33 + bob);
  ctx.quadraticCurveTo(-30, -30 + bob, -42, -38 + bob);
  ctx.quadraticCurveTo(-44, -62 + bob, -40, -84 + bob);
  ctx.closePath();
  ctx.fill();
  // trim
  ctx.strokeStyle = pal.cloth2;
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(-41, -42 + bob);
  ctx.quadraticCurveTo(-10, -30 + bob, 33, -40 + bob);
  ctx.stroke();
  // charge (a chevron)
  ctx.fillStyle = pal.cloth2;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.moveTo(-6, -74 + bob);
  ctx.lineTo(8, -58 + bob);
  ctx.lineTo(2, -58 + bob);
  ctx.lineTo(-6, -66 + bob);
  ctx.lineTo(-14, -58 + bob);
  ctx.lineTo(-20, -58 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  /* ---------- horse armour (Glow-purchased, player only)
   */
  if (isHero && heroStyle.barding > 0) {
    const lvl = heroStyle.barding;
    const trim = lvl >= 4 ? pal.cloth2 : pal.plateDark;
    // peytral across the chest
    ctx.fillStyle = pal.plate;
    ctx.beginPath();
    ctx.moveTo(-27, -78 + bob);
    ctx.quadraticCurveTo(0, -87 + bob, 26, -76 + bob);
    ctx.quadraticCurveTo(31, -58 + bob, 20, -46 + bob);
    ctx.quadraticCurveTo(0, -40 + bob, -20, -47 + bob);
    ctx.quadraticCurveTo(-31, -58 + bob, -27, -78 + bob);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = trim;
    ctx.lineWidth = lvl >= 4 ? 2.4 : 1.6;
    ctx.stroke();
    if (lvl >= 2) {
      // chanfron over the horse's face
      ctx.fillStyle = pal.plate;
      ctx.beginPath();
      ctx.moveTo(72, -124 + bob);
      ctx.quadraticCurveTo(94, -123 + bob, 100, -108 + bob);
      ctx.quadraticCurveTo(93, -99 + bob, 84, -102 + bob);
      ctx.lineTo(71, -110 + bob);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = trim;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }
    if (lvl >= 3) {
      // crinet segments down the neck
      ctx.strokeStyle = pal.plate;
      ctx.lineWidth = 6;
      for (let i = 0; i < 4; i++) {
        const p = i / 3;
        ctx.beginPath();
        ctx.moveTo(33 + p * 35, -72 - p * 35 + bob);
        ctx.lineTo(46 + p * 32, -78 - p * 33 + bob);
        ctx.stroke();
      }
    }
  }

  /* ---------- near legs
   */
  drawLeg(-32, gait + 2.9, 7, pal.horse);
  drawLeg(36, gait + 0.0, 7, pal.horse);

  /* ---------- neck + head
   */
  ctx.fillStyle = pal.horse;
  ctx.beginPath();
  ctx.moveTo(28, -70 + bob);
  ctx.bezierCurveTo(40, -92 + bob, 58, -112 + bob, 74, -120 + bob);
  ctx.lineTo(88, -104 + bob);
  ctx.bezierCurveTo(74, -96 + bob, 62, -84 + bob, 51, -62 + bob);
  ctx.closePath();
  ctx.fill();
  // head
  ctx.beginPath();
  ctx.moveTo(70, -124 + bob);
  ctx.quadraticCurveTo(92, -122 + bob, 100, -106 + bob);
  ctx.quadraticCurveTo(96, -94 + bob, 84, -96 + bob);
  ctx.lineTo(70, -104 + bob);
  ctx.closePath();
  ctx.fill();
  // ears
  ctx.beginPath();
  ctx.moveTo(68, -126 + bob);
  ctx.lineTo(71, -138 + bob);
  ctx.lineTo(77, -126 + bob);
  ctx.closePath();
  ctx.fill();
  // mane
  ctx.strokeStyle = pal.horseDark;
  ctx.lineWidth = 4;
  for (let i = 0; i < 5; i++) {
    const p = i / 4;
    ctx.beginPath();
    ctx.moveTo(34 + p * 36, -76 - p * 40 + bob);
    ctx.lineTo(26 + p * 36, -66 - p * 38 + bob);
    ctx.stroke();
  }
  // eye + bridle
  ctx.fillStyle = '#0d0a0c';
  ctx.beginPath();
  ctx.arc(84, -114 + bob, 1.9, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = pal.cloth2;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(92, -104 + bob);
  ctx.lineTo(84, -110 + bob);
  ctx.stroke();

  /* ---------- rider
   */
  const rz = bob * 0.7;
  // leg
  ctx.strokeStyle = pal.plateDark;
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-2, -86 + rz);
  ctx.quadraticCurveTo(12, -76 + rz, 14, -62 + rz);
  ctx.stroke();
  ctx.fillStyle = '#211a1c';
  ctx.beginPath();
  ctx.ellipse(16, -58 + rz, 6, 4, 0, 0, TAU);
  ctx.fill();

  // torso
  ctx.fillStyle = pal.plate;
  ctx.beginPath();
  ctx.moveTo(-10, -124 + rz);
  ctx.quadraticCurveTo(6, -130 + rz, 16, -118 + rz);
  ctx.quadraticCurveTo(18, -100 + rz, 8, -86 + rz);
  ctx.lineTo(-10, -88 + rz);
  ctx.quadraticCurveTo(-16, -106 + rz, -10, -124 + rz);
  ctx.closePath();
  ctx.fill();
  // tabard
  ctx.fillStyle = pal.cloth;
  ctx.beginPath();
  ctx.moveTo(-2, -118 + rz);
  ctx.lineTo(14, -114 + rz);
  ctx.lineTo(10, -92 + rz);
  ctx.lineTo(-2, -94 + rz);
  ctx.closePath();
  ctx.fill();

  // arm to lance
  ctx.strokeStyle = pal.plate;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(4, -118 + rz);
  ctx.quadraticCurveTo(14, -112 + rz, 20, -104 + rz);
  ctx.stroke();

  // shield (facing the opponent)
  if (shieldOn) {
    ctx.save();
    ctx.translate(26, -106 + rz);
    ctx.rotate(-0.12);
    ctx.fillStyle = pal.cloth;
    ctx.beginPath();
    ctx.moveTo(-11, -14);
    ctx.lineTo(11, -14);
    ctx.quadraticCurveTo(13, 4, 0, 15);
    ctx.quadraticCurveTo(-13, 4, -11, -14);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = pal.cloth2;
    ctx.lineWidth = 2.4;
    ctx.stroke();
    ctx.fillStyle = pal.cloth2;
    drawCharge(ctx, isHero ? heroStyle.charge : 'cross', pal.cloth2);
    ctx.restore();
  }

  // helmet
  ctx.fillStyle = pal.plate;
  ctx.beginPath();
  ctx.ellipse(6, -136 + rz, 11.5, 12.5, -0.1, 0, TAU);
  ctx.fill();
  ctx.fillStyle = pal.plateDark;
  ctx.fillRect(0, -137 + rz, 18, 3);
  ctx.fillStyle = '#0b0a0c';
  ctx.fillRect(9, -134 + rz, 8, 2.2);
  // plume
  ctx.strokeStyle = pal.plume;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(4, -146 + rz);
  ctx.quadraticCurveTo(-14, -150 + rz + Math.sin(t * 5) * 3, -28, -132 + rz + Math.sin(t * 5 + 1) * 4);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.strokeStyle = pal.cloth2;
  ctx.beginPath();
  ctx.moveTo(2, -143 + rz);
  ctx.quadraticCurveTo(-18, -140 + rz, -26, -124 + rz + Math.sin(t * 5 + 2) * 4);
  ctx.stroke();

  /* ---------- lance
   */
  const ang = (1 - couch) * 0.42; // raised when not couched
  ctx.save();
  ctx.translate(20, -104 + rz);
  ctx.rotate(ang);
  const L = LANCE_REACH;
  const grad = ctx.createLinearGradient(0, 0, L, 0);
  grad.addColorStop(0, '#6b4a2f');
  grad.addColorStop(0.75, '#c9a878');
  grad.addColorStop(1, '#e6dcc0');
  ctx.strokeStyle = grad;
  ctx.lineWidth = 4.2;
  ctx.lineCap = 'butt';
  ctx.beginPath();
  ctx.moveTo(-52, 0);
  ctx.lineTo(L, 0);
  ctx.stroke();
  // vamplate
  ctx.fillStyle = pal.plate;
  ctx.beginPath();
  ctx.moveTo(4, -7);
  ctx.quadraticCurveTo(16, 0, 4, 8);
  ctx.lineTo(-2, 4);
  ctx.lineTo(-2, -4);
  ctx.closePath();
  ctx.fill();
  // pennon
  ctx.fillStyle = pal.cloth;
  const w = Math.sin(t * 7) * 4;
  ctx.beginPath();
  ctx.moveTo(L - 30, -2);
  ctx.quadraticCurveTo(L - 8, -12 + w, L - 2, -4 + w * 0.4);
  ctx.lineTo(L - 4, 0);
  ctx.closePath();
  ctx.fill();
  // steel tip
  ctx.fillStyle = '#eef2f6';
  ctx.beginPath();
  ctx.moveTo(L, -2.6);
  ctx.lineTo(L + 10, 0);
  ctx.lineTo(L, 2.6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

/* ------------------------------------------------------------- effects */

export function drawSpark(ctx, x, y, r, color, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();
  ctx.restore();
}

export function drawBanner(ctx, { x, y, w, h, t, text, color = '#8f2233' }) {
  ctx.save();
  ctx.translate(x, y);
  const wave = Math.sin(t * 3) * 3;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(w * 0.5, wave, w, 0);
  ctx.lineTo(w, h);
  ctx.quadraticCurveTo(w * 0.5, h + wave, 0, h);
  ctx.closePath();
  ctx.fill();
  if (text) {
    ctx.fillStyle = 'rgba(255,240,210,0.92)';
    ctx.font = `600 ${Math.round(h * 0.5)}px ui-serif, Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, w / 2, h / 2 + 1);
  }
  ctx.restore();
}
