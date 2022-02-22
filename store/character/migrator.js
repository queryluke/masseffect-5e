export const actions = {
  async migrate ({ dispatch, rootState }, character) {
    const version = character.meta?.version
    let newCharacter = JSON.parse(JSON.stringify(character))
    console.log(version)
    if (!version) {
      console.log('trying initial')
      try {
        newCharacter = await dispatch('toV101', newCharacter)
      } catch (e) {
        console.log(e.message)
        return false
      }
    }
    console.log('after v1', newCharacter)
    const versions = ['1.0.1', '1.0.2']
    if (newCharacter.meta.version !== rootState.cbVersion) {
      const fromVersionIndex = versions.findIndex(i => i === newCharacter.meta.version)
      for (let i = fromVersionIndex + 1; i < versions.length; i++) {
        try {
          const action = `toV${versions[i].replaceAll('.', '')}`
          console.log(`trying ${action}`)
          newCharacter = await dispatch(`toV${versions[i].replaceAll('.', '')}`, newCharacter)
          console.log(`result of ${action}`, newCharacter)
        } catch (e) {
          console.log(e.message)
          return false
        }
      }
    }
    return newCharacter
  },
  toV101 (vuex, character) {
    character.meta = {
      remote: false,
      version: '1.0.1'
    }
    console.log('within v1', character)
    return character
  },
  toV102 (vuex, character) {
    character.meta.version = '1.0.2'
    character.selected = []
    character.subspecies = null
    character.options = {
      tashas: false
    }
    character.currentStats.credits = character.credits
    delete character.credits
    character.currentStats.omnigel = character.omnigel
    delete character.omnigel
    character.currentStats.medigel = character.medigel
    character.currentStats.renegade = 0
    character.currentStats.paragon = 0
    character.currentStats.resources = []
    console.log('setup complete')
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
    for (const [key, score] of Object.entries(character.abilityScores[type])) {
      abilityScores[key].value = score
      if (character.abilityScores.other[key]) {
        abilityScores[key].other = parseInt(character.abilityScores.other[key], 10) || null
      }
      if (character.abilityScores.override[key]) {
        abilityScores[key].override = parseInt(character.abilityScores.override[key], 10) || null
      }
    }
    character.options.asiGenMethod = character.abilityScores.genMethod.value
    character.abilityScores = abilityScores
    console.log('abilities complete')

    // fighting styles
    if (character.fightingStyles.length) {
      for (const fs of character.fightingStyles) {
        const klassId = fs.id.split('-').slice(-1)
        character.selected.push({
          path: `klass/${klassId}/fighting-style-${klassId}/fighting-styles`,
          value: [
            { type: 'fighting-styles', value: 'FS_' + fs.name.toLowerCase().replaceAll(' ', '-') }
          ]
        })
      }
    }
    delete character.fightingStyles
    console.log('fighting styles complete')

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
    console.log('classes complete')

    // custom profs
    for (const prof of ['armor', 'weapon', 'savingThrow', 'tool']) {
      const p = character.selections.find(i => i.source === `custom-${prof}`)
      character.settings[prof] = p?.value || []
    }
    console.log('profs complete')

    // backgrounds
    function processSubgrounds (basePath, stuff, limit) {
      const resultedSelected = []
      for (const bgs of stuff) {
        // eslint-disable-next-line no-unused-vars
        const [root, id, oldSubground, subground, swsProfType] = bgs.source.split('-')
        if (oldSubground && !subground) {
          console.log('trying oldSubground, no subground')
          resultedSelected.push({
            path: `${basePath}/subgrounds`,
            value: [{
              value: `BG_${bgs.value}`,
              type: 'subgrounds',
              limit
            }]
          })
        }
        if (subground && !swsProfType) {
          console.log('trying subgroun, no profType')
          if (['skill', 'tool'].includes(bgs.subType) && bgs.value?.length) {
            resultedSelected.push({
              path: `${basePath}/subgrounds/BG_${subground.replace('_', '-')}/${swsProfType}`,
              value: bgs.value.map((i) => {
                return {
                  type: swsProfType,
                  value: i
                }
              })
            })
          }
        }
        if (swsProfType && bgs.value?.length) {
          console.log('trying profType and value')
          resultedSelected.push({
            path: `${basePath}/subgrounds/BG_${subground.replace('_', '-')}/${swsProfType}`,
            value: bgs.value.map((i) => {
              return {
                type: swsProfType,
                value: i
              }
            })
          })
        }
      }
      return resultedSelected
    }
    if (character.background) {
      const selectedBgStuff = character.selections.filter(i => i.source.startsWith(`background-${character.background}`))
      const basePath = `background/${character.background}`
      let limit
      switch (character.background) {
        case 'artisan':
          limit = '[{"attr":"id","value":["BG_armorsmith","BG_brewer","BG_chemist","BG_cook","BG_mechanic","BG_painter","BG_tailor","BG_weaponsmith"]}]'
          character.selected.push(...processSubgrounds(basePath, selectedBgStuff, limit))
          break
        case 'criminal':
          limit = '[{"attr":"id","value":["BG_assassin","BG_blackmailer","BG_fence","BG_gambler","BG_gang-member","BG_pickpocket","BG_smuggler","BG_thief"]}]'
          character.selected.push(...processSubgrounds(basePath, selectedBgStuff, limit))
          break
        case 'scholar':
          limit = '[{"attr":"id","value":["BG_chemistry","BG_astronomy","BG_engineering","BG_physics","BG_computer-science","BG_biology","BG_philosophy","BG_general-studies"]}]'
          character.selected.push(...processSubgrounds(basePath, selectedBgStuff, limit))
          break
        default:
          for (const stuff of selectedBgStuff) {
            if (stuff.value?.length) {
              character.selected.push({
                path: `${basePath}/${stuff.subType}`,
                value: stuff.value.map((i) => {
                  return { type: stuff.subType, value: i }
                })
              })
            }
          }
          break
      }
    }
    console.log('backgrounds complete')

    const newEquipment = []
    const now = new Date().toISOString()
    if (character.medigel && character.medigel > 0) {
      newEquipment.push({
        id: 'medi-gel',
        notes: '',
        subType: 'medi_gel',
        type: 'gear',
        uses: character.medigel,
        uuid: `medi-gel_${now}`
      })
    }
    if (character.omnigel && character.omnigel > 0) {
      newEquipment.push({
        id: 'omni-gel',
        notes: '',
        subType: 'omni-gel',
        type: 'gear',
        uses: character.omnigel,
        uuid: `omni-gel_${now}`
      })
    }
    for (const eq of character.equipment) {
      if (eq.type === 'weapon') {
        const replacedWeapon = {
          ...eq,
          overrides: eq.stats
        }
        delete replacedWeapon.stats
        newEquipment.push(replacedWeapon)
      } else if (eq.type === 'armor' && eq.custom) {
        const replacementCustomArmor = {
          ...eq,
          custom: { ...eq.custom, ...eq.stats }
        }
        delete replacementCustomArmor.stats
        newEquipment.push(replacementCustomArmor)
      } else {
        newEquipment.push(eq)
      }
    }
    character.equipment = newEquipment
    console.log('equipment complete')

    delete character.selections

    character.currentStats = {
      ...character.currentStats,
      resources: {
        ...character.featuresTimesUsed
      },
      paragon: 0,
      renegade: 0,
      shieldsLost: character.settings.shields - (character.currentStats.shields?.value || 0),
      barrier: {
        used: character.currentStats.featuresTimesUsed.barrier || character.currentStats.barrier.used,
        ticksUsed: character.currentStats.barrier.ticksUsed
      }
    }
    // delete character.currentStats.featuresTimesUsed
    character.settings = { ...character.settings, skill: character.settings.skills, hp: 0, powercasting: {} }
    delete character.settings.skills
    delete character.settings.power
    console.log(character)
    return character
  }
}
