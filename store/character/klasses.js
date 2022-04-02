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
  isMulticlassed: (state, getters) => {
    return getters.selectedKlasses.length > 1
  },
  selectedKlassesIds: (state, getters) => {
    return getters.selectedKlasses.map(i => i.id)
  },
  klasses: (state, getters) => {
    return getters.selectedKlasses.map((i, index) => {
      if (i.id.startsWith('custom')) {
        return i
      }
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
    const allKlassMechanics = []
    for (const [index, klass] of getters.klasses.entries()) {
      // Prof mechanics
      const profMechanics = ['skill', 'saving-throw', 'tool', 'weapon', 'armor']
        .map((prof) => {
          const mArray = []
          const klassProfs = klass.data.profs
          if (klassProfs[prof]) {
            if (klassProfs[prof].has) {
              mArray.push(...klassProfs[prof].has.map((value) => {
                return {
                  type: prof,
                  value
                }
              }))
            }
            if (klassProfs[prof].choices) {
              mArray.push({
                type: `${prof}-choice`,
                limit: klassProfs[prof].choices.items,
                selections: klassProfs[prof].choices.count,
                options: true
              })
            }
          }
          return mArray
        })
        .reduce((acc, curr) => acc.concat(curr), [])
      allKlassMechanics.push({
        path: `klass/${klass.id}`,
        mechanics: profMechanics
      })

      // ASIs
      for (const asi of Object.entries(klass.asi).filter(asi => asi[0] <= klass.levels)) {
        const path = `klass/${klass.id}/${asi[0]}`
        if (asi[1] === 'asi') {
          allKlassMechanics.push({
            path,
            mechanics: [
              {
                type: 'asi-choice',
                options: true
              }
            ]
          })
        }
        if (asi[1] === 'feat') {
          allKlassMechanics.push({
            path,
            mechanics: [
              {
                type: 'model-choice',
                model: 'feats',
                options: true
              }
            ]
          })
        }
      }
      // All other features
      for (const feature of getters.klassesFeatures[index]) {
        allKlassMechanics.push({
          path: `klass/${feature.klass}/${feature.id}`,
          mechanics: feature.mechanics || []
        })
      }
    }
    return allKlassMechanics
  },
  klassesFeatures: (state, getters) => {
    return getters.selectedKlasses.map((klass) => {
      return getters.klassFeaturesList
        .filter(i => ((i.klass === klass.id && !i.subclass) || (klass.subclass ? i.subclass === klass.subclass : false)) && i.level <= klass.levels)
        .sort((a, b) => a.level - b.level)
    })
  },
  mcLevels: (state, getters) => (base, others) => {
    return getters.selectedKlasses.reduce((acc, curr) => {
      const adder = curr.id === base
        ? curr.levels
        : others.includes(curr.id)
          ? Math.floor(curr.levels / 2)
          : 0
      return acc + adder
    }, 0)
  },
  klassIcons: (state, getters) => {
    const icons = {}
    for (const klass of getters.selectedKlasses) {
      // TODO: check if a homebrew class
      icons[klass.id] = `/images/classes/${klass.id}.svg`
    }
    return icons
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
  REMOVE_KLASS ({ getters, dispatch, rootGetters }, id) {
    const value = getters.selectedKlasses.slice()
    const index = value.findIndex(i => i.id === id)
    if (index > -1) {
      value.splice(index, 1)
    }
    dispatch('character/selections/BULK_DELETE', `klass/${id}`, { root: true })
    const removePowers = rootGetters['character/character'].powers.filter(i => i.klass !== id)
    dispatch('character/UPDATE_CHARACTER', { attr: 'powers', value: removePowers }, { root: true })
    dispatch('character/UPDATE_CHARACTER', { attr: 'classes', value }, { root: true })
  }
}
