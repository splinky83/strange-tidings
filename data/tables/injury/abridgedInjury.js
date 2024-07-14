const { Roll } = require('../../../services/diceService')

module.exports = [
  {
    lowerBounds: 22,
    upperBounds: 22,
    text: () => 'Leg wound. -1 Movement.'
  },
  {
    lowerBounds: 23,
    upperBounds: 23,
    nested: {
      diceRoll: () => {
        return Roll({ noDice: 1, noFaces: 6 })
      },
      entries: [
        {
          lowerBounds: 1,
          upperBounds: 1,
          text: () => 'Arm wound - Amputation, hero loses an arm.'
        },
        {
          lowerBounds: 2,
          upperBounds: 6,
          text: () => 'Arm wound - Miss next game.'
        },
      ]
    }
  },
  {
    lowerBounds: 24,
    upperBounds: 24,
    nested: {
      diceRoll: () => {
        return Roll({ noDice: 1, noFaces: 6 })
      },
      entries: [
        {
          lowerBounds: 1,
          upperBounds: 3,
          text: () => 'Madness - Hero gains stupidy.'
        },
        {
          lowerBounds: 4,
          upperBounds: 6,
          text: () => 'Madness - Hero gains frenzy.'
        },
      ]
    }
  },
  {
    lowerBounds: 25,
    upperBounds: 25,
    nested: {
      diceRoll: () => {
        return Roll({ noDice: 1, noFaces: 6 })
      },
      entries: [
        {
          lowerBounds: 1,
          upperBounds: 1,
          text: () => 'Smashed leg - Hero can no longer run.'
        },
        {
          lowerBounds: 2,
          upperBounds: 6,
          text: () => 'Leg injury - miss next game.'
        },
      ]
    }
  },
  {
    lowerBounds: 26,
    upperBounds: 26,
    text: () => 'Chest wound. -1 Toughness.'
  },
  {
    lowerBounds: 31,
    upperBounds: 31,
    text: () => 'Blinded in one eye. -1 BS. If subsequently blinded, remove the Hero from your warband roster.'
  },
  {
    lowerBounds: 32,
    upperBounds: 32,
    text: () => 'Old battle wound. Roll D6 every battle: 1 = miss the game.'
  },
  {
    lowerBounds: 33,
    upperBounds: 33,
    text: () => 'Nervous condition. -1 Initiative.'
  },
  {
    lowerBounds: 34,
    upperBounds: 34,
    text: () => 'Hand injury. -1 Weapon Skill.'
  },
  {
    lowerBounds: 35,
    upperBounds: 35,
    text: () => `Deep wound. Hero must miss the next ${Roll({ noDice: 1, noFaces: 3 }).total} games.`
  },
  {
    lowerBounds: 36,
    upperBounds: 36,
    text: () => 'Robbed. Hero loses weapons, armour and equipment.'
  },
  {
    lowerBounds: 41,
    upperBounds: 55,
    text: () => 'Full recovery.'
  },
  {
    lowerBounds: 56,
    upperBounds: 56,
    nested: {
      diceRoll: () => {
        return Roll({ noDice: 1, noFaces: 6 })
      },
      entries: [
        {
          lowerBounds: 1,
          upperBounds: 3,
          text: () => 'Hero gains hatred towards the model that beat them.'
        },
        {
          lowerBounds: 4,
          upperBounds: 4,
          text: () => 'Hero gains hatred towards the leader of the opposing warband.'
        },
        {
          lowerBounds: 5,
          upperBounds: 5,
          text: () => 'Hero gains hatred towards the entire enemy warband.'
        },
        {
          lowerBounds: 6,
          upperBounds: 6,
          text: () => 'Hero gains hatred towards all warbands of the same type as your opponent.'
        },
      ]
    }
  },
  {
    lowerBounds: 62,
    upperBounds: 63,
    text: () => 'Hardened. Hero is immune to fear from now on.'
  },
  {
    lowerBounds: 64,
    upperBounds: 64,
    text: () => 'Horrible scars. Hero causes fear from now on.'
  },
  {
    lowerBounds: 66,
    upperBounds: 66,
    text: () => 'Survives against the Odds: The warrior survives and rejoins their warband gaining +1 Experience.'
  },
];