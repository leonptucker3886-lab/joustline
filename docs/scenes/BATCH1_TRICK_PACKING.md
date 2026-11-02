# JoustLine Scene Scripts — Batch 1 (canon: Story Bible v0.4)
Written by COL Whiz. Built by Pizzapan into Bert's slots on bert/gameplay. Rough is fine.

---
## SCENE 2 — THE TRICK (after Doctor)
**Slot:** `scene_trick` | **Length:** ~60s | **Music:** Baron's harpsichord motif, low.

**Setting:** Bart's sickroom, night. Candles. Bart on the bed, leg propped up, goblet in hand.

1. BARON (sweet): "Cousin. The doctor tells me the worst."
2. DOCTOR: "A Charles Horse this severe, untreated... you may never walk again."
   SFX: slide whistle + hay-bale thump.
3. CHARLES DE WIERD (doorway): "You called?" — Nobody looks up. Harp swell, cut off.
4. BARON: "Paris has the only physician who can save the leg. And your debts... we'll speak of them later."
5. BART: "I still owe you?" BARON: "Oh, terribly." (Ledger close-up: entry reads PAID.)
6. BART: "Is that ale?"
7. Servants lift Bart, bed and all, out the door.
8. SQUIRE watches from the corridor. No expression. Holds Bart's lance.

**Player input:** none (pure cutscene). Skip = Space.
**Exit:** fade to black → `scene_packing`.

---
## SCENE 3 — PACKING
**Slot:** `scene_packing` | **Length:** playable, ~90s | **Music:** none, then a single drum.

**Setting:** the empty stable at dawn. Bart's room has been stripped.

1. Text card: "Bart is gone. The Baron says Paris."
2. Player controls the SQUIRE top-down. Pick up 4 items (any order):
   - Bart's lance — SQUIRE: "Sir will want this."
   - Bart's goblet — SQUIRE: "Sir will want this more."
   - Tancrède's saddle — horse snorts.
   - The black ledger (left behind by the Baron) — SQUIRE reads it. No reaction. Pockets it.
3. If the player tries to leave early: SQUIRE: "Not yet." (Only line until all 4 are found.)
4. When packed: SQUIRE mounts Tancrède. Single drum hit.
5. SQUIRE (to no one, first line not addressed to Bart): "...Paris."

**Pass condition:** all 4 items collected. No fail state.
**Exit:** → `first_lance`.

---
## Notes for builders
- Squire never emotes. Bart always has a goblet.
- Every "Charles Horse": slide whistle + thump (Announcement).
- Next scripts I write: First Lance, Squire to Paris, Paid Knight / "You called?" reveal.
