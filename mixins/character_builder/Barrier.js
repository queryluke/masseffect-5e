export const Barrier = {
  computed: {
    hasBarrier () {
      return this.characterClasses.some(i => ['adept', 'sentinel', 'vanguard'].includes(i.id))
    },
    csBarrierDieType () {
      if (!this.hasBarrier) {
        return false
      }
      if (!this.characterClasses.map(i => i.id).includes('vanguard')) {
        return '1d8'
      }
      const vanguardClass = this.characterClasses.find(i => i.id === 'vanguard')
      let num = 1
      let type = 8
      if (vanguardClass.levels >= 11) {
        num = 2
      }
      if (vanguardClass.subclass === 'battle-master') {
        if (vanguardClass.levels >= 10) {
          type = 10
        }
        if (vanguardClass.levels >= 18) {
          type = 12
        }
      }
      return `${num}d${type}`
    },
    csMaxBarrierTicks: {
      get () {
        return this.character.currentStats.barrier.ticks.max
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'currentStats.barrier.ticks.max',
          value
        })
      }
    },
    csCurrentBarrierTicks: {
      get () {
        if (!this.hasBarrier) {
          return 0
        }
        return this.character.currentStats.barrier.ticks.value
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'currentStats.barrier.ticks.value',
          value
        })
      }
    },
    csMaxBarrierUses: {
      get () {
        return this.character.currentStats.barrier.uses.max
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'currentStats.barrier.uses.max',
          value
        })
      }
    },
    csCurrentBarrierUses: {
      get () {
        return this.character.currentStats.barrier.uses.value
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'currentStats.barrier.uses.value',
          value
        })
      }
    },
    csRemainingBarrierUses () {
      return this.hasBarrier ? Math.max(0, this.csMaxBarrierUses - this.csCurrentBarrierUses) : '-'
    }
  },
  methods: {
    setBarrierMaxes () {
      if (!this.hasBarrier) {
        return 0
      }
      const klasses = []
      for (const klass of this.characterClasses) {
        if (['adept', 'vanguard', 'sentinel'].includes(klass.id)) {
          klasses.push({ id: klass.id, levels: klass.levels })
        }
      }
      let klassId, level
      // Multiclassing
      if (klasses.length > 1) {
        klassId = 'vanguard'
        let totalLevels = 0
        for (const klass of klasses) {
          if (klass.id === 'vanguard') {
            totalLevels += klass.levels
          } else {
            totalLevels += (klass.levels / 2)
          }
        }
        level = Math.floor(totalLevels)
      } else {
        klassId = klasses[0].id
        level = klasses[0].levels
      }
      const [maxTicks, maxUses] = this.getBarrierValues(klassId, level)
      this.csMaxBarrierTicks = maxTicks
      this.csMaxBarrierUses = maxUses
    },
    getBarrierValues (id, level) {
      const prog = this.classData(id).progression.columns
      const ticks = prog.find(i => i.label === 'barrier_ticks').values
      const uses = prog.find(i => i.label === 'barrier_uses').values
      return [ticks[level - 1], uses[level - 1]]
    }
  }

}
