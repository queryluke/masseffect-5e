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
          ...append
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
              hydratedMechanics.push(...selection.value)
            }
          }
        } else {
          hydratedMechanics.push(mechanic)
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
    for (const item of mechanics) {
      finalMechanics.push(...hydrate(item))
    }
    console.log('unused', selected)
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
        b = rootGetters['character/klasses/level'] * multiplier
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
