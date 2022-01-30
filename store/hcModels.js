// TODO: all these hardcoded models eventually need to be retrieved from the API
export const state = () => ({
  fightingStyles: [
    {
      id: 'ambidextrous',
      name: 'Ambidextrous',
      html: 'When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.',
      mechanics: []
    },
    {
      id: 'assault',
      name: 'Assault',
      html: 'When you make a Burst Fire attack, the DC of the saving throw is 17.',
      mechanics: []
    },
    {
      id: 'brawler',
      name: 'brawler',
      html: 'Add your proficiency bonus to your melee attack damage rolls.',
      mechanics: []
    },
    {
      id: 'carnage',
      name: 'Carnage',
      html: 'When you roll a 1 or 2 on a damage die for an attack you make with a shotgun, you can reroll the die and must use the new roll.',
      mechanics: []
    },
    {
      id: 'close-quarters-shooter',
      name: 'Close-Quarters Shooter',
      html: 'When making a ranged attack while you are within <me-distance length="5" /> of a hostile ' +
        'creature, you do not have disadvantage on the attack roll. Your ranged attacks ignore half-cover against targets within <me-distance length="30" /> of you.',
      mechanics: []
    },
    {
      id: 'defense',
      name: 'Defense',
      html: '+1 AC.',
      mechanics: [
        {
          type: 'ac',
          bonus: {
            type: 'flat',
            value: 1
          }
        }
      ]
    },
    {
      id: 'the-free-hand',
      name: 'The Free Hand',
      html: 'When holding no more than one light, non-two-handed weapon, you gain a +2 bonus to hit with ranged power attacks.',
      mechanics: []
    },
    {
      id: 'protection',
      name: 'Protection',
      html: 'When a creature you can see attacks a target other than you that is within <me-distance length="5" /> ' +
        'of you, you can use your reaction and expend one barrier tick to impose disadvantage on the attack roll. If the attack ' +
        'hits, the damage is reduced by your barrier tick roll.',
      mechanics: [
        {
          type: 'reaction',
          shortDesc: 'When a creature you can see attacks a target other than you that is within <me-distance length="5" /> ' +
            'of you, expend one barrier tick to impose disadvantage on the attack roll. If the attack ' +
            'hits, the damage is reduced by your barrier tick roll.'
        }
      ]
    },
    {
      id: 'sniper',
      name: 'Sniper',
      html: 'If no hostile creature is within <me-distance length="30" /> of you, gain +2 to damage rolls on attacks ' +
        'made with a sniper rifle.',
      mechanics: []
    }
  ],
  subgrounds: [
    {
      id: 'armorsmith',
      name: 'Armorsmith',
      mechanics: [{ type: 'tool', value: 'armorsmiths-workbench' }]
    },
    {
      id: 'brewer',
      name: 'Brewer',
      mechanics: [{ type: 'tool', value: 'brewers-supplies' }]
    },
    {
      id: 'chemist',
      name: 'Chemist',
      mechanics: [{ type: 'tool', value: 'chemists-supplies' }]
    },
    {
      id: 'cook',
      name: 'Cook',
      mechanics: [{ type: 'tool', value: 'cooks-utensils' }]
    },
    {
      id: 'mechanic',
      name: 'Mechanic',
      mechanics: [{ type: 'tool-choice', limit: ['tinkers-tools', 'starship'], options: true }]
    },
    {
      id: 'painter',
      name: 'Painter',
      mechanics: [{ type: 'tool', value: 'painters-supplies' }]
    },
    {
      id: 'tailor',
      name: 'Tailor',
      mechanics: [{ type: 'tool', value: 'tailors-tools' }]
    },
    {
      id: 'weaponsmith',
      name: 'Weaponsmith',
      mechanics: [{ type: 'tool', value: 'weaponsmiths-workbench' }]
    },
    {
      id: 'assassin',
      name: 'Assassin',
      mechanics: [{ type: 'skill', value: 'acrobatics' }, { type: 'skill', value: 'stealth' }]
    },
    {
      id: 'blackmailer',
      name: 'Blackmailer',
      mechanics: [{ type: 'skill', value: 'deception' }, { type: 'skill', value: 'intimidation' }]
    },
    {
      id: 'fence',
      name: 'Fence',
      mechanics: [{ type: 'skill', value: 'deception' }, { type: 'skill', value: 'persuasion' }]
    },
    {
      id: 'gambler',
      name: 'Gambler',
      mechanics: [{ type: 'skill', value: 'deception' }, { type: 'skill', value: 'sleight-of-hand' }]
    },
    {
      id: 'gang-member',
      name: 'Gang Member',
      mechanics: [{ type: 'skill', value: 'intimidation' }, { type: 'skill', value: 'stealth' }]
    },
    {
      id: 'pickpocket',
      name: 'Pickpocket',
      mechanics: [{ type: 'skill', value: 'stealth' }, { type: 'skill', value: 'sleight-of-hand' }]
    },
    {
      id: 'smuggler',
      name: 'Smuggler',
      mechanics: [{ type: 'skill', value: 'sleight-of-hand' }, { type: 'skill', value: 'vehicle-handling' }]
    },
    {
      id: 'thief',
      name: 'Thief',
      mechanics: [{ type: 'skill', value: 'perception' }, { type: 'skill', value: 'stealth' }]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      mechanics: [{ type: 'tool-choice', limit: ['chemists-supplies', 'brewers-supplies'], options: true }]
    },
    {
      id: 'astronomy',
      name: 'Astronomy',
      mechanics: [{ type: 'tool', value: 'starship-system-navigation' }]
    },
    {
      id: 'engineering',
      name: 'Engineering',
      mechanics: [{ type: 'tool', value: 'tinkers-tools' }]
    },
    {
      id: 'physics',
      name: 'Physics',
      mechanics: [{ type: 'tool', value: 'starship-system-drive' }]
    },
    {
      id: 'computer-science',
      name: 'Computer Science',
      mechanics: [{ type: 'tool', value: 'starship-system-ews' }]
    },
    {
      id: 'biology',
      name: 'Biology',
      mechanics: [{ type: 'tool', value: 'medical-kit' }]
    },
    {
      id: 'philosophy',
      name: 'Philosophy',
      mechanics: [{ type: 'tool-choice', limit: ['musical-instrument', 'gaming-set'], options: true }]
    },
    {
      id: 'general-studies',
      name: 'General Studies',
      mechanics: [{ type: 'tool-choice', limit: ['brewers-supplies', 'hacking-tools', 'starship-system-ssc'], options: true }]
    }
  ]
})

export const getters = {
  fightingStyles: state => state.fightingStyles,
  subgrounds: state => state.subgrounds
}

export const mutations = {
}

export const actions = {
}
