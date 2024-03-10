const {
  InteractionResponseType,
} = require('discord-interactions');
const Tables = require('../data/tables/tables')


const rollOnTable = (table, persistantValues) => {

  const { total: diceResult, results: dice, rollText } = table.diceRoll();

  persistantValues.dice.push(dice)
  persistantValues.rollText.push(rollText)

  const tableResult = table.entries.filter(entry => diceResult >= entry.lowerBounds && diceResult <= entry.upperBounds)

  if (tableResult.length !== 1) {
    throw new Error('Invalid result Length')
  }

  if (tableResult[0].nested) {
    return rollOnTable(tableResult[0].nested, persistantValues)
  }

  return { rollResult: tableResult[0], finalPersistantValues: persistantValues, };

}

const SelectTableAndRoll = ({ options, res }) => {
  const table = options[0].value;
  let persistantValues = {
    dice: [],
    rollText: [],
  };

  const { rollResult, finalPersistantValues } = rollOnTable(Tables[table], persistantValues);

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Dice rolls (in order): ${finalPersistantValues.dice}, Result: ${rollResult.text}. ${finalPersistantValues.rollText} `,
    },
  });
}

module.exports = {
  SelectTableAndRoll,
}