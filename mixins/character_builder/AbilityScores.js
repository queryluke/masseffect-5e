export const AbilityScores = {
  computed: {
    absGenMethod: {
      get () {
        return this.character.abilityScores.genMethod
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'abilityScores.genMethod', value })
      }
    },
    selectedAbilityScores () {
      if (!this.absGenMethod) {
        return false
      }
      return this.character.abilityScores[this.absGenMethod.value]
    },
    allAbilityScoresSet () {
      if (!this.absGenMethod) {
        return false
      }
      return this.selectedAbilityScores && Object.values(this.selectedAbilityScores).every(abs => abs !== null)
    }
  },
  methods: {
    absSpeciesBonus (ability) {
      if (this.speciesData) {
        const base = this.speciesData.abilityScoreIncrease.find(i => i.ability === ability)
        if (base) {
          return base.amount
        }
      }
      return 0
      // TODO: other abs increases like quarian option
    },
    getAbsBase (ability) {
      return this.selectedAbilityScores ? this.selectedAbilityScores[ability] : 0
    },
    setAbsBase ({ ability, value }) {
      const val = value === null ? null : Number.parseInt(value, 10)
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `abilityScores.${this.absGenMethod.value}.${ability}`, value: val })
    },
    absMod (ability) {
      return this.abilityScoreBonus(this.absTotal(ability))
    },
    absAbis (ability) {
      let final = 0
      for (const klass of this.characterClasses) {
        const abis = Object.values(klass.featureSelections).filter(i => i.type === 'abi')
        for (const abi of abis) {
          if (abi.value[0] === ability && (abi.value[1] === ability || abi.value[1] === null)) {
            final += 2
            continue
          }
          if (abi.value[0] === ability || abi.value[1] === ability) {
            final += 1
            continue
          }
        }
      }
      return final
    },
    absMisc (ability) {
      return 0
    },
    absTotal (ability) {
      const override = this.getAbsOverride(ability) || 0
      if (override > 0) {
        return Number.parseInt(override, 10)
      }
      const base = this.getAbsBase(ability)
      const species = this.absSpeciesBonus(ability)
      const abis = this.absAbis(ability)
      const other = this.getAbsOther(ability) || 0
      return base + species + abis + Number.parseInt(other, 10)
    },
    getAbsOther (ability) {
      return this.character.abilityScores.other[ability]
    },
    setAbsOther ({ ability, value }) {
      return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `abilityScores.other.${ability}`, value })
    },
    getAbsOverride (ability) {
      return this.character.abilityScores.override[ability]
    },
    setAbsOverride ({ ability, value }) {
      return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `abilityScores.override.${ability}`, value })
    }
  }

}
