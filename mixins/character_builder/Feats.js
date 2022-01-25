export const Feats = {
  computed: {
    selectedFeats () {
      return this.mechanicBagSelections.filter(i => i.type === 'feat').map(i => i.value)
    }
  }
}
