const { Roll } = require('../../../services/diceService')

module.exports = {
  diceRoll: () => {

    const diceRoll = Roll({ noDice: 2, noFaces: 6 })
    return {
      ...diceRoll,
      rollText: diceRoll.results[0] === diceRoll.results[1] ? " You've rolled a double. Some hero's (such as Wizards) have special rules that trigger on doubles" : undefined
    }
  },
  entries: [{
    lowerBounds: 2,
    upperBounds: 5,
    text: 'New Skill'
  },
  {
    lowerBounds: 6,
    upperBounds: 6,
    nested: {
      diceRoll: () => {
        return Roll({ noDice: 1, noFaces: 6 })
      },
      entries: [
        {
          lowerBounds: 1,
          upperBounds: 3,
          text: '+1 Strength (+1 Attack if already at max Strength)'
        },
        {
          lowerBounds: 4,
          upperBounds: 6,
          text: '+1 Attack (+1 Strength if already at max Attack)'
        },
      ]
    }
  },
  {
    lowerBounds: 7,
    upperBounds: 7,
    text: 'Choose either +1WS or +1BS'
  },
  {
    lowerBounds: 8,
    upperBounds: 8,
    nested: {
      diceRoll: () => {
        return Roll({ noDice: 1, noFaces: 6 })
      },
      entries: [
        {
          lowerBounds: 1,
          upperBounds: 3,
          text: '+1 Inititave (+1 Leadership if already at max Inititave)'
        },
        {
          lowerBounds: 4,
          upperBounds: 6,
          text: '+1 Leadership (+1 Inititave if already at max Leadership)'
        },
      ]
    }
  },
  {
    lowerBounds: 9,
    upperBounds: 9,
    nested: {
      diceRoll: () => {
        return Roll({ noDice: 1, noFaces: 6 })
      },
      entries: [
        {
          lowerBounds: 1,
          upperBounds: 3,
          text: '+1 Wound (+1 Toughness if already at max Wounds)'
        },
        {
          lowerBounds: 4,
          upperBounds: 6,
          text: '+1 Toughness (+1 Wound if already at max Toughness)'
        },
      ]
    }
  },
  {
    lowerBounds: 10,
    upperBounds: 12,
    text: 'New Skill'
  },
  ]
}