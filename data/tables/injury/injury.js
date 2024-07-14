const { Roll } = require('../../../services/diceService')

const abridgedInjury = require('./abridgedInjury')
const lostTable = require('./lost');

const lost = {
  lowerBounds: 65,
  upperBounds: 65,
  nested: lostTable
};
module.exports = {
  diceRoll: () => {
    const diceRoll = Roll({ noDice: 2, noFaces: 6 })
    return {
      ...diceRoll,
      total: Number(`${diceRoll.results[0]}${diceRoll.results[1]}`),
    }
  },
  entries: [
    ...abridgedInjury,
    lost,
    {
      lowerBounds: 11,
      upperBounds: 15,
      text: () => 'Dead. Remove the Hero from your warband roster.'
    },
    {
      lowerBounds: 16,
      upperBounds: 21,
      text: () => 'Multiple Injuries:',
      multiRoll: () => { return Roll({ noDice: 1, noFaces: 6 }).results[0] },
      nested: {
        diceRoll: () => {
          let finalResult = {
            total: 11,
          };
          while (finalResult.total <= 22 || finalResult.total === 61) {
            const diceRoll = Roll({ noDice: 2, noFaces: 6 })

            finalResult = {
              ...diceRoll,
              total: Number(`${diceRoll.results[0]}${diceRoll.results[1]}`),
            };
          }
          return finalResult;
        },
        entries: abridgedInjury
      }
    },
    {
      lowerBounds: 61,
      upperBounds: 61,
      text: () => 'Captured. Exchange the Hero for a price. Sell for D6 x 5gc. Undead get a free Zombie. Possessed sacrifice for +1 Experience. Weaponry is kept when sold or sacrificed.'
    },
  ]
}