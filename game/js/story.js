// The story, kept as data so the engine stays testable and the prose stays in
// one place. Canon follows joustline/docs (Story Bible v0.4, locked):
// Lord Bart Sheen, Tancrede, the Baron of Vaudrecourt and his ledger, the
// burned inn on the Loire road, "a Charles Horse", and Jack.
//
// House rules from those notes:
//  - comedy and tragedy in the same breath, puns never explained;
//  - no narrator explains a reference, a backstory or a twist;
//  - the squire speaks only to Bart — and, once, at the very end of the game;
//  - Bart is never named as anything but Lord Bart Sheen.

export const PROLOGUE = [
  {
    kicker: 'Montrésor, 1515',
    title: 'The boy who held the horse',
    text:
      'A coaching inn burned on the Loire road six winters ago. Everyone ran. A soaked knight on the wrong road found the only one who did not: a boy with both hands on a panicking bridle, waiting for the smoke to decide.',
  },
  {
    kicker: 'Montrésor',
    title: 'Won at dice',
    text:
      'Lord Bart Sheen tells the court he won the boy at dice. He tells it louder the more he drinks. Nobody asks why he bought the horse the next morning with money he did not have.',
  },
  {
    kicker: 'Chapter One',
    title: 'Jack',
    text:
      'You are sixteen. Bart calls you Jack \u2014 he gave you the name, and never asked whether you wanted another. You hand up lances, tighten straps, rub the knot out of a knight\u2019s leg before a crowd, and keep Tancrede from biting the steward. Bart wins. Bart takes the credit. You keep the horse calm.',
  },
  {
    kicker: 'Chapter One',
    title: 'Tourney day at Amboise',
    text:
      'The bell is already ringing. Bart is asleep across the bed with his boots on, a goblet in one hand and two ladies of the court snoring in harmony beside him. The tent pole is papered with IOUs. His title is very old. His money is very gone.',
  },
];

// Kept as the readable spine of the chapter; the game itself plays these beats
// as cutscenes in js/scenes.js.
const CHAPTER_BEATS = [
  {
    kicker: 'The Lists',
    title: 'A real one',
    text:
      'Third pass. Bart is winning and telling the stands about it. Then his leg seizes \u2014 not the dinner kind, the real kind \u2014 and the best lance in France goes over the barrier into the hay.',
  },
  {
    kicker: 'The Tent',
    title: 'A Charles Horse',
    text:
      '\u201cYou may never walk again,\u201d says the Baron\u2019s doctor, arriving before anyone sent for him. \u201cA Charles Horse, this severe.\u201d From the doorway: \u201cYou called?\u201d Nobody looks up.',
  },
  {
    kicker: 'The Tent',
    title: 'Is that ale?',
    text:
      'Bart gets up. Bart walks to the ale. Two servants pin him down and the doctor wraps the leg twice as tight. In the shadows the Baron turns a page in a small black ledger. It says PAID. It has said PAID for years.',
  },
  {
    kicker: 'The Trick',
    title: 'One condition',
    text:
      'Paris has the only surgeon who can save the leg. The Baron will pay for everything \u2014 the surgeons, the journey, the debts \u2014 on one condition. Bart argues until he is too weak to argue. \u201cGo to my cousin,\u201d he says at last, through his teeth. \u201cHe\u2019ll look after you, my boy.\u201d',
  },
  {
    kicker: 'The Lists',
    title: 'No knight, no lance',
    text:
      'A cart rolls away down the road to Paris, Bart in the bed of it, waving his goblet. The marshal spreads his hands. \u201cUnless his house sends another.\u201d The Baron smiles and calls it a forfeit. Jack steps forward with Bart\u2019s lance. \u201cI carry his lance.\u201d',
  },
  {
    kicker: 'The Lists',
    title: 'Six riders',
    text:
      'The armour is too big. The helm turns round when you nod. Tancrede knows the way and does not need you to steer. Six riders stand between this house and its honour. Put them in the sand and the court will have to learn your name \u2014 not his.',
  },
];

// Chapter One closes on the canon end beat (docs/scenes/CH1_JACK_FINALE.md):
// the borrowed armour, the clean hit, and the marshal's last line.
export const FINALE_BEATS = [
  {
    kicker: 'The Lists',
    title: 'The Baron\u2019s champion',
    text:
      'The last rider goes into the sand in the Baron\u2019s own colours. The stands are quiet. The Baron\u2019s goblet stops halfway to his mouth, then finishes the journey, because a Baron never wastes wine.',
  },
  {
    kicker: 'The Ledger',
    title: 'Squire: received',
    text:
      'A page slips out of the small black ledger and lies in the dirt: \u201cSurgeons, Paris: paid. Squire: received.\u201d You read it twice. You put it in your glove. You say nothing, because there is no one to say it to.',
  },
  {
    kicker: 'The Lists',
    title: 'Wedged in the saddle',
    text:
      'Tancrede stops at the far end. You do not move, because the armour is wedged in the saddle. The helm slowly turns backward. The crowd waits.',
  },
  {
    kicker: 'The Herald',
    title: 'A clean hit',
    text:
      '\u201cA hit! A clean hit for the house of Bartholomew!\u201d You tip sideways, stuck, hanging off the horse at an angle. The marshal shouts the last line of the chapter: \u201cSomebody please help Jack off the horse!\u201d',
  },
];

