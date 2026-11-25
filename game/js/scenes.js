// Cutscenes: painted miniature plates with slow camera moves, crossfades, dust
// and a parchment caption. Tap to advance, skip always there.
//
// Canon: docs/STORY_BIBLE.md v0.4 §4, docs/scenes/CH1_JACK_FINALE.md, and
// docs/CH2_PARIS.md (forced knighthood; the inn where Charles de Wierd finds
// Bart). The squire is Jacques, called Jack.

import { Sfx, unlock } from './audio.js';

const ART = './assets/scenes/';

export const SCENES = {
  fall: {
    id: 'fall',
    shots: [
      {
        img: 'fall-lists.jpg',
        d: 5.2,
        sfx: 'crowdSwell',
        cap: 'Third pass. Bart has not missed all morning.',
      },
      {
        img: 'fall-seize.jpg',
        d: 5.0,
        cap: 'He is telling the stands about it when his leg seizes.',
      },
      {
        img: 'fall-impact.jpg',
        d: 5.2,
        sfx: 'thump',
        cap: 'Not the dinner kind. The real kind.',
      },
      {
        img: 'fall-hay.jpg',
        d: 5.6,
        cap: 'The best lance in France goes over the barrier into the hay.',
      },
    ],
  },

  doctor: {
    id: 'doctor',
    shots: [
      {
        img: 'doctor-arrive.jpg',
        d: 5.4,
        cap: 'A doctor arrives before anyone has sent for one. Black velvet. The Baron\u2019s own man.',
      },
      {
        img: 'doctor-line.jpg',
        d: 5.6,
        who: 'The Baron\u2019s Doctor',
        cap: '\u201cMy lord\u2026 I must be honest with you. You may never walk again.\u201d',
      },
      {
        img: 'doctor-ale.jpg',
        d: 4.8,
        who: 'Bart',
        cap: '\u201cMm. Mm-hm. Terrible.\u2026 Is that ale?\u201d',
      },
      {
        img: 'doctor-ale.jpg',
        d: 4.6,
        who: 'The Baron\u2019s Doctor',
        cap: '\u201cGET. BACK. DOWN!\u201d',
      },
      {
        img: 'doctor-line.jpg',
        d: 5.0,
        sfx: 'slide',
        who: 'The Baron\u2019s Doctor',
        cap: '\u201cA Charles Horse.\u201d Nobody explains the joke.',
      },
      {
        img: 'doctor-charles.jpg',
        d: 5.2,
        sfx: 'harpCut',
        who: 'Charles de Wierd',
        cap: '\u201cYou called?\u201d \u2014 Nobody looks up.',
      },
      {
        img: 'ledger.jpg',
        d: 5.4,
        cap: 'The leg is wrapped twice as tight. The Baron\u2019s man writes nothing down, and remembers everything.',
      },
    ],
  },

  trick: {
    id: 'trick',
    shots: [
      {
        img: 'baron.jpg',
        d: 5.0,
        who: 'The Baron',
        cap: '\u201cCousin. The doctor tells me the worst.\u201d',
      },
      {
        img: 'baron.jpg',
        d: 5.6,
        who: 'The Baron',
        cap: '\u201cParis has the only surgeon who can save the leg. And your debts\u2026 we\u2019ll speak of them later.\u201d',
      },
      {
        img: 'ledger.jpg',
        d: 4.8,
        cap: '\u201cI still owe you?\u201d \u201cOh, terribly.\u201d',
      },
      {
        img: 'ledger.jpg',
        d: 5.2,
        cap: 'The Baron pays for everything. The surgeons. The journey. The debts. On one condition.',
      },
      {
        img: 'doctor-line.jpg',
        d: 5.2,
        who: 'Bart',
        cap: '\u201cGo to my cousin. He\u2019ll look after you, my boy.\u201d',
      },
      {
        img: 'cart.jpg',
        d: 5.2,
        sfx: 'crowdMurmur',
        cap: 'They carry him out, bed and all. In the cart he waves his goblet at the road.',
      },
      {
        img: 'corridor.jpg',
        d: 5.6,
        cap: 'In the corridor, Jack watches. No expression. He is holding the lance.',
      },
    ],
  },

  jack: {
    id: 'jack',
    shots: [
      {
        img: 'herald.jpg',
        d: 4.8,
        sfx: 'trumpet',
        who: 'The Herald',
        cap: '\u201cSir Bartholomew is called to the lance!\u201d',
      },
      {
        img: 'stand.jpg',
        d: 5.0,
        who: 'The Baron',
        cap: '\u201cA forfeit, surely. Such a shame.\u201d',
      },
      {
        img: 'jack-steps.jpg',
        d: 4.8,
        who: 'The Marshal',
        cap: '\u201cNo knight, no lance. Unless his house sends another.\u201d',
      },
      {
        img: 'jack-steps.jpg',
        d: 5.2,
        who: 'Jack',
        cap: '\u201cI carry his lance.\u201d',
      },
      {
        img: 'mounted.jpg',
        d: 5.8,
        cap: 'Two grooms lift him into Bart\u2019s saddle. The armour is far too big. The helm spins when he nods.',
      },
    ],
  },

  knighthood: {
    id: 'knighthood',
    shots: [
      {
        img: 'ch2-hall.jpg',
        d: 5.0,
        sfx: 'crowdMurmur',
        cap: 'Vaudrecourt, 1516. A sword, a cushion, and a Baron who has just thought of something.',
      },
      {
        img: 'ch2-hall.jpg',
        d: 5.6,
        who: 'The Baron',
        cap: '\u201cKneel, squire.\u201d The flat of Bart\u2019s own blade, on both shoulders. \u201cSir Jacques of Montr\u00e9sor.\u201d',
      },
      {
        img: 'ch2-hall.jpg',
        d: 5.4,
        sfx: 'trumpet',
        cap: 'The hall applauds a knight wearing another man\u2019s armour and another man\u2019s name. Nobody laughs. That is worse.',
      },
      {
        img: 'ch2-armour.jpg',
        d: 5.2,
        sfx: 'thump',
        cap: 'The helm turns round when he nods. Mildahouse sighs, and lets him climb up her neck anyway.',
      },
      {
        img: 'ch2-armour.jpg',
        d: 5.4,
        who: 'The Baron',
        cap: '\u201cYour pay. Half, for the household.\u201d Counted out on the steps, in front of the grooms, where everyone can see it is fair.',
      },
    ],
  },

  inn: {
    id: 'inn',
    shots: [
      {
        img: 'ch2-inn.jpg',
        d: 5.4,
        sfx: 'crowdMurmur',
        cap: 'The inn by the Paris gate. A candle, a bill, and a sword across his knees.',
      },
      {
        img: 'ch2-inn.jpg',
        d: 5.2,
        cap: 'He is nobody\u2019s squire now. He is still carrying somebody else\u2019s steel.',
      },
      {
        img: 'ch2-charles.jpg',
        d: 4.6,
        sfx: 'harpCut',
        who: 'Charles de Wierd',
        cap: '\u201cI FOUND HIM!\u201d The door bangs. \u201cBart! Heading for the castle! Tonight!\u201d',
      },
      {
        img: 'ch2-charles.jpg',
        d: 5.0,
        cap: 'Nobody in the taproom looks up. Charles is very used to this.',
      },
      {
        img: 'ch2-dawn.jpg',
        d: 5.8,
        sfx: 'harp',
        cap: 'The sword goes back in its sheath. In the morning there is a road, and the Baron\u2019s half of everything waiting at the end of it.',
      },
    ],
  },
};

