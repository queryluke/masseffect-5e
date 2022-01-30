export const Defenses = {
  data () {
    return {

    }
  },
  computed: {
    conditionsTextMap () {
      const text = {}
      for (const condition of this.conditions) {
        text[condition.id] = condition.name
      }
      return text
    }
  },
  methods: {
    getIrvObject (type) {
      const irv = this.defenseTypes[type]
      const defensiveOverrides = (this.character.settings[irv.setting] || []).map((i) => {
        return {
          value: i,
          note: null
        }
      })
      const defenses = this.mechanicBag.filter(i => i.type === type)
      const allDefenses = defensiveOverrides.concat(defenses)
      const noteCache = []
      const typeCache = []
      const textArray = []
      const falsyDefs = []
      for (const def of allDefenses) {
        if (!def.value) {
          if (def.note) {
            textArray.push({ text: def.note })
          }
          continue
        }
        if (typeCache.includes(def.value)) {
          continue
        }
        typeCache.push(def.value)
        const text = this.defenseTypeText(type, def.value)
        if (def.note) {
          const noteIndex = noteCache.indexOf(def.note)
          let asters = ''
          if (noteIndex > -1) {
            asters = ''.padStart(noteIndex + 1, '*')
          } else {
            noteCache.push(def.note)
            asters = ''.padStart(noteCache.length, '*')
          }
          textArray.push({ text: `${text}${asters}`, note: `${asters} - ${def.note}` })
        } else {
          textArray.push({ text })
        }
      }
      return { ...irv, text: textArray, special: falsyDefs, values: typeCache }
    },
    defenseTypeText (type, id) {
      return type === 'condition-immunity' ? this.conditionsTextMap[id] : this.$t(`damage_types.${id}_title`)
    }
  }
}