export const STORY = {
  sorel: {
    intro: [
      {
        kicker: 'I',
        title: 'Guillaume Sorel',
        text:
          'Champion of the Montrésor fair three years running, and the loudest man in the shire. He has never been unhorsed. He has also never ridden anyone who was not already drunk.',
      },
      {
        kicker: 'I',
        title: 'The goblet',
        text:
          '\u201cA farmer with a long stick,\u201d says Sorel, from behind a goblet he was told not to bring to the lists. Behind him, the Baron\u2019s man is already opening his ledger.',
      },
    ],
    win:
      'Sorel goes over the barrier backwards and lands sitting up, still complaining. The fair learns a new name before anyone can finish saying it was Bart\u2019s idea.',
    loss:
      'Sorel takes the purse and the story. Somewhere in the stands, a page turns.',
  },

  isabeau: {
    intro: [
      {
        kicker: 'II',
        title: 'Isabeau de Loches',
        text:
          'A rival squire with a lance of her own and better boots than yours. She has been taking circuit purses since she was fourteen, while you were holding somebody else\u2019s bridle.',
      },
      {
        kicker: 'II',
        title: 'A reason',
        text:
          '\u201cThey gave you a horse,\u201d she says, eyeing Tancrede. \u201cDid they give you a reason?\u201d You do not answer. You never do. She nods anyway, as though that settled something.',
      },
    ],
    win:
      'She picks herself up, spits sand, and grins at you with nothing actually lost. \u201cAgain. Next fair. Same terms.\u201d Something that will keep you alive for years starts here.',
    loss:
      'Isabeau puts you in the dirt with the calm of someone doing arithmetic. \u201cCome back when your knight is not the one drinking,\u201d she says, and means it kindly.',
  },

  bonnivet: {
    intro: [
      {
        kicker: 'III',
        title: 'Bonnivet',
        text:
          'The admiral keeps riders the way a man keeps hawks: hooded, expensive, and pointed at whatever he wants taken. He has heard Bayard speak well of you, which is exactly why he wants you broken.',
      },
      {
        kicker: 'III',
        title: 'A small book',
        text:
          '\u201cSentiment is a poor shield,\u201d he says, and does not raise his hand to the stands.',
      },
    ],
    win:
      'The admiral\u2019s rider is down and the admiral is already looking past you at the next name on his list. Court men remember who beat them. That is worth more than the purse.',
    loss:
      'Bonnivet does not gloat. He writes something in a small book instead, and you have been entered in it, which is worse than being shouted at.',
  },

  brandon: {
    intro: [
      {
        kicker: 'IV',
        title: 'Charles Brandon',
        text:
          'The English have come with pavilions of silk and a duke who jousts like a war. He looks at your horse, then at you, and decides you are a boy in borrowed steel. He is not wrong about the steel.',
      },
      {
        kicker: 'IV',
        title: 'A sketchbook',
        text:
          '\u201cThey send me a squire,\u201d he says. Behind him a lanky man with a sketchbook is drawing everyone in the stands with enormous overbites.',
      },
    ],
    win:
      'Brandon comes off at the second pass and laughs about it, which is somehow worse than if he had not. He offers you his hand. The man with the sketchbook draws you with a slingshot.',
    loss:
      'Brandon unhorses you politely and helps you up. Old Gaspard, narrating, gets the year wrong, and Bayard corrects him from three tents away.',
  },

  bourbon: {
    intro: [
      {
        kicker: 'V',
        title: 'The Duke of Bourbon',
        text:
          'A colour that changes hands. He rides in a field he chose, for men who pay in promises, and he offers the one thing nobody else will: a future that is not the Baron\u2019s.',
      },
      {
        kicker: 'V',
        title: 'A luxury',
        text:
          '\u201cLoyalty is a luxury of the well-fed,\u201d he says. \u201cAsk your cousin what he has eaten lately.\u201d He does not say whose cousin, and does not need to.',
      },
    ],
    win:
      'The duke\u2019s banner goes down and the field goes quiet. Somewhere behind you the Baron is already working out how to sell this.',
    loss:
      'Bourbon unhorses you and rides on without looking back. A servant hands you a letter you cannot place, sealed with a stamp you will see again on every page of a ledger.',
  },

  guichard: {
    intro: [
      {
        kicker: 'VI',
        title: 'Sir Guichard',
        text:
          'The Baron\u2019s own champion, in the Baron\u2019s own colours, on a horse the Baron bought. He has been riding bought lances since before you could hold one, and he does not need the purse. He needs the receipt.',
      },
      {
        kicker: 'VI',
        title: 'His regards',
        text:
          '\u201cThe Baron sends his regards,\u201d Guichard says. \u201cAnd his receipt.\u201d Behind him, the Baron is already turning to the next page.',
      },
    ],
    win:
      'The Baron\u2019s colours go into the sand and a folded page goes with them. Guichard does not get up quickly. The stands are quiet enough to hear a ledger close.',
    loss:
      'Guichard puts you down and rides back to the Baron\u2019s side without a word. The ledger stays open. It always stays open.',
  },
};

/** The end of Chapter One. Shown on the champion screen. */
export const FINALE = {
  kicker: 'Chapter One',
  title: 'The First Lance',
  text:
    'Every knight in the realm has heard a squire\u2019s name. The Baron\u2019s ledger is still open on the table, \u201cSurgeons, Paris: paid\u201d written in a neat hand, and the next line is not finished yet.',
};
