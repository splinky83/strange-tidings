const {
  InteractionResponseType,
} = require('discord-interactions');

const { Roll } = require('../services/diceService')

const RollDice = ({ options, res, user }) => {
  const roll = options[0].value
  const rollParts = roll.split(/[dD]/)
  if (rollParts.length !== 2) {
    throw new Error('Invalid roll input')
  }
  const noDice = Number(rollParts[0])
  const noFaces = Number(rollParts[1])
  if (isNaN(noDice) || isNaN(noFaces)) {
    throw new Error('Invalid No. Dice or No. Faces')
  }

  const rollResult = Roll({ noDice: noDice || 1, noFaces })
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${user.global_name} ${roll} Total: ${rollResult.total}, Dice: ${rollResult.results}`,
    },
  });
}

module.exports = {
  RollDice,
}