/* --------------------------------------------------------------- plates */

const plates = new Map();

function plate(file) {
  let img = plates.get(file);
  if (!img) {
    img = new Image();
    img.decoding = 'async';
    img.src = ART + file;
    plates.set(file, img);
  }
  return img;
}

function drawPlate(g, img, W, SH, zoom, dir, alpha) {
  if (!img.complete || !img.naturalWidth) return false;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(W / iw, SH / ih) * zoom;
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (W - dw) / 2 + dir * W * 0.012;
  const dy = (SH - dh) / 2;
  g.globalAlpha = alpha;
  g.drawImage(img, dx, dy, dw, dh);
  g.globalAlpha = 1;
  return true;
}

/* --------------------------------------------------------------- player */

export function playScene(scene, onDone) {
  unlock();
  scene.shots.forEach((s) => plate(s.img));

  const wrap = document.createElement('div');
  wrap.id = 'scene';
  wrap.dataset.scene = scene.id || '';
  wrap.innerHTML =
    '<canvas></canvas>' +
    '<div class="scene-cap"><b></b><p></p><span class="scene-hint">tap to continue</span></div>' +
    '<button class="scene-skip">Skip \u203a</button>';
  document.body.appendChild(wrap);

  const cv = wrap.querySelector('canvas');
  const g = cv.getContext('2d');
  const capB = wrap.querySelector('.scene-cap b');
  const capP = wrap.querySelector('.scene-cap p');
  let W = 1;
  let H = 1;
  let vignette = null;

  const motes = Array.from({ length: 22 }, (_, i) => ({
    x: ((i * 977) % 1000) / 1000,
    y: ((i * 613) % 1000) / 1000,
    r: 0.6 + ((i * 37) % 10) / 10,
    sp: 0.004 + ((i * 13) % 10) / 1600,
  }));

  function fit() {
    const dpr = Math.min(window.devicePixelRatio || 1, W <= 560 ? 1.5 : 2);
    W = window.innerWidth;
    H = window.innerHeight;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    cv.style.width = W + 'px';
    cv.style.height = H + 'px';
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const sh = H * 0.75;
    vignette = g.createRadialGradient(W / 2, sh * 0.46, Math.min(W, sh) * 0.24, W / 2, sh * 0.46, Math.max(W, sh) * 0.76);
    vignette.addColorStop(0, 'rgba(58,42,18,0)');
    vignette.addColorStop(0.72, 'rgba(58,42,18,0.06)');
    vignette.addColorStop(1, 'rgba(58,42,18,0.34)');
  }
  fit();
  window.addEventListener('resize', fit);

  let index = 0;
  let t0 = performance.now();
  let prevIndex = -1;
  let prevAt = 0;
  let raf = 0;
  let done = false;

  function current() {
    return scene.shots[index];
  }

  function show() {
    const s = current();
    capB.textContent = s.who || '';
    capB.style.display = s.who ? 'block' : 'none';
    capP.textContent = s.cap || '';
    if (s.sfx && Sfx[s.sfx]) Sfx[s.sfx]();
    t0 = performance.now();
  }

  function finish() {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', fit);
    wrap.remove();
    if (onDone) onDone();
  }

  function next() {
    if (done) return;
    if (index >= scene.shots.length - 1) {
      finish();
      return;
    }
    prevIndex = index;
    prevAt = performance.now();
    index += 1;
    show();
  }

  wrap.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.scene-skip')) return;
    next();
  });
  wrap.querySelector('.scene-skip').addEventListener('click', (e) => {
    e.stopPropagation();
    finish();
  });

  function frame(now) {
    if (done) return;
    const s = current();
    const since = (now - t0) / 1000;
    if (since > s.d) {
      next();
      if (done) return;
    }
    const shot = current();
    const k = Math.min(1, (now - t0) / 1000 / shot.d);
    const sh = H * 0.75;
    const dir = index % 2 ? -1 : 1;
    const zoom = 1.03 + k * 0.07;

    g.clearRect(0, 0, W, H);
    g.fillStyle = '#efe2c1';
    g.fillRect(0, 0, W, H);

    // crossfade from the outgoing plate
    let faded = false;
    if (prevIndex >= 0) {
      const out = 1 - Math.min(1, (now - prevAt) / 420);
      if (out > 0) {
        const p = scene.shots[prevIndex];
        drawPlate(g, plate(p.img), W, sh, 1.1, prevIndex % 2 ? -1 : 1, out);
      }
    }
    faded = drawPlate(g, plate(shot.img), W, sh, zoom, dir, 1);

    if (!faded) {
      // still loading: a plain parchment leaf
      const leaf = g.createLinearGradient(0, 0, 0, sh);
      leaf.addColorStop(0, '#f2e6c8');
      leaf.addColorStop(1, '#d9c08a');
      g.fillStyle = leaf;
      g.fillRect(0, 0, W, sh);
    }

    // light and dust over the plate
    g.fillStyle = vignette;
    g.fillRect(0, 0, W, sh);
    g.fillStyle = 'rgba(255,240,196,0.5)';
    for (const m of motes) {
      const x = (m.x * W + now / 1000 * m.sp * W * 0.4) % W;
      const y = (m.y * sh + Math.sin(now / 900 + m.x * 9) * 6 + sh - now / 1000 * m.sp * sh * 0.5) % sh;
      g.beginPath();
      g.arc(x, y, m.r, 0, 7);
      g.fill();
    }

    // gilt frame and a thin progress rule
    g.strokeStyle = 'rgba(201,162,39,0.45)';
    g.lineWidth = 1.4;
    g.strokeRect(9.5, 9.5, W - 19, sh - 19);
    g.strokeStyle = 'rgba(255,248,226,0.3)';
    g.lineWidth = 1;
    g.strokeRect(13.5, 13.5, W - 27, sh - 27);
    g.fillStyle = 'rgba(201,162,39,0.55)';
    g.fillRect(0, 0, W * ((index + k) / scene.shots.length), 2.5);

    raf = requestAnimationFrame(frame);
  }

  show();
  raf = requestAnimationFrame(frame);
}
