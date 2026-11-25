# joustline

LeonLink flagship game: rise from squire to Archduke through jousting, tournaments and court politics. (Working title)

## Play

Chapters One and Two are playable:

- **One — *The First Lance*.** Montrésor, 1515. The six riders at Amboise.
- **Two — *The Ringer*.** Paris, 1516. The Baron knights Jack against his will and puts him in the ring in Bart's armour.

```bash
npm start        # http://localhost:3000/game/
```

- `game/` — the game (vanilla JS, canvas, no build step). Mobile-first portrait, one thumb.
- `prototype/` — the old opening/doctor cutscene prototypes and the tap-timing joust, kept for reference.

**The tilt.** Three timed taps a pass. Gallop (gold band on the needle), aim (helm ×2.0, chest ×1.1, shield ×0.45 — breaking a shield strips their guard), strike (perfect ×1.75). Plates absorb hits until they shatter; riders land their blows at the same time; a rider at zero stamina is unhorsed.

**Chapter Two rules.** The ring is not the Amboise ladder again: the helm is worth ×1.35 instead of ×2.0 and the shield ×0.8, the perfect band is a fifth narrower and needs a clean aim, the aim and strike clocks are shorter — and each rival guards the plate you keep hitting, so no single line carries a tilt. Rivals ride to a style (shield, helm, chest, or reading your last line), announced before the first pass.

**The chapters.** Chapter One: cold open → prologue → the opening cramp (Work the Knot) → the fall, the Doctor's "a Charles Horse", the Trick, the last order → Jack takes the lance → the six riders at Amboise → the Baron's champion → Chapter One end card. Chapter Two: the forced knighthood → four ringers in Paris → the inn where Charles de Wierd brings news of Bart → Chapter Two end card.

## Canon

Source of truth is [docs/STORY_BIBLE.md](docs/STORY_BIBLE.md) (v0.4, locked) with [docs/PLOT.md](docs/PLOT.md), [docs/CHARACTERS.md](docs/CHARACTERS.md), [docs/WORLD.md](docs/WORLD.md), [docs/MECHANICS.md](docs/MECHANICS.md) and the scene scripts in [docs/scenes/](docs/scenes/). The game's prose lives in [game/js/story.js](game/js/story.js).
