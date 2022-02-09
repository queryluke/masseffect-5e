import { merge, cloneDeep } from 'lodash'

export const state = () => ({
})

export const getters = {
  mechanicAnalysis: (state, getters, rootState, rootGetters) => {
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
    const finalMechanics = []
    const mechanics = [
      // ADD ADDITIONAL MECHANICS HERE
      ...rootGetters['character/species/mechanics'],
      ...rootGetters['character/klasses/klassesMechanics'],
      ...rootGetters['character/backgroundMechanics'],
      ...rootGetters['character/reputation/benefitsMechanics']
    ]
    for (const item of cloneDeep(mechanics)) {
      finalMechanics.push(...hydrate(item))
    }

    // AUGMENTS
    for (const augment of finalMechanics.filter(i => i.type === 'augment')) {
      if (!augment.merge) {
        continue
      }
      if (augment.value) {
        let localMatchingIndex = 0
        for (const [augmentIndex, augmentable] of finalMechanics.entries()) {
          if (!augmentable.source.endsWith(`${augment.value.model}/${augment.value.id}`)) {
            continue
          }
          if (augment.value.limit && !augment.value.limit.includes(augmentable.type)) {
            continue
          }
          if (augment.value.instances && !augment.value.instances.includes(localMatchingIndex)) {
            localMatchingIndex += 1
            continue
          }
          finalMechanics.splice(augmentIndex, 1, merge(augmentable, augment.merge))
        }
      }
    }
    return {
      mechanics: finalMechanics,
      unusedSelections: selected
    }
  },
  mechanics: (state, getters) => {
    return getters.mechanicAnalysis.mechanics
  },
  unusedSelections: (state, getters) => {
    return getters.mechanicAnalysis.unusedSelections
  },
  mcBonus: (state, getters, rootState, rootGetters) => (bonus) => {
    const multiplier = bonus.multiplier || 1
    const min = bonus.min || 0
    let b = 0
    switch (bonus.type) {
      case 'flat':
        b = bonus.value
        break
      case 'mod':
        b = rootGetters['character/abilities/abilityBreakdown'][bonus.value].mod * multiplier
        break
      case 'proficiency':
        b = rootGetters['character/profBonus'] * multiplier
        break
      case 'level':
        if (bonus.value) {
          const klassLevels = rootGetters['character/klasses/selectedKlasses'].find(i => i.id === bonus.value)
          b = klassLevels?.levels || 0
        } else {
          b = rootGetters['character/klasses/level']
        }
        b = b * multiplier
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
        b = (bonus.value[b] || 0) * multiplier
        break
      case 'progressionColumn':
        if (!bonus.value || !bonus.value.klass || !bonus.value.column) {
          break
        } else {
          const klassData = rootGetters['character/klasses/klasses'].find(i => i.id === bonus.value.klass)
          if (!klassData) {
            break
          }
          const column = klassData.data.progression.columns.find(i => i.label === bonus.value.column)
          if (!column || !column.values) {
            break
          }
          b = column.values[klassData.levels - 1]
        }
        break
      default:
        b = 0
    }
    return Math.max(min, b)
  }
}

export const mutations = {
}

export const actions = {
}
