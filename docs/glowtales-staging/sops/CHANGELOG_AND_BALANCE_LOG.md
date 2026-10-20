# Glowtales — Changelog & Balance Log (staging)

Staged in joustline until `leonptucker3886-lab/glowtales` exists; moves to `glowtales/sops/` on migration.
Owner: 2nd LT GMan (Team 2). Per Designer SOP v1.0, every change records old value, new value, rationale, build.

## Changelog

### v1.0.0 — migration baseline (pending repo)
- Source: Vercel static deployment (no build step) — files are original source.
- Contents: `index.html`, 33 `.webp` images in `a/`, 25 voice clips in `v/` (60 files total; see docs/GLOWTALES_SOURCE_INVENTORY.md).
- Added: `sops/` with Designer SOP v1.0, Tester SOP v1.0, QA checklist v1.0, this log.
- No content or behavior changes from the live site. Moved copy must match live 1:1.

## Balance / Content Log

| Build | Item | Old value | New value | Rationale | Live |
|-------|------|-----------|-----------|-----------|------|
| 1.0.0 | (baseline) | — | live site as-is | Migration only; no tuning | pending |

## Rules
- Any change after Approved requires another review (SOP v1.0).
- Fix that fails retest: reopen the original report and note build number.
