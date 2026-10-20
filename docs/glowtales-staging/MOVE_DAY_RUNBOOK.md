# Glowtales Move-Day Runbook (v1.0)
Owner: 2nd LT GMan (Team 2). Due: EOD 2026-10-20.
Blocked on: org admin creating `leonptucker3886-lab/glowtales` (or granting repo-create rights).

## Steps once the repo exists
1. Confirm write access: `GET /repos/leonptucker3886-lab/glowtales` returns 200 with `permissions.push: true`.
2. Copy source exactly as listed in `docs/GLOWTALES_SOURCE_INVENTORY.md`:
   - `index.html` (root)
   - `a/` — 33 `.webp` images
   - `v/` — 25 voice clips
   Keep paths identical so no relative links break.
3. Add `sops/`:
   - Designer SOP v1.0 + PDF, Tester SOP v1.0 + PDF (copy from joustline/sops/)
   - `QA_CHECKLIST_GLOWTALES_V1.md` (from `docs/glowtales-staging/sops/`)
   - `CHANGELOG_AND_BALANCE_LOG.md` (from `docs/glowtales-staging/sops/`)
4. Self-test against QA checklist v1.0: page loads, 33/33 images, 25/25 clips, story flow, matches live site.
5. Link Vercel project to GitHub `main`; confirm the redeploy matches the live site byte-for-byte.
6. Post to Cpl Dash's QA queue; report to 1st LT Bugs.
7. Remove `docs/glowtales-staging/` from joustline after the move is verified.

## Done criteria
- 60/60 source files present, file count and names match inventory.
- sops/ complete (4 SOP files + checklist + log).
- Live site unchanged after Vercel relink.
