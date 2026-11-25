# Changelog

## v0.5.0 (2026-11-25)
- Cutscenes rebuilt as sixteen painted illuminated-manuscript plates (generated art, `game/assets/scenes/`), one per story beat, with slow Ken Burns camera moves, crossfades, dust, a gilt plate frame and a shot progress rule.
- Captions, speaker rubrics, sound cues and skip behaviour are unchanged; the vector scene art is gone, so `scenes.js` is a thin plate player now.
- Service worker bumped to `joustline-v12`; plates are cached on first view through the existing stale-while-revalidate handler.
- Game published as a static site through Freebuff Sites (Worker serving the `game/` assets).

## v0.4.0 (2026-11-25)
- Chapter One is finished end to end: prologue, Work the Knot, then four painted scripted cutscenes (the fall, the Doctor and "a Charles Horse", the Trick and the paid ledger, and Jack taking the lance) before the lists, and a proper end card after the champion.
- New cutscene engine (`game/js/scenes.js`) with flat manuscript art, captions, tap-to-advance and a skip control; sound cues for the crowd, the hay-bale thump, the slide whistle under "A Charles Horse", the harp that cuts off when Charles appears, and the herald's trumpet.
- The squire is Jack throughout, per `docs/scenes/CH1_JACK_FINALE.md` ("Jacques, called Jack"): title tagline, prologue, the chapter's cutscenes and the end card.
- Performance: aim and strike frame times under 6x CPU throttle improved from 50-67 ms p95 to 33 ms (steady 30 fps), by removing canvas shadow blur from the knights, damage floats, meter needle and aim reticle, cutting spark counts, baking the marginalia into the arena backdrop, capping the canvas DPR at 1.5 on phones, and caching the procedural noise buffers instead of rebuilding them every cue.
- Service worker bumped to `joustline-v11` and now precaches `js/scenes.js` for offline play.

## v0.3.0 (2026-11-25)
- Chapter One vertical slice is playable at `game/` (root `index.html` redirects there).
- Combat rebuilt on the Lance & Crown engine: three timed taps a pass (gallop / aim / strike), helm-chest-shield plates, guard deflection, simultaneous blows and stamina instead of the old single tap-timing bar.
- Canon pass on the story layer: opening cramp and Work the Knot, the fall, the Doctor's "a Charles Horse", the Trick, the last order, Jack takes the lance, and the Chapter One end card ("Somebody please help Jack off the horse!").
- Last ladder rival is the Baron's champion, Sir Guichard; Bart's return stays the endgame Final Joust.
- Retinue knight option Sir Bayard replaced with the House of Montrésor, since Bayard is the Chapter 2 mentor.
- `npm start` serves the game on port 3000.
- Illuminated-manuscript reskin: parchment pages, gold-leaf page frame, rubric headings, drop caps, fleurons, daylight lists with an inked crowd, and marginalia (mailed snail, lance-bearing rabbit) drawn into the arena.
- Period sound pass: alternating hoofbeats with harness tack, a lute flourish on a perfect strike, dry ash-splinter cracks when a plate breaks or a lance lands clean, a crowd swell on every clash and a low murmur between passes. Fanfare on a win, a falling cadence on a loss, plus haptic pulses for perfect hits, shattered plates and an unhorse.
- Camera and HUD fixes for the bright palette: riders no longer cropped at the screen edges, the aim rail has its own parchment labels, and callouts sit on parchment tabs.

## v0.2.0 (2026-10-19)
- Tournament mode: prototype/ladder.js (best-of-3 bouts, unhorse ends bout, points standings), wired into prototype/joust.html via a Tournament button.
- Achievement `joustline_champion` for winning the ladder (docs/ACHIEVEMENTS.md).
- Fix: tied bout no longer runs a 4th pass (commit e8443b0).
- Tests: tests/ladder.test.js, 7 tests, `npm test`.
- QA checklist v0.2 (items 11-14) and first BALANCE_LOG entries.
- sops/: Designer + Tester SOP v1.0.

## v0.1.0 (2026-10-15)
- Prototype: opening cutscene, joust, doctor scene; design docs.
