// joustline — ladder.js unit tests. Run: node tests/ladder.test.js
require('../prototype/ladder.js');
var L = globalThis.JoustLadder, fails = 0, n = 0;
function eq(a, b, msg) { n++; if (JSON.stringify(a) !== JSON.stringify(b)) { fails++; console.log('FAIL', msg, a, b); } }
var lad = L.createLadder(['A', 'B', 'C']);
eq(L.bout(lad, 0, 1, [[2, 1], [2, 0]]), 'A', 'straight 2-0 win');
eq(lad.riders[0].pts, 3, 'winner gets 3');
eq(L.bout(lad, 1, 2, [[1, 3]]), 'C', 'unhorse ends bout at once');
eq(L.bout(lad, 0, 2, [[1, 1], [2, 1], [0, 1], [1, 0]]), null, 'only 3 passes counted');
eq(L.bout(lad, 0, 2, [[1, 1], [2, 1], [2, 0]]), 'A', 'tie pass gives both 1 pt');
eq(L.standings(lad).map(function (r) { return r.name; }), ['A', 'C', 'B'], 'standings order');
eq(L.scorePass(3, 3), 0, 'double unhorse is a tie');
var d = L.createLadder(['X', 'Y']);
eq(L.bout(d, 0, 1, [[3, 3], [2, 0]]), null, 'double unhorse ends bout as a draw');
eq([d.riders[0].pts, d.riders[1].pts], [1, 1], 'double unhorse gives both 1 pt');
console.log(n - fails + '/' + n + ' passed'); process.exit(fails ? 1 : 0);
