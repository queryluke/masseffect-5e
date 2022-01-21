export const MechanicBag = {
  computed: {
    mechanicBag () {
      return [
        ...(this.speciesTraits.reduce((acc, curr) => acc.concat(curr.mechanics || []), []))
      ]
    }
  },
  methods: {
    mechanicSelection (path) {

    },
    mechanicSelectionsMade (path, count) {

    }
  }
}
