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
    character.currentStats.medigel = character.medigel
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

    // backgrounds
    function processSubgrounds (basePath, stuff, limit) {
      const resultedSelected = []
      for (const bgs of stuff) {
        // eslint-disable-next-line no-unused-vars
        const [root, id, oldSubground, subground, swsProfType] = bgs.source.split('-')
        if (oldSubground && !subground) {
          resultedSelected.push({
            path: `${basePath}/subgrounds`,
            value: [{
              value: bgs.value,
              type: 'subgrounds',
              limit
            }]
          })
        }
        if (subground && !swsProfType) {
          if (['skill', 'tool'].includes(bgs.subType) && bgs.value.length) {
            character.selected.push({
              path: `${basePath}/subgrounds/${subground.replace('_', '-')}/${swsProfType}`,
              value: bgs.value.map((i) => {
                return {
                  type: swsProfType,
                  value: i
                }
              })
            })
          }
        }
        if (swsProfType && bgs.value.length) {
          character.selected.push({
            path: `${basePath}/subgrounds/${subground.replace('_', '-')}/${swsProfType}`,
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
    try {
      if (character.background) {
        const selectedBgStuff = character.selections.find(i => i.source.startsWith(`background-${character.background}`))
        const basePath = `background/${character.background}`
        let limit
        switch (character.background) {
          case 'artisan':
            limit = '[{"attr":"id","value":["armorsmith","brewer","chemist","cook","mechanic","painter","tailor","weaponsmith"]}]'
            character.selected.push(...processSubgrounds(basePath, selectedBgStuff, limit))
            break
          case 'criminal':
            limit = '[{"attr":"id","value":["assassin","blackmailer","fence","gambler","gang-member","pickpocket","smuggler","thief"]}]'
            character.selected.push(...processSubgrounds(basePath, selectedBgStuff, limit))
            break
          case 'scholar':
            limit = '[{"attr":"id","value":["chemistry","astronomy","engineering","physics","computer-science","biology","philosophy","general-studies"]}]'
            character.selected.push(...processSubgrounds(basePath, selectedBgStuff, limit))
            break
          default:
            for (const stuff of selectedBgStuff) {
              if (stuff.value.length) {
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
    } catch (e) {
      console.log(e.message)
    }

    // TODO: innate biotics
    /*
    source: "species-asari-innate-biotics-cantrip_1"
    subType: "power"
    type: "action"
    value: "charge"
     */

    // TODO: migrate powers for class selection...unlinked?

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
          custom: { ...eq.custom, ...eq.stats },
          ...eq
        }
        delete replacementCustomArmor.stats
        newEquipment.push(replacementCustomArmor)
      } else {
        newEquipment.push(eq)
      }
    }
    character.equipment = newEquipment
    // Do not store base model, hydrate on load

    delete character.selections
    character.currentStats = {
      ...character.currentStats,
      resources: {
        ...character.featuresTimesUsed
      },
      paragon: 0,
      renegade: 0,
      shieldsLost: character.settings.shields - character.currentStats.shields.value,
      barrier: {
        used: character.currentStats.featuresTimesUsed.barrier || character.currentStats.barrier.used,
        ticksUsed: character.currentStats.barrier.ticksUsed
      }
    }
    // delete character.currentStats.featuresTimesUsed
    character.settings = { ...character.settings, skill: character.settings.skills, hp: 0, powercasting: {} }
    delete character.settings.skills
    delete character.settings.power
    return character.powerModAbility
  }
}
