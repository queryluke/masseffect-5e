export const state = () => ({
})

export const getters = {
  mechanicAnalysis: (state, getters, rootState, rootGetters) => {
    const selected = rootGetters['character/selections/selected'].slice()

    function hydrateSelection (model, selection, path) {
      // console.log(model, selection, path)
      const selectedModelIds = selection.value.map(i => i.value)
      // TODO: This is where we can do appends, like power resources
      // console.log(model)
      const selectedModels = rootGetters.getData(model).filter(i => selectedModelIds.includes(i.id))
      // console.log(selectedModels)
      return selectedModels.map(i => hydrate({ mechanics: i.mechanics, path: `${path}/${model}/${i.id}` }))
        .reduce((acc, curr) => acc.concat(curr), [])
    }

    function hydrate ({ mechanics, path }) {
      const hydratedMechanics = []
      // console.log('hydrate', path, mechanics)
      if (!mechanics) {
        return hydratedMechanics
      }
      for (const mechanic of mechanics) {
        if (mechanic.options) {
          // replace('-choice') might be unnecessary
          const type = mechanic.type.replace('-choice', '')
          const suffix = type === 'model' ? mechanic.model : type
          // console.log('path', `${path}/${suffix}`)
          const sIndex = selected.findIndex(i => i.path === `${path}/${suffix}`)
          if (sIndex > -1) {
            const selection = selected[sIndex]
            // console.log('selection', selection)
            // console.log(type)
            // do we need to remove the selected so we have a way to delete "bad" selections
            selected.splice(sIndex, 1)
            if (type === 'model') {
              const hydrated = hydrateSelection(suffix, selection, path)
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
      ...rootGetters['character/backgroundMechanics']
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
  mcBonus: (state, getters, rootState, rootGetters, bonus) => {
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
  },
  fightingStyles: (state, getters) => {
    return getters.mechanics.filter(i => i.type === 'fighting-style')
  }
}

export const mutations = {
}

export const actions = {
}
