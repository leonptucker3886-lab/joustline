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
