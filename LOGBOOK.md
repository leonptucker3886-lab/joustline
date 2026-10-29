# LOGBOOK — MAJ Pizzapan (pizzapan/cutscenes)

Owner: MAJ Pizzapan. Job: cutscene engine, Chapter 1 cutscenes, Bart's leg cast, pre-joust scenes.
Branch: pizzapan/cutscenes. Main is never touched.
Live: https://joustline-cutscenes-goodbyedawg-7221s-projects.vercel.app

## v0.1 — cutscene engine
- prototype/cutscene.js: scene engine (people, horses, captions, headlines).
- prototype/doctor.js: full Chapter 1 cutscene through Jack's finale.

## Self-review #1
- Riders floated off their horses. Characters stood at different floor heights. Black knight looked too close.

## Fixes
- 177027b: riders tied to the horse.
- f453a48 (2026-10-29, live): legs astride via person({seat,dir}); width-based scale; black knight moved to far lane and shrunk; one tent floor line for all standing characters; squire kept on screen; cast/wrap shown only after the doctor, when Bart is up; cart scene rebuilt; caption reads JACK; headlines scale to width.

## Current
- f453a48 live. Smoke-tested with a node mock; not yet phone-tested, no portrait screenshot yet.

## Open
- Bart's new leg cast (wider), pre-joust scenes, phone test + portrait screenshot.

## Full commit history (inspection #5 fix)
- 91155e8: doctor.js real cramp + Charles Horse diagnosis (checkpoint 1).
- e397e5c: cutscenes site start page opens the Doctor cutscene.
- 9a4538d / 1e82cfc: cutscene upgrade: lance-and-crown art style, cinematic camera, visible strike + damage.
- c19a3b8: Chapter 1 wrap: Bart carried to Paris, Jacques takes his spot.
- 177027b: riders seated on horses (rider y tied to horse).
- 186ad69: engine seated rider pose (legs astride).
- f453a48: Ch1 fix batch (see Fixes).
- c4c441d: leg cast wraps over Bart's foot, lying and standing.
- f0899f2 / cea8fce: LOGBOOK.md and reports/INSPECTIONS.md added.

## Conduct
- Inspection #5 Point 7 FAIL accepted (4 waiting posts). Corrected: posts are commit/live links only.
