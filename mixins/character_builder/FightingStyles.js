export const FightingStyles = {
  data () {
    return {
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
      ]
    }
  },
  computed: {
    selectedFightingStyles () {
      // TODO: remove the character.fightingStyles
      const oldFs = (this.character.fightingStyles || []).map(i => i.name.toLowerCase().replaceAll(' ', '-'))
      const fightingStyles = this.mechanicBagSelections.filter(i => i.type === 'fighting-style').map(i => i.value)
      return [...new Set(oldFs.concat(fightingStyles))]
    },
    csFightingStyles () {
      const fightingStyles = []
      for (const id of this.selectedFightingStyles) {
        const fs = this.getFightingStyle(id)
        if (fs) {
          fightingStyles.push(fs)
        } else {
          // console.log(`${id} fighting style not found`)
        }
      }
      return fightingStyles
    }
  },
  methods: {
    getFightingStyle (id) {
      return this.fightingStyles.find(i => i.id === id)
    }
  }
}
