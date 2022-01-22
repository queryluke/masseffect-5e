export const Speed = {
  computed: {
    csSpeed () {
      return this.maxSpeedOfType('walk')
    },
    allCsSpeeds () {
      const allSpeeds = []
      for (const type of ['walk', 'swim', 'fly', 'climb', 'burrow']) {
        const highest = this.maxSpeedOfType(type)
        if (highest) {
          allSpeeds.push(highest)
        }
      }
      return allSpeeds
    }
  },
  methods: {
    maxSpeedOfType (speedType) {
      if (this.character.settings.speeds[speedType] > 0) {
        return {
          type: 'speed',
          speed: speedType,
          distance: this.character.settings.speeds[speedType],
          note: 'overridden'
        }
      }
      const selectedSpeeds = this.mechanicBag.filter(i => i.type === 'speed' && i.speed === speedType)
      if (selectedSpeeds.length > 0) {
        return selectedSpeeds.sort((a, b) => b.distance - a.distance)[0]
      }
      return false
    }
  }
}
