export const state = () => ({
  defenseTypes: {
    resistance: {
      title: 'Resistances',
      iconColor: 'lime darken-2',
      icon: 'mdi-shield',
      subIcon: 'mdi-alpha-r',
      subIconColor: 'black',
      setting: 'damageRes'
    },
    immunity: {
      title: 'Immunities',
      iconColor: 'green',
      icon: 'mdi-shield-lock',
      setting: 'damageImm'
    },
    'condition-immunity': {
      title: 'Condition Immunities',
      iconColor: 'green',
      icon: 'mdi-shield-lock',
      setting: 'conditionImm'
    },
    vulnerability: {
      title: 'Vulnerabilities',
      iconColor: 'red darken-4',
      icon: 'mdi-shield-remove-outline',
      subIcon: 'mdi-alpha-v',
      setting: 'damageVul'
    }
  }
})

export const getters = {
  defenses: (state, getters, rootState, rootGetters) => {
    const defenses = {}
    for (const [type, irv] of Object.entries(state.defenseTypes)) {
      const oDefenses = (rootGetters['character/character'].settings[irv.setting] || []).map((i) => {
        return {
          value: i,
          note: null
        }
      })
      const mDefenses = rootGetters['character/mechanics/mechanics'].filter(i => i.type === type)
      const allDefenses = oDefenses.concat(mDefenses)
      const noteCache = [null]
      const typeCache = []
      const text = []
      for (const def of allDefenses) {
        if (typeCache.includes(def.value)) {
          continue
        }
        typeCache.push(def.value)
        if (def.note) {
          const noteIndex = noteCache.indexOf(def.note)
          if (noteIndex > -1) {
            text.push({ id: def.value, noteIndex, label: def.label || false })
          } else {
            noteCache.push(def.note)
            text.push({ id: def.value, noteIndex: noteCache.length - 1, label: def.label || false })
          }
        } else {
          text.push({ id: def.value, label: def.label || false })
        }
      }
      defenses[type] = { ...irv, type, text, notes: noteCache }
    }
    return defenses
  },
  conditionsTextMap: (state, getters, rootState, rootGetters) => {
    const ctMap = {}
    for (const condition of rootGetters.getData('conditions')) {
      ctMap[condition.id] = condition.name
    }
    return ctMap
  }
}

export const mutations = {
}

export const actions = {
}
