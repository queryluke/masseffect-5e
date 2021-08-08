export const Speed = {
  computed: {
    // TODO: This should incorporate equipment data
    csSpeed () {
      return this.speciesData.speed.find(i => i.type === 'walk').speed + (this.character.settings.speedBonus || 0)
    }
  }
}
