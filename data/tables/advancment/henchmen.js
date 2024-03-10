const { Roll } = require('../../../services/diceService')



module.exports = {
  diceRoll: () => {
    return Roll({ noDice: 2, noFaces: 6 })
  },
  entries: [{
    lowerBounds: 2,
    upperBounds: 4,
    text: '+1 Inititave'
  },
  {
    lowerBounds: 5,
    upperBounds: 5,
    text: '+1 Strength'

  },
  {
    lowerBounds: 6,
    upperBounds: 7,
    text: 'Choose either +1 BS or +1 WS'
  },
  {
    lowerBounds: 8,
    upperBounds: 8,
    text: '+1 AttackS'

  },
  {
    lowerBounds: 9,
    upperBounds: 9,
    text: '+1 Leadership'
  },
  {
    lowerBounds: 10,
    upperBounds: 12,
    text: "The lad's got talent. Choose two skill lists available to Heroes of your warband. Make one Hero advance for him and one for the Henchmen group."
  },
  ]
}