const { marshall } = require("@aws-sdk/util-dynamodb");
const { InteractionResponseType, InteractionResponseFlags } = require('discord-interactions');
const { Thresholds } = require('../data/factionThresholds')
const { createFactionRecord, getFactionRecord, updateFactionRecord } = require('../repositorys/faction');
const { Defaults } = require('../data/factionDefaults');

const checkAdmin = (user) => {
  const AdminUsers = JSON.stringify(process.env.ADMIN_USERS);
  return AdminUsers.includes(user.id)

}

const CreateFaction = async ({ res, user, channel, options }) => {

  const faction = options[0].value

  const adminUser = checkAdmin(user)
  if (!adminUser) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "I'm sorry. You don't have access to this function.",
        flags: InteractionResponseFlags.EPHEMERAL,
      },
    });
  }

  const existingRecord = await getFactionRecord(channel.id)

  if (existingRecord.validFactionChannel) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "There already seems to be a faction registered to this channel. You can't run this command as it would overwrite the existing faction. ",
        flags: InteractionResponseFlags.EPHEMERAL,
      },
    });
  }

  await createFactionRecord({ ...Defaults[faction], channelId: channel.id, factionName: faction });

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "Faction created successfully.",
      flags: InteractionResponseFlags.EPHEMERAL,
    },
  });

}

const getFactionDetails = (faction) => {

  const populationTotal = faction.foodProducers + faction.miners + faction.merchants + faction.soldiers + faction.builders + faction.diplomats + faction.scholars + faction.acolytes + faction.garrisons + faction.special + faction.unassigned

  const population = faction.factionName === 'chaos' ? '' : `Population:
++++++++++
Total Population: ${populationTotal}
Food Producers: ${faction.foodProducers}, Miners: ${faction.miners}, Merchants: ${faction.merchants},
Soldiers: ${faction.soldiers}, Builders: ${faction.builders}, Diplomats: ${faction.diplomats},
Scholars: ${faction.scholars}, Acolytes: ${faction.acolytes}, Garrison: ${faction.garrisons}, Special: ${faction.special}
Unassigned: ${faction.unassigned}
====================================`

  return `Faction Details - ${faction.factionName}
====================================
Faction rating: ${faction.factionPoints}
++++++++++++++
${population}`
}

const getFactionBonuses = (faction) => {

  const bonuses = Object.keys(faction).map(attribute => {
    const attributeThresholds = Thresholds[attribute];
    if (!attributeThresholds || isNaN(faction[attribute])) {
      return '';
    }
    const elligbleBonuses = attributeThresholds.filter(threshold => faction[attribute] >= threshold.value);
    if (elligbleBonuses.length === 0) {
      return '';
    }

    const highestBonus = elligbleBonuses.pop();
    return highestBonus[faction.factionName] || highestBonus.all
  }).filter(value => value !== '').join('\n')
  return `Faction Bonuses - ${faction.factionName}
====================================
${bonuses}
====================================`
}

const ViewFaction = async ({ res, channel }) => {

  const faction = await getFactionRecord(channel.id)

  if (!faction.validFactionChannel) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "No faction registered to this channel. ",
        flags: InteractionResponseFlags.EPHEMERAL,
      },
    });
  }

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${getFactionDetails(faction.factionRecord)}
${getFactionBonuses(faction.factionRecord)}`,
      flags: InteractionResponseFlags.EPHEMERAL,
    },
  });

}

const HandleFactionUpdate = async ({ options, res, user, channel }) => {

  const existingRecord = await getFactionRecord(channel.id)

  if (!existingRecord.validFactionChannel) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "No faction registered to this channel. ",
        flags: InteractionResponseFlags.EPHEMERAL,
      },
    });
  }

  const attribute = options[0].value;
  const newValue = options[1].value;

  if (isNaN(Number(newValue))) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Sorry, I couldn't update your faction. The new attribute value must be numeric.",
        flags: InteractionResponseFlags.EPHEMERAL,
      },
    });
  }

  const faction = await updateFactionRecord({ attribute, newValue, channelId: channel.id });

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${user.global_name} Update completed:
${getFactionDetails(faction)}`,
    },
  });
};

module.exports = {
  HandleFactionUpdate,
  CreateFaction,
  ViewFaction
}