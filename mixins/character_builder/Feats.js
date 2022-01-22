export const Feats = {
  computed: {
    selectedFeats () {
      return this.mechanicBag.filter(i => i.type === 'feat').map(i => i.value)
    }
  }
}
