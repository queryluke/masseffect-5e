export const Senses = {
  data () {
    return {
      senses: [
        {
          id: 'darkvision',
          title: this.$t('senses.darkvision_title'),
          html: (distance) => {
            return `
              You can see in dim light within <me-distance :length="${distance}" /> of you as if it were bright
              light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.
            `
          }
        },
        {
          id: 'tremorsense',
          title: this.$t('senses.tremorsense_title'),
          html: (distance) => {
            return `
              You can detect and pinpoint creatures and the origin of vibrations within within <me-distance :length="${distance}" />,
              provided that the creature and the source of the vibrations are in contact with the same ground or
              substance.
            `
          }
        },
        {
          id: 'blindsight',
          title: this.$t('senses.blindsight_title'),
          html: (distance) => {
            return `You can perceive your surroundings without relying on sight within <me-distance :length="${distance}" />.`
          }
        },
        {
          id: 'infrared-vision',
          title: this.$t('senses.infrared_vision_title'),
          html: (distance) => {
            return `
              Your sight becomes a gradient map of the heat produced by your surroundings (hotter
              objects appear brighter and cooler objects appear darker; you cannot discern color). You can see creatures and objects
              in darkness as well as creatures and objects hidden by technological means within <me-distance :length="${distance}" />,
              as long those elements are few degrees cooler or warmer than its surroundings.
            `
          }
        },
        {
          id: 'truesight',
          title: this.$t('senses.truesight_title'),
          html: (distance) => {
            return `
              Within <me-distance :length="${distance}" /> you can see in normal darkness see invisible creatures and objects that
              are hidden by technological means.
            `
          }
        }
      ]
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
      return [
        { skill: 'perception', title: 'Passive Perception (Wisdom)' },
        { skill: 'investigation', title: 'Passive Investigation (Intelligence)' },
        { skill: 'insight', title: 'Passive Insight (Wisdom)' }
      ].map((i) => {
        return {
          ...i,
          score: this.csSkills.find(j => j.id === i.skill).passive
        }
      })
    }
  }
}
