const { Roll } = require('../../../services/diceService')
const { rollOnTable } = require('../../../controllers/tableRoller')

const abridgedInjury = require('./abridgedInjury')

const abridgedInjuryTable = {

  diceRoll: () => {
    let finalResult = {
      total: 11,
    };
    while (finalResult.total <= 22 || finalResult.total === 61 || finalResult.total === 65) {
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

const multipleInjuryRoll = () => {
  const persistantValues = {
    dice: [],
    rollText: [],
  };

  numberOfInjuries = Roll({ noDice: 1, noFaces: 6 }).total;

  const injuries = []
  for (let i = 0; i < numberOfInjuries; i++) {
    injuries.push(rollOnTable(abridgedInjuryTable, persistantValues))
  }

  return `Injury rolls (in order): ${numberOfInjuries},${persistantValues.dice}, Result: ${injuries.map(injury => injury.rollResult.text()).join(' | ')}`;

}

const seriousInjuryRoll = () => {
  const persistantValues = {
    dice: [],
    rollText: [],
  };


  const injury = rollOnTable(abridgedInjuryTable, persistantValues);

  return `Dice: ${persistantValues.dice}, Result: ${injury.rollResult.text()}`;

}

module.exports = {
  diceRoll: () => {
    return Roll({ noDice: 1, noFaces: 6 })
  },
  entries: [{
    lowerBounds: 1,
    upperBounds: 1,
    text: () => `LOST - Free fall! Chasing after what he thought was his comrades the warrior stumbles down a giant cliff face, and suffers multiple injuries. The warrior misses the next ${Roll({ noDice: 1, noFaces: 3 }).total} Games and gains +1 Experience for his Ordeal. Multiple Injury roll: ${multipleInjuryRoll()}`
  },
  {
    lowerBounds: 2,
    upperBounds: 3,
    text: () => `LOST - Pit. The warrior stumbles into a spiky pit, a trap laid for game. They suffer a serious injury. The warrior finds 50gc in items left by the last unfortunate victim of the pit. Serious Injury roll: ${seriousInjuryRoll()}`

  },
  {
    lowerBounds: 4,
    upperBounds: 5,
    text: () => `LOST - Dense Jungle. As they attempt to retreat a dense almost magical fog falls over the battlefield, coupled with the jungle it makes it impossible for them to find their way home. The warrior returns after ${Roll({ noDice: 1, noFaces: 3 }).total} games, changed by the horrors they have seen. They gain +3 Experience and are immune to fear.`
  },
  {
    lowerBounds: 6,
    upperBounds: 6,
    text: () => 'LOST - Lucky Find! The turned-around warrior stumbles upon the find of a lifetime. Roll on the Minor Artefact table, the triumphant hero returns after the next battle with his score in hand.'
  },
  ]
}