export const Legendary = {
  methods: {
    setLegendary () {
      let order
      switch (this.options.damageFocus) {
        case 'powers':
          order = ['power', 'weapon']
          if (this.options.grenades) {
            order.push('grenade')
          }
          break
        case 'weapons':
          order = ['weapon', 'power']
          if (this.options.grenades) {
            order.push('grenade')
          }
          break
        case 'grenades':
          order = this.options.grenades ? ['grenade', 'weapon', 'power'] : ['weapon', 'power']
          break
        default:
          break
      }
      if (this.options.klass.id === 'soldier') {
        order.splice(order.indexOf('power'), 1)
      }
      for (const type of order) {
        this.attemptSetLegendary(type)
      }
      if (JSON.stringify(this.npc.entries.legendary) !== '{}') {
        this.npc.entries.legendary.text = `The ${this.lcName} can take 3 legendary actions, choosing from the options below. Only one legendary action can be used at a time and only at the end of another creature's turn. The ${this.lcName} regains spent legendary actions at the start of its turn.`
        const numActions = Object.keys(this.npc.entries.legendary.actions).length
        const actions = [
          {
            id: 'detect',
            name: 'Detect',
            text: `The ${this.lcName} makes a Wisdom (Perception) check.`
          },
          {
            id: 'move',
            name: 'Move',
            text: `The ${this.lcName} moves up to its speed.`
          },
          {
            id: 'dodge',
            name: 'Dodge',
            text: `The ${this.lcName} takes the Dodge action.`
          },
          {
            id: 'hide',
            name: 'Hide',
            text: `The ${this.lcName} takes the Hide action.`
          }
        ]
        if (['adept', 'vanguard', 'sentinel'].includes(this.options.klass.id)) {
          actions.push({
            id: 'barrier',
            name: 'Barrier',
            text: `The ${this.lcName} uses its Barrier.`
          })
        }
        if (this.options.klass.id === 'infiltrator') {
          actions.push({
            id: 'tac-cloak',
            name: 'Tactical Cloak',
            text: `The ${this.lcName} uses its Tactical Cloak.`
          })
        }
        const taken = []
        for (let i = 0; i < (3 - numActions); i++) {
          const action = this.randomValue(actions.filter(i => !taken.includes(i.id)))
          taken.push(action.id)
          this.npc.entries.legendary.actions.push(action)
        }
      }
    },
    attemptSetLegendary (type) {
      if (this.calcAvgDamage(this.damage, this.legendary) < this.minDmg) {
        let added = false
        for (let i = 1; i < 4; i++) {
          if (added) {
            continue
          }
          const legendary = { type, cost: i }
          if (this.isLegendaryAddable(legendary)) {
            let name, text, id, multiIndex
            switch (type) {
              case 'power':
                name = 'Cast a Power'
                text = `The ${this.lcName} casts one of its powers.`
                id = 'castPower'
                break
              case 'weapon':
                multiIndex = this.npc.entries.actions.findIndex(i => i.id === 'multiattack')
                if (multiIndex > -1) {
                  name = 'Attack'
                  text = this.npc.entries.actions[multiIndex].text
                } else {
                  name = 'Attack'
                  text = `The ${this.lcName} makes one weapon attack.`
                }
                id = 'attack'
                break
              case 'grenade':
                name = 'Use a Grenade'
                text = `The ${this.lcName} uses one of its grenades.`
                id = 'grenade'
                break
            }
            if (!this.npc.entries.legendary.actions) {
              this.npc.entries.legendary.actions = []
            }
            this.npc.entries.legendary.actions.push({
              name,
              text,
              cost: i,
              id
            })
            this.legendary.push(legendary)
            added = true
          }
        }
      }
    }
  }
}
