# Glowtales (Kids Corner)

Static storybook site for kids: one page, illustrated story scenes and read-aloud voice clips.
Owner: Team 2, 2nd LT Marcus "GMan" Greene. Reports to 1st LT Bugs.

## Layout
- `index.html` – the whole site (no build step)
- `a/` – 33 story images (.webp)
- `v/` – 25 voice clips
- `sops/` – Designer SOP v1.0, Tester SOP v1.0, QA checklist v1.0, changelog and balance log

## Run locally
Open `index.html` in a browser, or serve the folder: `npx serve .`

## Deploy
Vercel deploys from `main`. No build command; output directory is the repo root.

## Process
- Every change follows `sops/`. Nothing ships until it passes Cpl Dash's QA queue and the Captain approves it.
- Version bumps and changes are logged in `sops/CHANGELOG_AND_BALANCE_LOG.md`.
- Bugs are filed under Tester SOP v1.0 with Severity, Frequency and Status.

## Status
v1.0.0 is the move from the live Vercel deployment. The moved copy must match the live site exactly.
