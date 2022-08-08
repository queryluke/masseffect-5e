export const Grenades = {
  computed: {
    maxGrenadeTier () {
      return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].slice(0, Math.floor(this.metaLevel / 2) + 1)
    },
    grenadeOptions () {
      const options = []
      for (const g of this.$store.getters.getData('gear').filter(i => i.type === 'grenade')) {
        if (g.marks) {
          for (const m of g.marks) {
            if (!this.maxGrenadeTier.includes(m.mark)) {
              continue
            }
            for (let i = 1; i <= this.metaTier; i++) {
              let damage = 0
              if (m.damage) {
                const [dieCount, dieType] = m.damage.split('d')
                damage = Math.floor(this.averageFromDie(dieType, dieCount) * i)
              }
              options.push(
                {
                  id: `${g.id}-${m.mark}`,
                  entry: {
                    id: g.id,
                    mark: m.mark.toLowerCase(),
                    uses: i
                  },
                  damage
                }
              )
            }
          }
        } else {
          for (let i = 1; i <= this.metaTier; i++) {
            options.push({
              id: g.id,
              entry: {
                id: g.id,
                uses: i
              },
              damage: 0
            })
          }
        }
      }
      return options
    }
  },
  methods: {
    setGrenades () {
      if (this.options.grenades) {
        const num = this.randomValue([...Array(this.metaTier).keys()].map(i => i + 1))
        const list = []
        for (let i = 0; i < num; i++) {
          let opts = this.grenadeOptions.filter((i) => {
            return this.isDamageAddable({ type: 'grenade', damage: i.damage, uses: i.entry.uses }) && !list.map(j => j.id).includes(i.entry.id)
          })
          if (opts.length > 0) {
            opts = opts.sort((a, b) => b.damage - a.damage).slice(0, 10)
            const o = this.randomValue(opts)
            list.push(o.entry)
            this.addDamage({ type: 'grenade', damage: o.damage, uses: o.entry.uses })
          }
        }
        this.npc.entries.features.push({
          list,
          name: 'Grenades',
          text: `The ${this.lcName} has the following grenades equipped. It can use a grenade as an action.`,
          id: 'grenades'
        })
      }
    }
  }
}
