# Glowtales – Vercel Source Inventory

Checked 2026-10-19 22:3x UTC by 2nd LT GMan (Team 2). Follow-up to GLOWTALES_MIGRATION_PLAN.md.

- Vercel project: `glowtales` (prj_nFhpwwkhg8JgvtZxcOASymNiBrue), no Git repo linked, no framework.
- Latest deployment: dpl_2zX25DBSnpmCzpZ26d5SwYST1Vd9

## Finding: main risk retired
The deployment's `/src` is a plain static site (no build step, no bundled output). The deployed files ARE the source, so they can be copied into `leonptucker3886-lab/glowtales` as-is.

## File list (60 files)
- `src/index.html` – the whole app
- `src/a/` – 33 `.webp` images: story/activity covers (abc, cinder, count, farm, feed, goldi, humpty, jack, mary, maze, memory, pigs, pop, red, row, shape, spider, tortoise, twinkle, wheels, _g), lesson tiles (l-123, l-abc, l-add, l-big, l-feel, l-snd), pets (pet-bun, pet-dra, pet-kit, pet-pan, pet-pup, pet-uni)
- `src/v/` – 25 voice clips `0.mp3` … `24.mp3`

## Next steps
1. Create repo `glowtales`; copy `src/` to repo root (keep `a/` and `v/` paths unchanged so index.html links don't break).
2. Add `sops/` (Designer + Tester SOP v1.0), BALANCE_LOG.md, QA checklist, CHANGELOG.md.
3. Self-test in browser, link Vercel to GitHub main, then hand to Cpl Dash's QA queue.
