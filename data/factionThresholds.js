


const Thresholds = {

  factionPoints: [
    {
      value: 5,
      novatorrosa: 'Special Trade Wagon',
      startower: 'Ballista',
      gravehammersrest: 'Barge',
      chaos: 'Random Happenings on 1 or 2,'
    },
    {
      value: 10,
      novatorrosa: 'Special Trade Wagon, Trade routes, New world bounty,',
      startower: 'Ballista, The Vault',
      gravehammersrest: 'Barge, The Mound',
      chaos: 'Random Happenings on 1 or 2, not affected negative weather, '
    },
    {
      value: 15,
      novatorrosa: "Special Trade Wagon, Trade routes, New world bounty, Beujuntae's Revenge",
      startower: 'Ballista, The Vault, Reactivated Waystones',
      gravehammersrest: 'Barge, The Mound, The Duchesss',
      chaos: 'Random Happenings on 1 or 2, not affected negative weather, can use alternate random happening'

    },
    {
      value: 20,
      novatorrosa: "Special Trade Wagon, Trade routes, New world bounty, Beujuntae's Revenge, End game scenario",
      startower: 'Ballista, The Vault, Reactivated Waystones, End game scenario',
      gravehammersrest: 'Barge, The Mound, The Duchesss, End game scenario',
      chaos: 'Random Happenings on 1 or 2, not affected negative weather, can use alternate random happening, End game scenario'
    },
  ],
  foodProducers: [
    {
      value: 4,
      all: '+1 Provisions'
    },
    {
      value: 7,
      all: '+2 Provisions'
    },
    {
      value: 10,
      all: '+3 Provisions'
    }
  ],
  miners: [
    {
      value: 4,
      all: '+1 Obsinite'
    },
    {
      value: 7,
      all: '+2 Obsinite'
    },
    {
      value: 10,
      all: '+3 Obsinite'
    }
  ],
  merchants: [
    {
      value: 4,
      all: '-1 Rarity'
    },
    {
      value: 7,
      all: '-2 Rarity'
    },
    {
      value: 10,
      all: '-3 Rarity'
    }
  ],
  soldiers: [
    {
      value: 4,
      all: '+1 Bloodpack rolls'
    },
    {
      value: 7,
      all: '+1 Bloodpack rolls, +1 Warband Max'
    },
    {
      value: 10,
      all: '+1 Bloodpack rolls, +2 Warband Max'
    }
  ],
  builders: [
    {
      value: 4,
      all: '+1 Defensive Equipment'
    },
    {
      value: 7,
      all: '+2 Defensive Equipment'
    },
    {
      value: 10,
      all: '+3 Defensive Equipment'
    }
  ],
  diplomats: [
    {
      value: 4,
      all: '+1 Settlment Entry Rolls'
    },
    {
      value: 7,
      all: '+2 Settlment Entry Rolls'
    },
    {
      value: 10,
      all: '+3 Settlment Entry Rolls'
    }
  ],
  scholars: [
    {
      value: 4,
      all: '+1 Spellcasting rolls'
    },
    {
      value: 7,
      all: '+2 Spellcasting rolls'
    },
    {
      value: 10,
      all: '+3 Spellcasting rolls'
    }
  ],
  acolytes: [
    {
      value: 4,
      all: '+1 Prayer rolls'
    },
    {
      value: 7,
      all: '+2 Prayer rolls'
    },
    {
      value: 10,
      all: '+3 Prayer rolls'
    }
  ],
  garrison: [
    {
      value: 4,
      novatorrosa: '4 Human Militia',
      startower: '4 Skink Braves',
      gravehammersrest: '4 Skeletal Buccaneers'
    },
    {
      value: 7,
      novatorrosa: '4 Human Militia, 3 Human Sharpshooters',
      startower: '4 Skink Braves, 3 Sea Guard',
      gravehammersrest: '4 Skeletal Buccaneers, 3 Vengeful Spirits'
    },
    {
      value: 10,
      novatorrosa: '4 Human Militia, 3 Human Sharpshooters, 1 Orge Bulwark',
      startower: '4 Skink Braves, 3 Sea Guard, 1 Kroxigor',
      gravehammersrest: '4 Skeletal Buccaneers, 3 Vengeful Spirits, 3 Wight Cannoneers and a Soggy Cannon'
    }
  ],
  special: [
    {
      value: 4,
      novatorrosa: '1 x adjust exploration die by 1',
      startower: '1 x adjust random happenings die by 1',
      gravehammersrest: '1 x gain d6x10gc at the end of each round'
    },
    {
      value: 7,
      novatorrosa: '2 x adjust exploration die by 1',
      startower: '2 x adjust random happenings die by 1',
      gravehammersrest: '2 x gain d6x10gc at the end of each round'
    },
    {
      value: 10,
      novatorrosa: '3 x adjust exploration die by 1',
      startower: '3 x adjust random happenings die by 1',
      gravehammersrest: '3 x gain d6x10gc at the end of each round'
    },
  ],

}

module.exports = { Thresholds }