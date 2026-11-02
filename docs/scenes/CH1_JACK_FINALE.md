# JoustLine Scene Scripts — Chapter 1 Finale (canon: Story Bible v0.4)
Written by COL Whiz. Ordered by Leon Tucker, Oct 29. Builders: Pizzapan (cutscene art), Bert (chapter wiring), Announcement (sound).

## Canon decisions in this commit
- **The Squire has a name: Jacques, called "Jack."** He is Bart's assistant. Everything in the bible about the Squire (never emotes, holds the lance, Bart's goblet) applies to Jack.
- **Chapter 1 ends on Jack's ride**, not on Packing. Packing (`scene_packing`) moves to the start of Chapter 2.
- Bart never sees Jack ride. He is already being carried to Paris.

## Chapter 1 order (Bert: wire exactly this)
`wake` → `walk` (To the Lists) → `arrive` → `first_joust` + cramp → `doctor` → `scene_trick` → `scene_jack` → `scene_jack_ride` → `end_card_ch1`
Chapters menu: add **"Jack"** → `scene_jack`.

---
## SCENE 2 — THE TRICK (unchanged from Batch 1)
Exit changes only: fade to black → `scene_jack` (was `scene_packing`).

---
## SCENE 2B — JACK TAKES THE SPOT
**Slot:** `scene_jack` | **Length:** ~45s | **Music:** crowd murmur, then the herald's trumpet, slightly flat.

**Setting:** the lists, same morning. Bart's empty end of the field. Tancrède waiting, saddled.

1. HERALD: "Sir Bartholomew is called to the lance!"
2. Silence. Crowd murmur.
3. Wide shot: a cart rolls away down the road. Bart, still in his bed, waves his goblet. BART (distant): "Paris!"
4. BARON (in the stands, to the marshal): "A forfeit, surely. Such a shame."
5. MARSHAL: "No knight, no lance. Unless his house sends another."
6. JACK steps forward, holding Bart's lance. No expression.
7. MARSHAL: "...You are his house?"
8. JACK: "I carry his lance."
9. BARON (smile slips): "He's a squire. He's hardly bigger than the lance."
10. CHARLES DE WIERD (behind the Baron): "You called?" — Nobody looks up.
11. Marshal shrugs. MARSHAL: "Rules are rules. Mount him."
12. Two grooms lift JACK into Bart's saddle. The armor is far too big. The helm spins when he nods.
    SFX: armor clank, helm rattle.

**Player input:** none. Skip = Space / tap Skip.
**Exit:** → `scene_jack_ride`.

---
## SCENE 2C — JACK'S RIDE
**Slot:** `scene_jack_ride` | **Length:** ~40s | **Music:** single drum, then charge theme.

1. Trumpet. Tancrède charges (he knows the way; Jack does not steer).
2. Slow-motion on the pass (use Bert's strike impact: freeze-frame, shake, splinters).
3. Jack's lance lands **dead center**. Opponent's shield cracks. Damage marker: **PERFECT.**
4. The opponent stays seated. So does Jack — but only because the armor is wedged in the saddle.
5. Tancrède stops at the far end. Jack does not move. The helm slowly turns backward.
6. Crowd goes quiet. The Baron's goblet stops halfway to his mouth.
7. JACK (muffled, inside the helm): "...Sir would have wanted this."
8. HERALD: "A hit! A clean hit for the house of Bartholomew!"
9. Jack tips slowly sideways, stuck, hanging off the horse at an angle.
10. MARSHAL (shouting, final line of Chapter 1): **"Somebody please help Jack off the horse!"**
    SFX: closing sting (Announcement) on the last word. Hard cut.

**Player input:** optional — one strike-timing tap on the pass. Any timing gives PERFECT (Tancrède does the work). No fail state.
**Exit:** → `end_card_ch1`.

---
## END CARD
Black screen, gold text: **"End of Chapter 1."** Then: **"Chapter 2 — Paris."**
Buttons: Replay Chapter 1 · Chapters ☰.

---
## Notes for builders
- Jack never emotes. His only lines: "I carry his lance." and "...Sir would have wanted this."
- Keep JoustLine's camera view; lance-and-crown art quality.
- Sound cues for Announcement: `sfx_flat_trumpet`, `sfx_armor_clank`, `sfx_helm_rattle`, `sting_ch1_close`.
