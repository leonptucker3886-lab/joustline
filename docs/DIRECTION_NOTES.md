# Direction Notes (Leon, 2026-10-15)

## Camera
- **Jousts:** first-person from the saddle. Your horse's head and ears sit at the bottom of the screen, your lance points forward, and the rival charges straight at you down the tilt barrier.
- **Side quests, exploring, estate, court:** bird's-eye (top-down) view.

## The squire starts as a helper, not a jouster
Early Chapter 1 is about **serving a knight**. The squire doesn't joust yet.
- Short one-thumb helper mini-games, played top-down: hand up the right lance at the right moment, calm and groom the horse, tighten armor straps, fetch a new lance after a break, clean and repair gear.
- From the barrier, the squire watches his knight's jousts and can call out timing tips, which affect the knight's result.
- Doing these jobs well earns renown and the knight's trust.
- **First time in the saddle:** the knight is hurt or has a no-show, and the squire takes his place. That's the first first-person joust, and the moment unlocks "First Lance."
- The squire's laid-back style (SQUIRE_STYLE.md) is already visible in how he does these chores.

## Joust controls (prototype v2)
1. Tap Helm (+3, small target) or Shield (+2, big target).
2. The horse charges on its own.
3. Tap when the swinging marker is in the gold zone. The bright center counts as a perfect hit.


## Lord Bart Sheen — the squire's knight

The knight the squire serves in Chapter 1 is **Lord Bart Sheen**, a famously drunken knight. Whenever Sir Bart rides into a joust or battle, the player does the squire work that keeps him alive (bird's-eye, one-thumb chores):

- **Point him the right way:** steer him toward the lists, not the wine tent.
- **Lance hand-ups:** hand up the right lance at the right moment; he often reaches for a wine jug instead.
- **Keep him in the saddle:** tap to prop him up when he sways between passes.
- **Armor fixes:** re-tighten straps he loosened "for comfort."
- **Calm the horse:** Tancrède is tired of Bart's singing.
- **Shout timing cues** from the barrier; good calls turn his wild swings into hits.

Comedy: Bart wins by accident, takes all the credit, toasts himself mid-joust, and has a new excuse each time ("the sun was in my goblet"). The squire stays calm and unbothered, which feeds the Sang-froid / squire-style system.

Story hook: Bart's drinking is why the squire ends up in the saddle — one day Bart is too drunk (or hungover) to ride, and the squire takes his place for the first first-person joust ("First Lance").

## The Charlie-horse origin (Bart's reference — show, never tell)
Bart Sheen is a nod to a famous party-loving actor. The game makes it obvious but **never says the name** — no character, menu or achievement text spells it out.

- **The opening:** Bart's very first scene. Mid-toast, his leg seizes in a cramp and he topples off Tancrède into a hay bale. The squire's first chore is rubbing the knot out. Tancrède (the horse) snorts. A court physician declares it "a most unusual horse-cramp" — and from then on the court calls a leg cramp "a Bart-horse." The pun lands; nobody explains it.
- **Running gag:** the cramp returns at the worst moments (mid-pass, kneeling to the king). Helper mini-game: "Work the Knot" — rapid thumb rubs before he falls off.
- **Party-life hints, never named:** he insists he's "winning" after every loss; hosts all-night feasts with "goddesses" of the court; boasts of "tiger blood" (it's wine); keeps a tally of duels he "won in his head."
- **Rule:** the joke is in situations and catchphrase echoes only. No real names, no direct quotes attributed to anyone, nothing mean about real health or private life.
- **Achievement:** "Winning?" (+15 XP) — prop Bart up through a full tournament without a single cramp fall.


## Faithful Service Arc (Chapter 1)

The squire is **16**. He serves Lord Bart Sheen faithfully — no scheming, no shortcuts — through **2–3 of Bart's quests** before the turning point.

