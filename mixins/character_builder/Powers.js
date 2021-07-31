export const Powers = {
  computed: {
    hasTechPoints () {
      return this.hasSomeClasses(['infiltrator', 'engineer'])
    },
    csTechKlassAndLevel () {
      return this.mcClassAndLevel('engineer', ['engineer', 'infiltrator'])
    },
    csBioticKlassAndLevel () {
      return this.mcClassAndLevel('adept', ['adept', 'vanguard'])
    },
    csMaxTechPoints () {
      if (!this.hasTechPoints) {
        return 0
      }
      const [klassId, level] = this.csTechKlassAndLevel
      return this.getProgressionValue(klassId, 'tech_points', level)
    },
    csTechPointLimit () {
      if (!this.hasTechPoints) {
        return 0
      }
      const [klassId, level] = this.csTechKlassAndLevel
      return this.getProgressionValue(klassId, 'tech_point_limit', level)
    },
    hasPowerSlots () {
      return this.hasSomeClasses(['sentinel', 'vanguard', 'adept'])
    },
    csPowerSlots () {
      if (!this.hasPowerSlots) {
        return false
      }
      const [klassId, level] = this.csBioticKlassAndLevel
      const ps = this.getProgressionValue(klassId, 'power_slots_by_power_level', level)
      const sentinelClass = this.characterClasses.find(i => i.id === 'sentinel')
      if (sentinelClass) {
        const numSlots = this.getProgressionValue('sentinel', 'power_slots', sentinelClass.levels)
        const slotLvl = this.getProgressionValue('sentinel', 'power_level', sentinelClass.levels)
        ps[slotLvl - 1] += numSlots
      }
      return ps
    },
    csMaxPowersPrepared () {
      if (!this.hasTechPoints) {
        return false
      }
      let limit = 0
      const engineerClass = this.characterClasses.find(i => i.id === 'engineer')
      if (engineerClass) {
        limit += (engineerClass.levels + this.absMod('int'))
      }
      const infiltratorClass = this.characterClasses.find(i => i.id === 'infiltrator')
      if (infiltratorClass) {
        limit += (infiltratorClass.levels + this.absMod('int'))
      }
      return Math.max(limit, 1)
    },
    csMaxPowersKnown () {
      return this.getCombinedProgressionValues(['adept', 'vanguard', 'sentinel'], 'powers_known')
    },
    csMaxCantripsKnown () {
      const cantrips = this.getCombinedProgressionValues(['adept', 'vanguard', 'sentinel'], 'cantrips')
      const combat = this.getCombinedProgressionValues(['soldier', 'infiltrator'], 'combat_powers')
      return cantrips + combat
    }
  },
  methods: {
    getCombinedProgressionValues (klasses, column) {
      let value = 0
      for (const klass of klasses) {
        const hasKlass = this.characterClasses.find(i => i.id === klass)
        if (hasKlass) {
          value += this.getProgressionValue(klass, column, hasKlass.levels)
        }
      }
      return value
    },
    addPower (id, learned = false) {
      const powers = [...this.character.powers]
      if (powers.findIndex(i => i.id === id) > -1) {
        return
      }
      powers.push({
        id,
        learned,
        advancement: false
      })
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'powers', value: powers })
    },
    togglePowerAdvancement (id, advId) {
      const powers = [...this.character.powers]
      const index = powers.findIndex(i => i.id === id)
      if (index > -1) {
        const currPower = { ...powers[index] }
        if (currPower.advancement === advId) {
          currPower.advancement = false
        } else {
          currPower.advancement = advId
        }
        powers.splice(index, 1, currPower)
      }
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'powers', value: powers })
    },
    removePower (id) {
      const powers = [...this.character.powers]
      const index = powers.findIndex(i => i.id === id)
      if (index > -1) {
        powers.splice(index, 1)
      }
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'powers', value: powers })
    }
  }
}
