# JoustLine: Canon Check vs Story Bible v0.4
Whiz (OTC Lead), 2026-10-30 · branch whiz/story-bible · work list item 1
Scope: docs/STORY_BIBLE.md (v0.4, locked 29 Oct) checked against PLOT, CHARACTERS, WORLD, FINAL_JOUST, COMEDY, SQUIRE_STYLE, MECHANICS and DIRECTION_NOTES.
Rule: the Bible is canon, and locked GEN/Leon calls win. Only this file was added. Main and graphics were not touched.

**Totals: 15 contradictions and 16 gaps.**

**Status (2026-10-30, after GEN ruling):** GEN ruled Story Bible v0.4 is canon, the knight is Lord Bart Sheen, and the main ending is the Final Joust against Bart at Sampsonne. All 15 contradictions and 16 gaps are marked RESOLVED below, except G12 (partly open) and the §8a rival-picker flag in G16 (open). GEN ruling 21:25: Old Gaspard, Isabeau and Brother Anselme stay as minor roles and may not contradict Bible v0.4.

## A. Contradictions
| # | Topic | Doc says | Bible v0.4 | Fix | Status |
|---|---|---|---|---|---|
| C1 | Knight's name | CHARACTERS: Bart "Shéne" Capet, "never write Sheen" (29 Oct) | "Lord Bart Sheen" (DIRECTION_NOTES agrees) | **GEN decision.** Both are dated 29 Oct. Shéne also suits the copyright rule. Then align all files | RESOLVED (GEN: Lord Bart Sheen; 1b3777b, 476bed5) |
| C2 | Squire's age | CHARACTERS: 14 | 16 (DIRECTION_NOTES agrees) | Set to 16 | RESOLVED (1b3777b) |
| C3 | Squire's name | CHARACTERS: the player picks the name | Real name never revealed, Bart named him | Keep the crest and trait pick, drop the name pick | RESOLVED (1b3777b) |
| C4 | Squire's voice | MECHANICS has dialogue cards. SQUIRE_STYLE has him talk to time travelers | Talks ONLY to Bart | Make cards silent actions or choices. Make vignettes silent | RESOLVED (e3b7a73, 6295dd7) |
| C5 | Bayard | PLOT: trains you in Ch.1 | Mentor from Ch.2 | Move him to Ch.2 | RESOLVED (1b3777b, 22793be) |
| C6 | Bourbon | PLOT and CHARACTERS: betrayal path, Imperial Archduke ending | No Bourbon-traitor path | Remove it and close the DIRECTION_NOTES open question | RESOLVED (22793be, 1b3777b, 476bed5) |
| C7 | Endgame | PLOT Ch.6: save Henri II to become Archduke | Main ending is the Final Joust vs Bart at Sampsonne. Henri, helm and favor feed the battle | Rewrite Ch.6 to §8 | RESOLVED (22793be) |
| C8 | Bart's fate | DIRECTION_NOTES: "wounded (or killed, to decide)", never confirmed | Survives, butterfly escape, becomes King at Sampsonne | Delete "to decide" | RESOLVED (476bed5) |
| C9 | First Lance | DIRECTION_NOTES: Bart "too drunk to ride" | Real cramp mid-pass | Delete "too drunk" | RESOLVED (476bed5) |
| C10 | Cramp pun | DIRECTION_NOTES: "horse-cramp", court says "Bart-horse" | Doctor only: "a Charles Horse", with the de Wierd gag | Replace everywhere | RESOLVED (476bed5) |
| C11 | Final Joust | FINAL_JOUST: best jouster in France, outcomes open | Healed and sober, still thinks he owes debts. Win, Lose and Yield are locked | Add the outcomes. Explain "best jouster" vs "wins by accident" | RESOLVED (fc76ca4) |
| C12 | Debts | DIRECTION_NOTES: debts transfer to the squire | Paid long ago, Bart only believes he owes them | Frame the Debt stat as the Baron's lie | RESOLVED (476bed5) |
| C13 | After the Baron | DIRECTION_NOTES: leads to Ch.2 and Francis I's court | Journey to Paris, fake-death knight, Sampsonne | Map the beats onto chapters (G1) | RESOLVED (22793be) |
| C14 | Scoring | MECHANICS: shield 1, helm 2 | DIRECTION_NOTES v2: shield +2, helm +3 | Match MECHANICS to the v2 prototype | RESOLVED (e3b7a73) |
| C15 | Copyright | COMEDY: "d'oh", "ay caramba", Springfield crest. Bible joke ending: "ate my shorts" kid | Nothing copyrighted as-is | Rename the crest and the D'oh-fin achievement. Alter the catchphrases | RESOLVED (4bd8647) |

## B. Gaps
- G1: **RESOLVED (22793be)** There's no chapter map tying Bible §4–8 (Ch.1 Bart, the Baron, the Paris journey, Sampsonne) to the six historical chapters in PLOT.
- G2–G7 (CHARACTERS is missing): **RESOLVED (1b3777b)** Charles de Wierd, the Baron of Vaudrecourt (not listed at all), the Baron's Doctor, the 5-year-old heir, Bart being third in line, and the curse and "just there" family rules.
- G8–G10 (WORLD is missing): **RESOLVED (a41f7d8, WORLD.md)** Château de Sampsonne, the burned Loire-road inn, and Paris as an off-screen location.
- G11 (PLOT is missing): **RESOLVED (22793be)** the Ch.1 beats (Doctor's Visit, the Trick, the last order, packing, First Lance), the butterfly escape, the fake-death knight and Charles's rescue.
- G12: **PARTLY RESOLVED** (FINAL_JOUST fc76ca4 locks Win/Lose/Yield and proposes 3 joust achievements; the alternate and joke endings are still not in ACHIEVEMENTS.md) The endings (Alt 1/2, 8b Alt 3/A/B, joke endings) aren't in any doc. ACHIEVEMENTS has nothing for them.
- G13: **RESOLVED (4bd8647, 6295dd7)** COMEDY's time traveler list has no "Inspector" joke-ending visitor. The Historian's "Archduke path" needs re-pointing.
- G14: **RESOLVED (1b3777b: Capet reveal removed, third-in-line rule added)** The Bible has no Capet bloodline reveal, no signet hints and no Robert the Strong. Merge it with "third in line".
- G15: **RESOLVED (GEN ruling 2026-10-30: Old Gaspard, Isabeau and Brother Anselme stay as minor roles and must not contradict Bible v0.4)** The Bible drops the CHARACTERS cast (Old Gaspard, Isabeau, Brother Anselme, Montmorency, Marguerite, Montgomery, Bonnivet). Confirm whether they're kept.
- G16: **"Simpson" sweep RESOLVED: no "Simpson" left in CH2_PARIS.md, docs/scenes, the prototype JS/HTML or index.html (checked 2026-10-30, nothing to replace). Rival-picker flag (§8a) still OPEN.**

## C. Fixes, in priority order
1. GEN rules on C1 (the name).
2. Apply the Bible §8a cleanup: CHARACTERS (C2, C5, G2–G6) and DIRECTION_NOTES (C8, C9, C10).
3. Rewrite PLOT to the Bible's arc and chapter map (C6, C7, C13, G1, G11).
4. Copyright pass on COMEDY and the joke endings (C15). Align scoring (C14).
5. Each fix goes in as its own commit on the branch and needs Whiz's review before it counts as done.
