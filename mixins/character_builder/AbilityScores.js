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
      return this.character.abilityScores[this.abilityScoreGenMethod]
    },
    allAbilityScoresSet () {
      return this.selectedAbilityScores && Object.values(this.selectedAbilityScores).every(abs => abs !== null)
    }
  },
  methods: {
    absRacialBonus (ability) {

    },
    getAbsBase (ability) {
      return this.character.abilityScores[this.absGenMethod][ability] || 0
    },
    setAbsBase ({ ability, value }) {
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `abilityScores.${this.absGenMethod}.${ability}`, value })
    },
    absMod (ability) {

    },
    absAbis (ability) {

    },
    absMisc (ability) {

    },
    absTotal (ability) {
      if (this.getAbsOverride(ability)) {
        return this.getAbsOverride(ability)
      }
      // const base = this.getAbsBase(ability)
      // const racial = 0
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
      return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `abilityScores.other.${ability}`, value })
    }
  }

}
