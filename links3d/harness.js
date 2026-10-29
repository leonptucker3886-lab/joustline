// LeonLink Links 3D - agent-shot harness (Maj datasheet)
// Usage: open the live hole, paste into the console (or load via <script>),
// then run: leonlinkHarness.run()
// Reads leonlink.state(), takes shots via leonlink.shoot({aim, power})
// until the ball is holed, and logs every stroke.
(function () {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const log = [];
  function plan(s) {
    const dx = s.pin.x - s.ball.x, dz = s.pin.z - s.ball.z;
    const aim = (Math.atan2(dx, dz) * 180) / Math.PI; // degrees
    const d = s.distanceToPin;
    let power = s.onGreen ? Math.min(0.15 + d * 0.035, 0.6) : Math.min(0.25 + d / 160, 1);
    // lean against slope: uphill needs more, downhill less
    if (s.slope && typeof s.slope.along === 'number') power *= 1 + s.slope.along * 0.5;
    return { aim: +aim.toFixed(1), power: +Math.max(0.05, Math.min(1, power)).toFixed(3) };
  }
  async function waitAtRest(maxMs = 15000) {
    const t0 = Date.now(); let last = null;
    while (Date.now() - t0 < maxMs) {
      await sleep(250);
      const s = window.leonlink.state();
      if (s.holed || s.atRest || (last && Math.hypot(s.ball.x - last.ball.x, s.ball.z - last.ball.z) < 0.005)) return s;
      last = s;
    }
    return window.leonlink.state();
  }
  async function run(maxStrokes = 12) {
    if (!window.leonlink) throw new Error('leonlink API not found on page');
    let s = window.leonlink.state();
    while (!s.holed && log.length < maxStrokes) {
      const shot = plan(s);
      window.leonlink.shoot(shot);
      const after = await waitAtRest();
      const row = { stroke: after.strokes ?? log.length + 1, ...shot,
        before: +s.distanceToPin.toFixed(2), after: +after.distanceToPin.toFixed(2),
        holed: !!after.holed, at: new Date().toISOString() };
      log.push(row); console.log('[harness]', JSON.stringify(row));
      s = after;
    }
    console.table(log);
    return { holed: !!s.holed, strokes: log.length, log };
  }
  window.leonlinkHarness = { run, plan, log };
})();
