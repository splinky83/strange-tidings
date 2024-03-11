const { InteractionResponseType, InteractionResponseFlags } = require('discord-interactions');

const HandleHelpRequest = async ({ res, options }) => {
  const topic = options[0];

  switch (topic) {
    case 'dice':
      await res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.EPHEMERAL,
          content: `The strangeroll command simulates dice rolls. You can roll any number of dice, with any number of faces.
Each face on an individual die will have the same chance of appearing. The randomised results are cryptographically random, so it should be near impossible to predict a result.
When rolling multiple dice, the results will be returned in the order rolled, and will not be sorted by size.
To use the command type a slash and then 'strangeroll' then type a space followed by the number of dice you wish to roll and the number of faces on those dice separated by a captial or lower cae d.
For example, to roll 2d6 enter:

/strangeroll 2d6

This will return a result similar to the following:

username Total: 8, Dice: 3,5

The Total refers to the sum of the top faces of all dice rolled. Dice will list all individual dice rolled, seperated by commas, in the order they were rolled.
The result will persist in the channel, and can be seen by all users.`,
        },
      });
      console.log('Reaching the point');
      break;
    case 'table':
      await res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.EPHEMERAL,
          content: `The strange tables command simulates a dice roll on specific tables relating to Mordhiem in general or the Strange Tides campaign.
When using the app, you will be prompted to select a table. The app will then return a random result as if you had rolled on that table.
When the table calls for multiple dice to be rolled, the app will simulate the roll each of the dice before totaling them, rather than naively generating a number in the required range. This will ensure you get a properly weighted result.
Where the table result would prompt you to roll another die, the app will simulate the roll of that additional die, and return a result from the relevant subtable.
To use the command type a slash, followed by strangetables eg:
/strangetables
You will then be prompted to select a table to roll on currently your options are:
Advancement - Hero, Advancement - Henchmen
This will give you a result similar to the following:

Username Dice rolls (in order): 3,1, Result: New Skill

The dice rolls section will show you all the dice rolled (including any dice from subtables) in the order the were rolled, while the Result section will show you the text from the table.
The result you roll will remain in the channel and will be visible to everyone.`,
        },
      });
      break;
    case 'faction':
      await res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.EPHEMERAL,
          content: `The faction management feature of this app encompases three commands. These are createfaction, updatefaction, viewfaction .
These faction commands are tied to discord channels. The createfaction command will create a faction for the channel in which the command is run.
The updatefaction command will update the faction tied to the channel the in which the command is run.
The viewfaction command will show the details of the faction tied to the channel in which it is run.
The viewfaction and updatefaction command will fail if run in a channel with no faction tied to it. The createfaction command will fail if run in a channel with an existing faction tied to it.
The create faction command can only be run by an app adiminstrator.
When running the create faction command you will be prompted to select a faction name from a short list. This will determine the starting values for faction attributes.
When running the update faction command you will be prompted to select an attribute to update. You will then be prompted to enter the new value. This must be a whole number, and will be the new value for the attribute, not the amount by which it changes.
The view faction command will give you a summary of the faction tied to the channel including bonuses that apply to warbands in your faction.
The createfaction and viewfaction commands are ephemral. The respones will only be visible to you, and will only stay until dismissed. The updatefaction command will stay as a log of the update.`,
        },
      });
      break;
    default:
      await res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "Dont know how you even got here, but there is nothing for you here.",
        },
      });
      break;
  }
};


module.exports = {
  HandleHelpRequest
};