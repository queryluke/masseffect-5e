export const MechanicBag = {
  computed: {
    mechanicBag () {
      return [
        ...this.rootSpeciesMechanics,
        ...this.speciesTraits.reduce((acc, curr) => acc.concat(curr.mechanics || []), []),
        ...this.csFightingStyles.reduce((acc, curr) => acc.concat(curr.mechanics || []), []),
        ...this.hydratedMbs.reduce((acc, curr) => acc.concat(curr.mechanics || []), [])
      ]
    },
    // Technically this is mechanicBagWithSubSelections
    mechanicBagSelections () {
      return this.character.selected.reduce((acc, curr) => acc.concat(curr.value || []), [])
    },
    hydratedMbs () {
      return this.mechanicBagSelections
        .filter(i => ['feats', 'benefits'].includes(i.type))
        .map(i => this.$store.getters.getItem(i.type, i.value))
    }
  },
  methods: {
    mcBonus (bonus) {
      const multiplier = bonus.multiplier || 1
      const min = bonus.min || 0
      let b = 0
      switch (bonus.type) {
        case 'flat':
          b = bonus.value
          break
        case 'mod':
          b = this.absMod(bonus.value) * multiplier
          break
        case 'proficiency':
          b = this.profBonus * multiplier
          break
        case 'level':
          b = this.level * multiplier
          break
        default:
          b = 0
      }
      return Math.max(min, b)
    }
  }
}
