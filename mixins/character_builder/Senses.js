export const Senses = {
  data () {
    return {

    }
  },
  computed: {
    csSenses () {
      const csSenses = []
      const overrideSenses = []
      for (const [sense, distance] of Object.entries(this.character.settings.senses)) {
        overrideSenses.push({ sense, distance })
      }
      const oldSelections = this.selections.filter(i => i.type === 'sense').map((i) => {
        return {
          sense: i.has.id,
          distance: i.has.distance
        }
      })
      const selections = this.mechanicBag.filter(i => i.type === 'sense')
      for (const sense of this.senses) {
        const highest = [
          ...overrideSenses.filter(i => i.sense === sense.id),
          ...oldSelections.filter(i => i.sense === sense.id),
          ...selections.filter(i => i.sense === sense.id)
        ].sort((a, b) => b.distance - a.distance)[0]
        csSenses.push({ ...highest, ...sense, html: sense.html(highest.distance) })
      }
      return csSenses
    },
    csPassiveScores () {

    }
  }
}
