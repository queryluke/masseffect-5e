export const Barrier = {
  computed: {
    hasBarrier () {
      return this.hasSomeClasses(['adept', 'sentinel', 'vanguard'])
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
    csMaxBarrierTicks () {
      if (!this.hasBarrier) {
        return 0
      }
      const [klassId, level] = this.mcClassAndLevel('vanguard', ['vanguard', 'adept', 'sentinel'])
      return this.getProgressionValue(klassId, 'barrier_ticks', level)
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
    csMaxBarrierUses () {
      if (!this.hasBarrier) {
        return 0
      }
      const [klassId, level] = this.mcClassAndLevel('vanguard', ['vanguard', 'adept', 'sentinel'])
      return this.getProgressionValue(klassId, 'barrier_uses', level)
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
  }
}
