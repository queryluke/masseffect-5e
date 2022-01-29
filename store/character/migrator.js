export const actions = {
  migrate ({ dispatch, rootState }, character) {
    const version = character.meta?.version
    if (!version || version !== rootState.cbVersion) {
      character = dispatch('toV101', character)
    }
    return character
  },
  toV101 (character) {
    character.meta = {
      remote: false,
      version: '1.0.1'
    }
    character.selected = []
    character.subspecies = null
    character.options = {
      tashas: false
    }
    character.currentStats.credits = character.credits
    delete character.credits
    character.currentStats.omnigel = character.omnigel
    delete character.omnigel
    character.currentStats.medigel = []
    character.currentStats.renegade = 0
    character.currentStats.paragon = 0
    character.currentStats.resources = []
    // abilityScores
    const abilityScores = {
      str: {
        value: null,
        other: null,
        override: null
      },
      dex: {
        value: null,
        other: null,
        override: null
      },
      con: {
        value: null,
        other: null,
        override: null
      },
      int: {
        value: null,
        other: null,
        override: null
      },
      wis: {
        value: null,
        other: null,
        override: null
      },
      cha: {
        value: null,
        other: null,
        override: null
      }
    }
    const type = character.abilityScores.genMethod.value
    for (const [key, score] of character.abilityScores[type]) {
      abilityScores[key].value = score
      if (character.abilityScores.other[key]) {
        abilityScores[key].other = character.abilityScores.other[key]
      }
      if (character.abilityScores.override[key]) {
        abilityScores[key].other = character.abilityScores.override[key]
      }
    }
    character.options.asiGenMethod = character.abilityScores.genMethod.value
    character.abilityScores = abilityScores

    // fighting styles
    if (character.fightingStyles.length) {
      for (const fs of character.fightingStyles) {
        const klassId = fs.id.split('-').slice(-1)
        character.selected.push({
          path: `klass/${klassId}/fighting-style/fighting-styles`,
          value: [
            { type: 'fighting-styles', value: fs.name.toLowerCase().replaceAll(' ', '-') }
          ]
        })
      }
    }
    delete character.fightingStyles
    // classes
    // const newClasses = []
    const classAsi = {
      adept: [4, 8, 12, 16, 19],
      engineer: [4, 8, 12, 16, 19],
      infiltrator: [4, 8, 10, 12, 16, 19],
      sentinel: [4, 8, 12, 16, 19],
      soldier: [4, 6, 8, 12, 14, 16, 19],
      vanguard: [4, 8, 12, 16, 19]
    }
    for (const klass of character.classes) {
      // ASIs
      klass.asi = {}
      for (const kasi of classAsi[klass.id]) {
        klass.asi[kasi] = null
      }
      for (const selection of character.selections) {
        if (selection.source.startsWith(`klass-${klass.id}`)) {
          if (selection.type === 'profs' && selection.value.length) {
            character.selected.push({
              path: `klass/${klass.id}/${selection.subType}`,
              value: selection.value.map((i) => {
                return {
                  type: selection.subType,
                  value: i
                }
              })
            })
          }
          const level = parseInt(selection.source.split('-')[2])
          if (!isNaN(level)) {
            if (selection.type === 'abi' && selection.value.length) {
              klass.asi[level] = 'asi'
              character.selected.push({
                path: `klass/${klass.id}/${level}/asi`,
                value: selection.value.length > 1
                  ? selection.value.map((i) => {
                    return {
                      type: 'asi',
                      ability: i,
                      amount: 1
                    }
                  })
                  : [{ type: 'asi', ability: selection.value[0], amount: 2 }]
              })
            }
            if (selection.type === 'feat' && selection.value.length) {
              klass.asi[level] = 'feat'
              character.selected.push({
                path: `klass/${klass.id}/${level}/feats`,
                value: [{ type: 'feats', value: selection.value }]
              })
            }
          }
        }
      }
    }

    // custom profs
    for (const prof of ['armor', 'weapon', 'savingThrow', 'tool']) {
      const p = character.selections.find(i => i.source === `custom-${prof}`)
      character.settings[prof] = p?.value || []
    }
    delete character.selections
    // TODO: background
    character.currentStats = { ...character.currentStats, resources: {}, paragon: 0, renegade: 0 }
    character.settings = { ...character.settings, armor: [], savingThrow: [], weapon: [], tool: [], skill: character.settings.skill, hp: 0 }
    delete character.settings.skills
    return character
  }
}
