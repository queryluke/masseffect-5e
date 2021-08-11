export const Speed = {
  computed: {
    // TODO: This should incorporate equipment data
    csSpeed () {
      let speed = 30
      if (this.speciesId !== 'hanar') {
        speed = this.speciesData.speed.find(i => i.type === 'walk').speed
      }
      return speed + (this.character.settings.speedBonus || 0)
    }
  }
}
