export const state = () => ({
})

export const getters = {
  mechanicAnalysis: (state, getters, rootState, rootGetters) => {
    const selected = rootGetters['character/selections/selected'].slice()

    function hydrateSelection (model, selection, path) {
      // console.log(model, selection, path)
      const selectedModelIds = selection.value.map(i => i.value)
      const selectedModels = rootGetters.getData(model).filter(i => selectedModelIds.includes(i.id))
      return selectedModels.map(i => hydrate(i, path))
    }

    function hydrate (modelData, path = '') {
      // console.log(modelData, path)
      const hydratedMechanics = []
      for (const mechanic of modelData.mechanics) {
        if (mechanic.options) {
          // replace('-choice') might be unnecessary
          const type = mechanic.type.replace('-choice', '')
          const suffix = type === 'model' ? mechanic.model : type
          const sIndex = selected.findIndex(i => i.path === `${path}/${modelData.id}/${suffix}`)
          if (sIndex > -1) {
            const selection = selected[sIndex].value
            // remove the selected so we have a way to delete "bad" selections
            selected.splice(sIndex, 1)
            if (type === 'model') {
              hydratedMechanics.push(...hydrateSelection(type, selection, path))
            } else {
              hydratedMechanics.push(...selection)
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
      ...rootGetters['character/species/mechanics']
    ]
    for (const item of mechanics) {
      finalMechanics.push(...hydrate(item))
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
  }
}

export const mutations = {
}

export const actions = {
}
