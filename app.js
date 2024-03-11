const express = require('express');
const {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} = require('discord-interactions');
const { VerifyDiscordRequest } = require('./utils.js');
const { RollDice } = require('./controllers/diceController.js');
const { SelectTableAndRoll } = require('./controllers/tableController.js');
const { HandleFactionCommand, HandleFactionUpdate, CreateFaction, ViewFaction } = require('./controllers/factionController.js')
const { HandleHelpRequest } = require('./controllers/helpController.js');

const app = express();

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));


const callControllerFunction = async ({ options, res, user, channel, controllerFunction }) => {
  try {
    await controllerFunction({ options, res, user, channel })
  } catch (err) {
    console.log(err.message);
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        flags: InteractionResponseFlags.EPHEMERAL,
        content: "Sorry, I didn't quite get that. Either I'm not working properly, or a cat walked over your keyboard."
      },
    });
  }
}

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/', async function (req, res) {
  console.log('Request Body:');
  console.log(req.body);
  const { type, data, member, channel } = req.body;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name, options } = data;

    switch (name) {
      case 'strangeroll':
        callControllerFunction({ options, res, user: member.user, channel, controllerFunction: RollDice });
        break;
      case 'strangetable':
        callControllerFunction({ options, res, user: member.user, channel, controllerFunction: SelectTableAndRoll });
        break;
      case 'strangefaction':
        callControllerFunction({ options, res, user: member.user, channel, controllerFunction: HandleFactionCommand });
        break;
      case 'createfaction':
        callControllerFunction({ options, res, user: member.user, channel, controllerFunction: CreateFaction });
        break;
      case 'viewfaction':
        callControllerFunction({ options, res, user: member.user, channel, controllerFunction: ViewFaction });
        break;
      case 'updatefaction':
        callControllerFunction({ options, res, user: member.user, channel, controllerFunction: HandleFactionUpdate });
        break;
      case 'strangehelp':
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `The strange tidings app allows you to simulate dice rolls, roll on Strange Tides or basic Mordhiem tables or manage a Strange Tides Faction.
the commands available through this app are:
DICE:
  /strangeroll
TABLES
  /strangetable
FACTION:
  /createfaction
  /viewfaction
  /updatefaction
Would you like to learn more about Dice Rolls, Tables or Faction Management`,
            flags: InteractionResponseFlags.EPHEMERAL,
            components: [
              {
                type: MessageComponentTypes.ACTION_ROW,
                components: [
                  {
                    type: MessageComponentTypes.BUTTON,
                    custom_id: `help_dice`,
                    label: 'Dice',
                    style: ButtonStyleTypes.PRIMARY,
                  },
                  {
                    type: MessageComponentTypes.BUTTON,
                    custom_id: `help_table`,
                    label: 'Tables',
                    style: ButtonStyleTypes.PRIMARY,
                  },
                  {
                    type: MessageComponentTypes.BUTTON,
                    custom_id: `help_faction`,
                    label: 'Faction Management',
                    style: ButtonStyleTypes.PRIMARY,
                  },
                ],
              },
            ],
          },
        });
        break;
      default:
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "Dont know how you even got here, but there is nothing for you here.",
            flags: InteractionResponseFlags.EPHEMERAL,
          },
        });
        break;
    }
  }

  if (type === InteractionType.MESSAGE_COMPONENT) {
    const { custom_id } = data;

    if (custom_id.startsWith('help_')) {
      callControllerFunction({ options: [custom_id.split('_')[1]], res, controllerFunction: HandleHelpRequest });
    }

  }
});

module.exports = app;