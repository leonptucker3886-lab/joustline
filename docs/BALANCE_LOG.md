# Joustline Balance Log
Per Designer SOP v1.0: every change records old value, new value, rationale and build number.
Owner: 2nd LT Real. Baseline taken from `docs/MECHANICS.md` (2026-10-15).

## Baseline values (build: proto-v2)
| Area | Value | Source |
|---|---|---|
| Joust length | ~40 s, 3 passes | MECHANICS.md |
| Shield / body hit | 1 point | MECHANICS.md |
| Helm hit | 2 points | MECHANICS.md |
| Unhorse | instant win | MECHANICS.md |
| Strike grades | Perfect / Good / Miss | MECHANICS.md |
| Favor range | -100 to +100 per character | MECHANICS.md |
| Gear stats | Power, Precision, Guard, Stamina | MECHANICS.md |
| Battery mode | 30 fps | MECHANICS.md |

## Changes
| Date | Area | Old | New | Rationale | Build |
|---|---|---|---|---|---|
| 2026-10-19 | Tournament bout length | unbounded on tied passes (could run a 4th pass) | max 3 passes | Bout is best of 3 per MECHANICS.md; bug caught by unit tests | e8443b0 |
| 2026-10-19 | Tournament points (new) | n/a | win 3, tied pass 1 each, loss 0 | Baseline for ladder ranking; review after first QA pass | proto-v2 + ladder |
