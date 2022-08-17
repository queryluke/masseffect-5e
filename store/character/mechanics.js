import { merge, cloneDeep } from 'lodash'

// AUGMENTS
function hydrateAugments (finalMechanics = []) {
  const augments = finalMechanics.filter(i => i.type === 'augment')
  const nonAugments = finalMechanics.filter(i => i.type !== 'augment')
  for (const augment of augments) {
    if (!augment.merge) {
      continue
    }
    if (augment.value) {
      let localMatchingIndex = 0
      for (const [augmentIndex, augmentable] of nonAugments.entries()) {
        if (!augmentable.source) {
          continue
        }
        if (!augmentable.source.includes(`${augment.value.model}/${augment.value.id}`)) {
          continue
        }
        if (augment.value.limit && !augment.value.limit.includes(augmentable.type)) {
          continue
        }
        if (augment.value.instances && !augment.value.instances.includes(localMatchingIndex)) {
          localMatchingIndex += 1
          continue
        }
        nonAugments.splice(augmentIndex, 1, merge(cloneDeep(augmentable), augment.merge))
      }
    }
  }
  return nonAugments
}

export const state = () => ({
  mechanics: [],
  unusedSelections: []
})

export const getters = {
  mechanics: state => state.mechanics,
  unusedSelections: state => state.unusedSelections,
  mcBonus: (state, getters, rootState, rootGetters) => (bonus) => {
    if (!bonus) {
      return 0
    }
    let b = 0
    let mod = null
    switch (bonus.type) {
      case 'flat':
        b = bonus.value
        break
      case 'mod':
        b = rootGetters['character/abilities/abilityBreakdown'][bonus.value].mod
        break
      case 'modComparison':
        b = []
        for (const ability of bonus.value) {
          b.push(rootGetters['character/abilities/abilityBreakdown'][ability].mod)
        }
        b = Math.max(...b)
        break
      case 'hp':
        b = rootGetters['character/hp/hp'].max
        break
      case 'proficiency':
        b = rootGetters['character/profBonus']
        break
      case 'level':
        if (bonus.value) {
          const klassLevels = rootGetters['character/klasses/selectedKlasses'].find(i => i.id === bonus.value)
          b = klassLevels?.levels || 0
        } else {
          b = rootGetters['character/klasses/level']
        }
        break
      case 'progressive':
        if (!bonus.value) {
          break
        }
        if (bonus.limit) {
          const klassLevels = rootGetters['character/klasses/selectedKlasses'].find(i => i.id === bonus.limit)
          b = klassLevels?.levels || 0
        } else {
          b = rootGetters['character/klasses/level']
        }
        b = Object.keys(bonus.value).sort((a, b) => b - a).find(i => i <= b)
        b = bonus.value[b] || 0
        break
      case 'multi':
        if (!Array.isArray(bonus.value)) {
          break
        }
        for (const multiBonus of bonus.value) {
          b += getters.mcBonus(multiBonus)
        }
        break
      case 'powercastingMod':
        if (!bonus.value) {
          break
        }
        mod = rootGetters['character/powers/klassPowercastingAbilities'][bonus.value]
        if (mod) {
          b += rootGetters[`character/abilities/${mod}Mod`]
        }
        break
      case 'resource':
        b += rootGetters['character/character'].currentStats.resources[bonus.value] || 0
        break
      default:
        b = 0
    }
    if (bonus.multiplier) {
      b = b * bonus.multiplier
    }
    b = bonus.ceil ? Math.ceil(b) : Math.floor(b)
    b = bonus.min || bonus.min === 0 ? Math.max(bonus.min, b) : b
    return b
  }
}

export const mutations = {
  setMechanics (state, mechanics) {
    state.mechanics = mechanics
  },
  setUnused (state, unused) {
    state.unusedSelections = unused
  }
}

