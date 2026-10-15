# Joustline — Game Design Doc (v0.1, working title)

## Pitch
Rise from a nameless squire in a remote Loire-valley château to the highest title in Christendom. Joust, win tournaments, survive court intrigue, and meet the famous figures of the French Renaissance court along the way.

## World, time and place
- **Era:** 1515–1559, the golden age of the French tournament. It runs from Francis I's crowning to the fatal joust of Henri II.
- **Start:** 1515, Château de Montrésor, a minor estate far from Paris. You are 14, the squire of an aging knight.
- **The court travels**, so the map does too: Amboise → Blois → Chambord → Fontainebleau → Paris (Rue Saint-Antoine lists).
- **Tone:** grounded and historical, with color and humor. No magic.

## Chapters (one per era)
1. **Squire of Montrésor (1515)**: learn the lance at the quintain and the ring. Marignano victory news arrives with Bayard.
2. **Tourney circuit (1516–1519)**: provincial tournaments, first armor, first patron.
3. **Field of the Cloth of Gold (1520)**: the great Anglo-French tournament near Calais. Joust beside Francis I, and face the English (Henry VIII and Charles Brandon appear).
4. **Pavia and ransom (1525–1526)**: the king is captured. Raise ransom, carry letters, choose loyalties.
5. **Fontainebleau (1530s)**: court politics, marriage alliances, land and titles.
6. **The last tournament (1559)**: Rue Saint-Antoine. Henri II jousts Gabriel de Montgomery. Your choices decide whether you witness history or change it.

## Historical characters you meet
- **Francis I**: the knight-king who loves tournaments and is your main patron
- **Pierre Terrail, Chevalier de Bayard**: "knight without fear and beyond reproach", your mentor figure
- **Louise of Savoy**: the king's mother, regent and power broker
- **Marguerite de Navarre**: the king's sister, writer and patron of scholars
- **Anne de Montmorency**: Constable of France, demanding military ally or rival
- **Charles III, Duke of Bourbon**: the Constable who betrays the king (1523), a key loyalty test
- **Leonardo da Vinci**: at Amboise 1516–1519. He designs festival machines and maybe your armor.
- **Diane de Poitiers**: rising court power, intrigue questline
- **Henri II and Catherine de' Medici**: the late-game court
- **Gabriel de Montgomery**: captain of the Scots Guard, the final joust
- **Henry VIII and Charles V**: foreign kings at the Field of the Cloth of Gold and in diplomacy. Charles V, the Habsburg emperor, can grant the final Archduke title.

## Rank ladder
Squire → Knight bachelor → Knight banneret → Seigneur → Baron → Count → Duke → **Archduke** (the capstone, granted by imperial favor and an endgame choice)

## Core mechanics
- **The joust (mobile-first, one thumb):** 3 passes. Hold to gallop and build speed, then drag to aim the lance at the shield, helm or body. Release at the right moment. Timing, aim and horse stamina decide whether you score, break the lance or unhorse your opponent.
- **Tourney types:** joust (tilt), quintain and ring practice, mêlée (later), pas d'armes challenges
- **Court layer:** favor with factions (King, Queen Mother, Constable, Church), letters, gifts and choices between tournaments
- **Gear:** horses (destrier, courser), armor sets, lances, heraldry you design yourself
- **Estate:** income, retainers and a stable that grow with your title

## LeonLink profile milestones (Supabase)
- First Lance: win your first pass
- Unhorsed: knock an opponent off his horse
- Sans Peur: earn Bayard's approval
- Cloth of Gold: compete at the 1520 tournament
- Banneret, Count, Duke, Archduke: one milestone per rank
- Montgomery's Lance: finish the 1559 finale
- XP comes from wins, rank-ups and court favor. Best tournament score is saved per player.

## Monetization (follows the LeonLink coin rules)
Chapter 1 is free. Later chapters, cosmetic armor and heraldry packs, and horse skins can be bought with LeonLink tokens. There is no pay-to-win in the joust itself.

## Art and sound
- Illuminated-manuscript look: flat colors, gold leaf, parchment UI, and hand-drawn portraits of the historical figures
- Music: lute, recorder and drum, with period dance tunes (pavane, galliard)
- Sound: hooves, lance splinters, crowd cheers and herald trumpets

## Build plan
1. Prototype the joust mechanic alone (one pass, one opponent)
2. Chapter 1 vertical slice with Bayard and Leonardo
3. Profile hookup plus the first 4 milestones
4. Vercel project at joust.leonlink.net. This counts toward the 3-deploys-a-day limit.
