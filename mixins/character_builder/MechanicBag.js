export const MechanicBag = {
  computed: {
    mechanicBag () {
      return [
        ...this.rootSpeciesMechanics,
        ...(this.speciesTraits.reduce((acc, curr) => acc.concat(curr.mechanics || []), [])),
        // selections
        ...this.character.selected.reduce((acc, curr) => acc.concat(curr.value || []), [])
      ]
    }
  },
  methods: {
    mcBonus (bonus) {
      const multiplier = bonus.multiplier || 1
      switch (bonus.type) {
        case 'flat':
          return bonus.value
        case 'mod':
          return this.absMod(bonus.value) * multiplier
        case 'proficiency':
          return this.profBonus * multiplier
        case 'level':
          return this.level * multiplier
      }
      return 0
    }
  }
}