**Quest structure (bird's-eye helper play):**
1. **Quest 1 – The Tourney at Amboise:** first chores (Work the Knot, lance hand-ups, steering Bart away from the wine tent). Bart wins by accident and takes the credit.
2. **Quest 2 – The Road Escort:** guarding a noble's cart; the squire props Bart up, calms Tancrède, handles the real danger quietly while Bart naps.
3. **Quest 3 (optional/branching) – The Feast Challenge:** an all-night feast with a duel at dawn; the squire keeps Bart upright and armored. Players can skip ahead after Quest 2 if they want the joust sooner.

**Loyalty, not resentment:** the squire genuinely cares for Bart. Bart is a mess, but a warm one — he shares his food, calls the squire "my boy," and once, sober for a moment, says something kind. This makes the turn land.

**The tragic event:** at the end of the final service quest, Bart is gravely wounded (or killed — to decide) in a joust he never should have ridden, the cramp striking mid-pass. The comedy drops out: no music, no margin doodles, one quiet scene. With Bart down and the house's honour at stake, the 16-year-old squire takes up his lance and mounts Tancrède. → first first-person joust, unlocks "First Lance."

**Tone rule:** Bart stays funny right up to that moment; the shift is sudden and sincere, then the game slowly lets humour back in afterward (the squire keeps Bart's goblet as a keepsake; Tancrède refuses to let anyone else sing).


## After Bart: The Baron's Household

**Bart's order.** Before (or right after) the tragic joust, Bart gives the squire one last command: "Go to my cousin, the Baron. He'll look after you, my boy." It's the kindest thing Bart ever does, and it's a mistake.

**The Baron of Vaudrecourt** (working name, fictional barony; open to change). Sober, polished, smiling, everything Bart wasn't. He saw the squire take the lance and he wants that talent.

**How he exploits the squire's natural talents**
- **Ringer jousts:** enters the squire under the Baron's colours, takes the prize purses and the renown. The squire gets "room and board."
- **Wagers:** quietly bets against his own rider in some matches and expects the squire to "have an off day." Player choice: throw it, or win and face the fallout.
- **The squire's cool style:** the Baron notices courtiers copying the squire (Sang-froid / Trend Book) and claims those trends as his own at court.
- **Errands from above (bird's-eye):** delivering sealed letters, scouting rival stables, "borrowing" a rival's horse for a night. Small jobs that grow shadier.
- **Debt hook:** Bart's gambling debts "transfer" to the squire. Every win pays down a number that never seems to shrink.

**Tone.** No villain monologue. The Baron is generous in public and only cold in private. The comedy stays (his steward, Tancrède's contempt for him), but the player slowly realises they're being used.

**Gameplay ties**
- New stat: **Debt** (shown in the Baron's ledger, not on the HUD).
- Favor with the Baron vs. renown of your own: high Baron favor = better gear, less freedom.
- Breaking free leads into Chapter 2 and the court of Francis I; how you leave (paid off, exposed him, ran with Tancrède) shapes your starting reputation.
- Achievements: **"Kept Man"** (+15 XP, finish a tournament as the Baron's ringer), **"Ledger Burned"** (+40 XP, escape the debt).

**Open question:** the Baron's final name/title, and whether he's tied to the Bourbon traitor path.


## Bart's fate (decided 2026-10-15)
- After the cramp-fall mid-pass, Bart is gravely hurt and needs **life-saving surgery in Paris**. He's carted off to the city's surgeons.
- **His condition is unknown for now.** The game never confirms whether he lives. No letters arrive; rumours contradict each other ("recovering", "dead", "seen at a tavern").
- Before he's taken away he gives his last order: stay with his cousin, the Baron.
- Hook: Bart's fate stays an open thread for a later chapter reveal. Players can ask after him in Paris side quests and get only hints.


## How the Baron got the squire (manipulation of Bart)

- **Bart never wanted this.** The Baron, Bart's cousin, works on him at his bedside before the trip to Paris: Bart is in lousy shape, broke, and the surgery is expensive.
- **The deal:** the Baron offers to pay all of Bart's expenses (the Paris surgeons, the journey, his debts) on one condition: the squire is assigned to him.
- **Bart fights it.** He refuses, argues, and tries to stall, but he's too weak and too broke. He finally gives in to save his own life. His "last order" ("Go to my cousin, he'll look after you, my boy") is said through gritted teeth.
- **The squire never knows.** Bart never tells him he resisted or that he was effectively sold. The player sees the squire go willingly, believing it was Bart's wish.
- **Reveal (later):** the truth surfaces gradually: a receipt in the Baron's ledger ("Surgeons, Paris: paid. Squire: received."), a servant who overheard the argument, or Bart himself if he turns up again. This reframes the Baron's Debt system: the squire is effectively working off Bart's surgery.
- **Payoff:** finding the receipt is a key step toward "Ledger Burned".


## Easter egg: the 1515 "Ledgerline"
- The Baron's ledger carries a tiny "LL" maker's stamp in one corner of every page. Never explained.
- His steward's catchphrase: "Every debt balanced, every line accounted for."
- The ledger is never named. No modern brand names appear in the game; the nod is visual and verbal only.


---

## Tone pillars: comedy, tragedy, secrets (Leon, 2026-10-15)

- **Comedy + puns:** every scene earns at least one laugh or pun (Charlie-horse / "Bart-horse", "the sun was in my goblet", Tancrède's opinions). Puns stay in-world and are never explained.
- **Tragedy:** the player must *feel* for the squire. Jokes are the armour; the hurt shows through the gaps — small, quiet beats, no melodrama.
- **The game never tells its secrets:** no narrator explains references, backstory or twists. Everything is discovered through objects, overheard lines, ledgers and margin doodles. Some things are never confirmed at all.

## Squire backstory: how Bart found him

Never told outright — pieced together from fragments (see "Discovery" below).

- **The night:** ~6 years before the game, a soaked, half-drunk Bart is riding home from a feast he was thrown out of. He takes a wrong turn (blames the moon) into a burned-out farm/coaching inn on the Loire road.
- **The boy (≈10):** alone, calmly holding the bridle of a panicked horse in the smoke — the only one who didn't run. That stillness is the first glimpse of his Sang-froid.
- **What happened to his family:** never stated. Fire, plague, soldiers, or simply left behind — clues contradict. The squire never talks about it.
- **Bart's choice:** he offers the boy a heel of bread and his goblet ("water, mostly"), then says "You're good with horses. I'm terrible with them. Come along." He tells everyone he "won the boy at dice" — a lie to hide that he did something kind.
- **Tancrède:** the horse the boy calmed that night. Bart bought it the next morning with money he didn't have. That's why Tancrède only tolerates the squire — and why it hates anyone else singing.
- **The name:** Bart gave him his name (a bad pun on whatever he was drinking that night). The squire's real name is a secret the game never reveals.
- **Why it hurts later:** Bart rescued him; Bart is later forced to trade him to the Baron to survive. The squire repays rescue with loyalty and never learns he was bargained away.

### Discovery (fragments, never explained)
- A child's charcoal drawing of a horse folded inside Bart's saddlebag.
- A scorched inn sign hanging in the stable that the squire won't let anyone take down.
- Bart, drunk, mid-toast: "...found him holding a horse in a fire, the little — anyway, to ME!"
- A Baron's ledger line: "Origin of boy: unknown. Irrelevant."
- Optional Loire-road side quest leads back to the ruin; the squire stops at the gate and the scene just... holds. No text.
- Achievement: **"Where It Started"** (+20 XP) — find every fragment. No summary screen is ever shown.
