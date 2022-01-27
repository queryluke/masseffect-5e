export const Feats = {
  computed: {
    selectedFeats () {
      return this.mechanicBagSelections.filter(i => i.type === 'feats').map(i => i.value)
    }
  }
}
