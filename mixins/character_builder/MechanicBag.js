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
  }
}
