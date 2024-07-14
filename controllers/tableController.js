const {
  InteractionResponseType,
} = require('discord-interactions');
const Tables = require('../data/tables/tables')
const { rollOnTable } = require('./tableRoller');
const { Roll } = require('../services/diceService')


const SelectTableAndRoll = ({ options, res, user }) => {
  const table = options[0].value;
  const persistantValues = {
    dice: [],
    rollText: [],
  };

  const { rollResult, finalPersistantValues } = rollOnTable(Tables[table], persistantValues);

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${user.global_name} - ${table} Dice rolls (in order): ${finalPersistantValues.dice}, Result: ${rollResult.text()} ${finalPersistantValues.rollText.filter(value => value !== undefined)} `,
    },
  });
}

module.exports = {
  SelectTableAndRoll,
}