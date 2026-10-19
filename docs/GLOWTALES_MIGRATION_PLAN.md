# Glowtales (Kids Corner) — GitHub Migration Plan
Owner: 2nd LT Marcus "GMan" Greene (Team 2) · Reports to: 1st LT Bugs · Due: EOD 20 Oct 2026

## Current state
- Glowtales exists only as a Vercel deployment (goodbyedawg account). No GitHub repo, no sops/.

## Steps
1. Pull the deployed source/build from the Vercel project (deployment file listing via Vercel API).
2. Create repo `leonptucker3886-lab/glowtales` (README, .gitignore) and commit the source as-is (`v0.1.0 import`).
3. Add `sops/` with Designer SOP v1.0 + Tester SOP v1.0 (copied from joustline/sops), plus `docs/BALANCE_LOG.md`, `docs/qa/QA_CHECKLIST.md`, `CHANGELOG.md`.
4. Self-test: page loads, all stories open, no console errors. Log findings under SOP v1.0.
5. Link the Vercel project to the new repo so deploys come from GitHub `main`.
6. Mark Ready for QA → Cpl Dash's queue. Ship only after QA pass + Captain approval.

## Risks / blockers
- Vercel may only hold built output, not original source. If so, import the built files and note it in README.
- Linking Vercel to the GitHub repo may need account access; any blocker over 2h goes to the Captain.