export const actions = {
  INIT_MECHANICS ({ rootGetters, commit, getters }, partial) {
    const selected = rootGetters['character/selections/selected'].slice()
    function hydrateSelection (modelType, selection, path, append) {
      // console.log(model, selection, path, append)
      // i.e. for powers or other models with appends, need hydrate the appended value
      // do this by the parent object passing the appended values to the loop
      // this is what allows us to update appends without caching the appended value
      // on the actual store
      const baseMechanics = selection.value.map((i) => {
        return {
          ...i,
          ...append,
          source: path
        }
      })
      const selectedModelIds = selection.value.map(i => i.value)
      // console.log(model, selectedModelIds)
      // console.log(model)
      const selectedModels = rootGetters.getData(modelType).filter(i => selectedModelIds.includes(i.id))
      // console.log(selectedModels)
      const hydratedSubselections = selectedModels
        .map((model) => {
          const baseHydrates = hydrate({ mechanics: model.mechanics, path: `${path}/${modelType}/${model.id}` })
          // needed nested hydrations
          let subHydrates = []
          if (modelType === 'species') {
            // console.log('modelId', model.id)
            const subsToHydrate = rootGetters.getData('traits').filter(i => i.species.includes(model.id))
            // console.log(subsToHydrate)
            subHydrates = subsToHydrate
              .map(subModel => hydrate({ mechanics: subModel.mechanics, path: `${path}/${modelType}/${model.id}/${subModel.id}` }))
              .reduce((acc, curr) => acc.concat(curr), [])
            // console.log(subHydrates)
          }
          return [...baseHydrates, ...subHydrates]
        })
        .reduce((acc, curr) => acc.concat(curr), [])

      return [...baseMechanics, ...hydratedSubselections]
    }

    function hydrate ({ mechanics, path }) {
      const hydratedMechanics = []
      if (!mechanics) {
        return hydratedMechanics
      }
      for (const mechanic of mechanics) {
        if (mechanic.options) {
          // replace('-choice') might be unnecessary
          const type = mechanic.type.replace('-choice', '')
          const suffix = type === 'model' ? mechanic.model : type
          // console.log('path', `${path}/${suffix}`)
          // console.log(type)
          const limitFilter = mechanic.type === 'model'
            ? mechanic.limits
              ? JSON.stringify(mechanic.limits)
              : true
            : true
          const sIndex = selected.findIndex(i => i.path === `${path}/${suffix}` && limitFilter)
          if (sIndex > -1) {
            const selection = selected[sIndex]
            // console.log('selection', selection)
            // console.log(type)
            selected.splice(sIndex, 1)
            if (type === 'model') {
              const hydrated = hydrateSelection(suffix, selection, path, mechanic.append || {})
              hydratedMechanics.push(...hydrated)
            } else {
              const sourced = selection.value.map((i) => {
                return {
                  ...i,
                  source: path
                }
              })
              hydratedMechanics.push(...sourced)
            }
          }
        } else {
          hydratedMechanics.push({ ...mechanic, source: path })
        }
      }
      return hydratedMechanics
    }
    const preAugmentMechanics = []
    let mechanics = []
    if (partial) {
      mechanics = [...rootGetters[partial]]
    } else {
      mechanics = [
        // ADD ADDITIONAL MECHANICS HERE
        ...rootGetters['character/species/mechanics'],
        ...rootGetters['character/klasses/klassesMechanics'],
        ...rootGetters['character/backgroundMechanics'],
        ...rootGetters['character/reputation/benefitsMechanics'],
        ...rootGetters['character/equipment/equipmentMechanics']
      ]
    }
    for (const item of cloneDeep(mechanics)) {
      preAugmentMechanics.push(...hydrate(item))
    }

    const preToggleMechanics = hydrateAugments(preAugmentMechanics)

    const toggleState = rootGetters['character/resources/toggles'] || {}
    for (const { toggle } of preToggleMechanics.filter(i => i.toggle)) {
      if (toggleState[toggle.id]) {
        if (toggle.whenOn) {
          const toPush = (toggle.whenOn).filter(i => i.type !== 'resource').map((i) => {
            return {
              ...i,
              toggleId: toggle.id
            }
          })
          preToggleMechanics.push(...toPush)
        }
        if (toggle.options) {
          const selectionId = toggleState[`${toggle.id}-selection`]
          const selection = toggle.options.find(i => i.id === selectionId) || toggle.options[0]
          if (selection?.whenOn) {
            const selectionsToPush = (selection.whenOn || []).filter(i => i.type && i.type !== 'resource').map((i) => {
              return {
                ...i,
                toggleId: toggle.id
              }
            })
            preToggleMechanics.push(...selectionsToPush)
          }
        }
      }
    }
    const finalMechanics = hydrateAugments(preToggleMechanics)
    // console.log('unused', selected)
    // console.log('final', finalMechanics)
    if (partial) {
      commit('setMechanics', [...getters.mechanics, ...finalMechanics])
    } else {
      commit('setMechanics', finalMechanics)
    }
    commit('setUnused', selected)
  },
  TOGGLE_MECHANIC ({ dispatch, commit, getters, rootGetters }, { toggle, value }) {
    if (value) {
      const cloned = getters.mechanics.slice()
      const newMechanics = []
      const toPush = (toggle.whenOn || []).map((i) => {
        return {
          ...i,
          toggleId: toggle.id
        }
      })
      newMechanics.push(...toPush)
      if (toggle.options) {
        const selectedOption = rootGetters['character/resources/toggles'][`${toggle.id}-selection`]
        if (selectedOption) {
          const selection = toggle.options.find(i => i.id === selectedOption) || toggle.options[0]
          if (selection.whenOn) {
            const selectionsToPush = (selection.whenOn || []).map((i) => {
              return {
                ...i,
                toggleId: toggle.id
              }
            })
            newMechanics.push(...selectionsToPush)
          }
        }
      }
      const hydratedToggles = hydrateAugments(newMechanics)
      const finalMechanics = cloned.concat(hydratedToggles)
      commit('setMechanics', finalMechanics)
    } else {
      const reducedMechanics = getters.mechanics.filter(i => !i.toggleId || i.toggleId !== toggle.id)
      commit('setMechanics', reducedMechanics)
    }
  },
  CHANGE_TOGGLE_SELECTION ({ dispatch, getters, rootGetters, commit }, { toggle }) {
    if (!toggle.options) {
      return
    }
    const newMechanics = getters.mechanics.filter(i => !i.toggleId || i.toggleId !== toggle.id)
    const toAugment = []
    const selectedOption = rootGetters['character/resources/toggles'][`${toggle.id}-selection`]
    if (selectedOption) {
      const selection = toggle.options.find(i => i.id === selectedOption) || toggle.options[0]
      if (selection.whenOn) {
        const selectionsToPush = (selection.whenOn || []).filter(i => i.type !== 'resource').map((i) => {
          return {
            ...i,
            toggleId: toggle.id
          }
        })
        toAugment.push(...selectionsToPush)
      }
    }
    const finalMechanics = hydrateAugments(toAugment)
    newMechanics.push(...finalMechanics)
    commit('setMechanics', newMechanics)
  },
  EQUIPMENT_MECHANIC ({ dispatch, getters, rootGetters, commit }, { uuid, equipped }) {
    let cloned = getters.mechanics.slice()
    if (equipped) {
      const toPush = rootGetters['character/equipment/equipmentMechanics'].reduce((a, c) => a.concat(c.mechanics || []), []).filter(i => i.equipmentId === uuid)
      const alreadyAppliedSetBonuses = cloned.filter(i => i.setBonusId).map(i => i.setBonusId)
      const setBonusesToApply = rootGetters['character/equipment/setBonusMechanics'].reduce((a, c) => a.concat(c.mechanics || []), []).filter(i => !alreadyAppliedSetBonuses.includes(i.setBonusId))
      toPush.push(...setBonusesToApply)
      const mechanics = hydrateAugments(toPush)
      cloned.push(...mechanics)
    } else {
      const activeSetBonusIds = rootGetters['character/equipment/setBonusMechanics'].reduce((a, c) => a.concat(c.mechanics || []), []).map(i => i.setBonusId)
      cloned = cloned.filter(i => !i.equipmentId || i.equipmentId !== uuid).filter(i => !i.setBonusId || activeSetBonusIds.includes(i.setBonusId))
    }
    commit('setMechanics', cloned)
  },
  REPUTATION_MECHANIC ({ dispatch, getters, rootGetters, commit }, value) {
    const cleanedMechanics = getters.mechanics.filter(i => !i.source?.startsWith('reputation'))
    commit('setMechanics', cleanedMechanics)
    dispatch('INIT_MECHANICS', 'character/reputation/benefitsMechanics')
  }
}
