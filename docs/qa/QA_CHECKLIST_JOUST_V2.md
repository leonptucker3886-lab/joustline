# QA Checklist: Joust Prototype v2 (Chapter 1 vertical slice)
Status: Draft v0.1, ready for QA when a 2 is assigned. Design owner: 2nd LT Real.
Target platforms (all items): mobile browser portrait 9:16, 360px wide minimum; desktop browser as a secondary check.
Build under test: `prototype/joust.html`, `prototype/index.html`. Report bugs per `sops/Tester_SOP_v1.0.md`.

| # | Feature / area | Steps to test | Expected result | Known issues |
|---|---|---|---|---|
| 1 | Launch | Open `prototype/index.html` on a phone | Loads to title, no console errors | None logged |
| 2 | Gallop | Hold thumb on screen | Speed builds; holding too long makes the horse stumble | None logged |
| 3 | Aim | Drag reticle at low and high speed | Reticle sways, more at higher speed; can target shield, helm, chest | None logged |
| 4 | Strike | Release inside and outside gold window | Perfect / Good / Miss shown correctly; Perfect gives slow motion + haptic | Haptics depend on device support |
| 5 | Scoring | Land shield, body, helm hits | Shield/body = 1, helm = 2, unhorse = instant win | None logged |
| 6 | Passes | Play a full joust | 3 passes, about 40 s total, result screen shown | None logged |
| 7 | One-thumb play | Play with one thumb only | Every control reachable in the thumb zone | None logged |
| 8 | Opening + cutscenes | Start Chapter 1 | `opening.js` / `cutscene.js` play and can be advanced | None logged |
| 9 | Narrow screen | Set viewport to 360px wide | No clipped UI or overlapping controls | None logged |
| 10 | Exploratory | 10 minutes free play | Log anything odd with Severity + Frequency | n/a |
