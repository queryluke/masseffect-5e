export const Speed = {
  computed: {
    csSpeed () {
      if (this.character.settings.speeds?.walk) {
        return this.character.settings.speeds?.walk
      }
      let speed = 30
      // TODO: This should incorporate equipment data
      if (this.speciesId !== 'hanar') {
        speed = this.speciesData.speed.find(i => i.type === 'walk').speed
      }
      return speed
    },
    csAddlSpeeds () {
      const selections = this.selections.filter(i => i.type === 'speed').map(i => i.has)
      const speciesSpeeds = this.speciesData.speed
      const overrides = Object.entries(this.character.settings.speeds || {}).filter(i => i[1] > 0).map((i) => {
        return {
          type: i[0],
          speed: i[1]
        }
      })
      const allSpeeds = selections.concat([...speciesSpeeds])
      const allButWalking = allSpeeds.filter(i => i.type !== 'walk')
      const finalSpeeds = []
      for (const speed of allButWalking) {
        const existingIndex = finalSpeeds.findIndex(i => i.type === speed.type)
        if (existingIndex > -1) {
          if (finalSpeeds[existingIndex].speed < speed.speed) {
            finalSpeeds.splice(existingIndex, 1, speed)
          }
        } else {
          finalSpeeds.push(speed)
        }
      }
      for (const speed of overrides) {
        const existingIndex = finalSpeeds.findIndex(i => i.type === speed.type)
        if (existingIndex > -1) {
          finalSpeeds.splice(existingIndex, 1, speed)
        } else {
          finalSpeeds.push(speed)
        }
      }
      return finalSpeeds
    }
  }
}
