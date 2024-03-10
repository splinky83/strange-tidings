const { InstallGlobalCommands } = require('./utils.js');


const STRANGE_TABLES = [
  {
    name: 'Advancement - Hero',
    value: 'advhero'
  },
  {
    name: 'Advancement - Henchmen',
    value: 'advhench'
  }
]

const STRANGE_FACTION_COMMANDS = [
  {
    name: 'Create Faction',
    value: 'create'
  },
  {
    name: 'View Faction',
    value: 'view'
  }
]

const STRANGE_FACTIONS = [
  {
    name: 'Nova Torrosa',
    value: 'novatorrosa'
  },
  {
    name: "Gravehammer's Rest",
    value: 'gravehammersrest'
  },
  {
    name: 'The Star Tower',
    value: 'startower'
  },
  {
    name: 'Chaos in the New World',
    value: 'chaos'
  }
]

STRANGE_FACTION_ATTRIBUTES = [
  {
    name: 'Faction Points',
    value: 'factionPoints'
  },
  {
    name: 'Food Producers',
    value: 'foodProducers'
  },
  {
    name: 'Miners',
    value: 'miners'
  },
  {
    name: 'Merchants',
    value: 'merchants'
  },
  {
    name: 'Soldiers',
    value: 'soldiers'
  },
  {
    name: 'Builders',
    value: 'builders'
  },
  {
    name: 'Diplomats',
    value: 'diplomats'
  },
  {
    name: 'Scholars',
    value: 'scholars'
  },
  {
    name: 'Acolytes',
    value: 'acolytes'
  },
  {
    name: 'Garrisons',
    value: 'garrisons'
  },
  {
    name: 'Special',
    value: 'special'
  },
]

const ALL_COMMANDS = [
  {
    name: 'createfaction',
    description: 'Create a new faction - admin only',
    options: [
      {
        type: 3,
        name: 'faction',
        description: 'The name of the faction being installed in this channel',
        required: true,
        choices: STRANGE_FACTIONS
      }
    ],
    type: 1,
  },
  {
    name: 'viewfaction',
    description: 'View your faction = faction channel only',
    type: 1,
  },
  {
    name: 'strangehelp',
    description: 'Strange Tidings App - How do I work this?',
    type: 1,
  },
  {
    name: 'updatefaction',
    description: 'Update the faction for this channel',
    options: [
      {
        type: 3,
        name: 'attribute',
        description: 'Select an attributre to update',
        required: true,
        choices: STRANGE_FACTION_ATTRIBUTES
      }, {
        type: 3,
        name: 'newvalue',
        description: 'Enter the new value for the selected attributre',
        required: true,
      }
    ],
    type: 1,
  },
  {
    name: 'strangeroll',
    description: 'Roll some dice',
    options: [
      {
        type: 3,
        name: 'dice',
        description: '<No.dice>d<No.faces>',
        required: true,
      },
    ],
    type: 1,
  },
  {
    name: 'strangetable',
    description: 'Roll on a table',
    options: [
      {
        type: 3,
        name: 'table',
        description: 'Select table',
        required: true,
        choices: STRANGE_TABLES
      },
    ],
    type: 1,
  },
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);