import { Multiclass } from './Multiclass'
import { Klass } from './Klass'

export const Klasses = {
  mixins: [Multiclass, Klass],
  computed: {
    characterClasses: {
      get () {
        return this.character.classes
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'classes',
          value
        })
      }
    },
    startingClass () {
      return this.characterClasses[0]
    },
    multiclasses () {
      return this.characterClasses.slice(1).map((i, index) => {
        return { ...i, index: index + 1 }
      })
    }
  },
  methods: {
    getProgressionValue (klassId, label, level) {
      const prog = this.classData(klassId).progression.columns
      const values = prog.find(i => i.label === label).values
      if (label === 'power_slots_by_power_level') {
        return values.map(i => i[level - 1])
      }
      return values[level - 1]
    },
    mcClassAndLevel (mainClass, classesToCheck) {
      const klasses = []
      for (const klass of this.characterClasses) {
        if (classesToCheck.includes(klass.id)) {
          klasses.push({ id: klass.id, levels: klass.levels })
        }
      }
      let klassId, level
      // Multiclassing
      if (klasses.length > 1) {
        klassId = mainClass
        let totalLevels = 0
        for (const klass of klasses) {
          if (klass.id === mainClass) {
            totalLevels += klass.levels
          } else {
            totalLevels += (klass.levels / 2)
          }
        }
        level = Math.floor(totalLevels)
      } else {
        klassId = klasses[0].id
        level = klasses[0].levels
      }
      return [klassId, level]
    },
    hasClass (klassId) {
      return this.characterClasses.map(i => i.id).includes(klassId)
    },
    hasSomeClasses (klassIds) {
      return this.characterClasses.map(i => i.id).some(i => klassIds.includes(i))
    }
  }
}
