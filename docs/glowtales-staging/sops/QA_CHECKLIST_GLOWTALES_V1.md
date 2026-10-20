# Glowtales (Kids Corner) — QA Checklist v1.0

Staged in joustline until leonptucker3886-lab/glowtales exists; moves to `glowtales/sops/` on migration.
Design owner: 2nd LT GMan (Team 2). Filed under Tester SOP v1.0 (Severity, Frequency: Always/Sometimes/Once, Status).

## Load
- [ ] index.html loads with no console errors (desktop Chrome, mobile Safari)
- [ ] All 33 images in `a/` load (no broken-image icons); .webp renders on Safari
- [ ] All 25 voice clips in `v/` play; no 404s in Network tab

## Story flow
- [ ] Every story opens, pages advance forward and back, ends cleanly
- [ ] Each page's voice clip matches its text/image
- [ ] Starting a new clip stops the previous one (no overlap)
- [ ] Leaving a story stops audio

## Kids-first UX
- [ ] Tap targets ≥ 44px; works with touch only
- [ ] No external links or ads reachable by a child
- [ ] Text readable at phone width; no horizontal scroll

## Migration parity (after move to GitHub)
- [ ] File count = 60 (index.html + 33 + 25 + any root assets per GLOWTALES_SOURCE_INVENTORY.md)
- [ ] Relative paths unchanged; Vercel deploy from `main` matches old deployment

## Severity guide
Blocker = can't continue testing · Critical = crash/data loss · Major = feature broken · Minor = works but wrong · Trivial = cosmetic
