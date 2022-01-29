export const state = () => ({
  multiclassProficiencies: {
    adept: {
      weapon: {
        has: ['smg']
      }
    },
    engineer: {
      armor: {
        has: ['medium']
      },
      weapon: {
        has: ['assault_rifle']
      }
    },
    infiltrator: {
      weapon: {
        has: ['sniper_rifle', 'melee']
      }
    },
    sentinel: {
      armor: {
        has: ['medium', 'heavy']
      },
      weapon: {
        choices: {
          items: ['assault_rifle', 'melee', 'shotgun', 'smg'],
          count: 1
        },
        text: 'Choose one from Assault Rifles, Melee, Shotguns, or SMGs'
      }
    },
    soldier: {
      armor: {
        has: ['medium', 'heavy']
      },
      weapon: {
        choices: {
          items: ['assault_rifle', 'heavy_pistol', 'melee', 'shotgun', 'smg', 'sniper_rifle'],
          count: 2
        },
        text: 'Choose two from Assault Rifles, Heavy Pistols, Melee, Shotguns, SMGs, or Sniper Rifles'
      }
    },
    vanguard: {
      armor: {
        has: ['medium']
      },
      weapon: {
        has: ['shotgun']
      }
    }
  }
})

export const getters = {
  selectedKlasses: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].classes
  },
  selectedKlassesIds: (state, getters) => {
    return getters.selectedKlasses.map(i => i.id)
  },
  klasses: (state, getters) => {
    return getters.selectedKlasses.map((i, index) => {
      let data = getters.klassesList.find(j => j.id === i.id)
      if (index > 0) {
        data = { ...data, profs: state.multiclassProficiencies[i.id] }
      }
      const subclassData = i.subclass ? getters.subklassesList.find(j => j.id === i.subclass) : { name: '', html: '' }
      return {
        ...i,
        data,
        subclassData
      }
    })
  },
  level: (state, getters) => {
    return getters.selectedKlasses.reduce((acc, curr) => acc + curr.levels, 0)
  },
  klassesMechanics: (state, getters) => {
    return getters.klasses.map((klass) => {
      return {
        path: `klass/${klass.id}`,
        mechanics: ['skill', 'savingThrow', 'tool', 'weapon', 'armor']
          .map((prof) => {
            const mArray = []
            const klassProfs = klass.data.profs
            if (klassProfs[prof]) {
              const type = prof === 'savingThrow' ? 'saving-throw' : prof
              if (klassProfs[prof].has) {
                mArray.push(...klassProfs[prof].has.map((value) => {
                  return {
                    type,
                    value
                  }
                }))
              }
              if (klassProfs[prof].choices) {
                mArray.push({
                  type: `${type}-choice`,
                  limit: klassProfs[prof].choices.items,
                  selections: klassProfs[prof].choices.count,
                  options: true
                })
              }
            }
            return mArray
          })
          .reduce((acc, curr) => acc.concat(curr), [])
      }
    })
  },
  klassesFeatures: (state, getters) => {
    return getters.selectedKlasses.map((klass) => {
      return getters.klassFeaturesList
        .filter(i => (i.klass === klass.id || (klass.subclass ? i.subclass === klass.subclass : false)) && i.level <= klass.levels)
        .sort((a, b) => a.level - b.level)
    })
  },
  klassesList: (state, getters, rootState, rootGetters) => rootGetters.getData('classes'),
  subklassesList: (state, getters, rootState, rootGetters) => rootGetters.getData('subclasses'),
  klassFeaturesList: (state, getters, rootState, rootGetters) => rootGetters.getData('class-features')
}

export const mutations = {
}

export const actions = {
  ADD_KLASS ({ getters, dispatch }, klass) {
    const value = getters.selectedKlasses.slice()
    value.push(klass)
    dispatch('character/UPDATE_CHARACTER', { attr: 'classes', value }, { root: true })
  },
  REMOVE_KLASS ({ getters, dispatch }, id) {
    const value = getters.selectedKlasses.slice()
    const index = value.findIndex(i => i.id === id)
    if (index > -1) {
      value.splice(index, 1)
    }
    dispatch('character/selections/BULK_DELETE', `klass/${id}`, { root: true })
    dispatch('character/UPDATE_CHARACTER', { attr: 'classes', value }, { root: true })
  }
}
