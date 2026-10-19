// joustline — tournament ladder (wired into joust.html Tournament mode)
// Best-of-3 passes per bout; 3 points for a win, 1 for a tie pass.
(function (g) {
  function createLadder(names) {
    return { riders: names.map(function (n) { return { name: n, pts: 0, wins: 0, losses: 0 }; }), round: 0 };
  }
  function scorePass(a, b) { // a,b = hit quality 0..3 (0 miss, 3 unhorse)
    if (a === b) return 0;
    return a > b ? 1 : -1;
  }
  function bout(ladder, iA, iB, passes) { // passes: [[a,b],...] up to 3
    var A = ladder.riders[iA], B = ladder.riders[iB], wa = 0, wb = 0;
    for (var i = 0; i < passes.length && i < 3 && wa < 2 && wb < 2; i++) {
      var r = scorePass(passes[i][0], passes[i][1]);
      if (passes[i][0] === 3 || passes[i][1] === 3) { r > 0 ? wa = 2 : r < 0 ? wb = 2 : 0; break; }
      if (r > 0) wa++; else if (r < 0) wb++; else { A.pts++; B.pts++; }
    }
    if (wa > wb) { A.pts += 3; A.wins++; B.losses++; return A.name; }
    if (wb > wa) { B.pts += 3; B.wins++; A.losses++; return B.name; }
    return null;
  }
  function standings(ladder) {
    return ladder.riders.slice().sort(function (x, y) { return y.pts - x.pts || y.wins - x.wins || x.name.localeCompare(y.name); });
  }
  g.JoustLadder = { createLadder: createLadder, bout: bout, standings: standings, scorePass: scorePass };
})(typeof window !== 'undefined' ? window : globalThis);
