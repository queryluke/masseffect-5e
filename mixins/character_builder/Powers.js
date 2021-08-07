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
      let ps = [0, 0, 0, 0, 0]
      const [klassId, level] = this.csBioticKlassAndLevel
      if (klassId) {
        ps = this.getProgressionValue(klassId, 'power_slots_by_power_level', level)
      }
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
    },
    csStartingClassPowerAbility () {
      let chaTotal, wisTotal, dexTotal, intTotal, strTotal
      const startingKlassId = this.characterClasses[0].id || 'adept'
      switch (startingKlassId) {
        case 'adept':
        case 'vanguard':
          return this.speciesId === 'asari' ? 'cha' : 'wis'
        case 'engineer':
        case 'infiltrator':
          return 'int'
        case 'sentinel':
          chaTotal = this.absTotal('cha')
          wisTotal = this.absTotal('wis')
          intTotal = this.absTotal('int')
          return chaTotal >= wisTotal && chaTotal >= intTotal
            ? 'cha'
            : wisTotal >= intTotal
              ? 'wis'
              : 'int'
        case 'soldier':
          dexTotal = this.absTotal('dex')
          strTotal = this.absTotal('str')
          return dexTotal >= strTotal ? 'dex' : 'str'
      }
    },
    csTechPointsUsed: {
      get () {
        return this.character.currentStats.tpUsed
      },
      set (value) {
        console.log(value, this.csMaxTechPoints)
        const nonMaxZeroValue = value >= this.csMaxTechPoints ? this.csMaxTechPoints : value <= 0 ? 0 : value
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'currentStats.tpUsed', value: nonMaxZeroValue })
      }
    }
  },
  methods: {
    csGetPowerSlotsUsed (psIndex) {
      return this.character.currentStats.psUsed[psIndex]
    },
    csSetPowerSlotsUsed (psIndex, value) {
      const nonMaxZeroValue = value >= this.csPowerSlots[psIndex] ? this.csPowerSlots[psIndex] : value <= 0 ? 0 : value
      const values = [...this.character.currentStats.psUsed]
      values.splice(psIndex, 1, nonMaxZeroValue)
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'currentStats.psUsed', value: values })
    },
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
    addPower (item, learned = false) {
      const powers = [...this.character.powers]
      const id = item.id
      if (powers.findIndex(i => i.id === id) > -1) {
        return
      }
      powers.push({
        id,
        learned,
        level: item.level,
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
