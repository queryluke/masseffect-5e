export const state = () => ({
})

export const getters = {
  ac: (state, getters, rootState, rootGetters) => {
    const character = rootGetters['character/character']
    if (character.settings.acOverride) {
      return character.settings.acOverride
    }
    const flatBonus = rootGetters['character/mechanics/mechanics']
      .filter(i => i.type === 'ac')
      .reduce((acc, curr) => acc + (curr.bonus ? rootGetters['character/mechanics/mcBonus'](curr.bonus) : 0), 0)
    const dexMod = rootGetters['character/abilities/dexMod']

    // natural armor
    const naturalArmorBase = rootGetters['character/mechanics/mechanics']
      .filter(i => i.type === 'natural-armor')
      .map(i => i.base + rootGetters[`character/abilities/${i.mod}Mod`])
      .sort((a, b) => b - a)
    const naturalArmor = naturalArmorBase[0] || 0

    // equipped armor
    const equippedArmor = rootGetters['character/equipment/armor']
    const head = equippedArmor.find(i => i.placement === 'head')
    const body = equippedArmor.find(i => i.placement === 'body_armor')
    const chest = equippedArmor.find(i => i.placement === 'chest')
    const arms = equippedArmor.find(i => i.placement === 'arms')
    const legs = equippedArmor.find(i => i.placement === 'legs')
    let runningAc = 10
    let numMed = 0
    let numHeavy = 0
    if (body) {
      if (body.type === 'light') {
        runningAc += 1
      } else if (body.type === 'medium') {
        runningAc += 4
        numMed = 3
      } else if (body.type === 'heavy') {
        runningAc += 7
        numHeavy = 3
      }
    } else {
      if (chest) {
        numMed += chest.type === 'medium' ? 1 : 0
        numHeavy += chest.type === 'heavy' ? 1 : 0
        runningAc += chest.type === 'heavy' ? 3 : chest.type === 'medium' ? 2 : 1
      }
      if (arms) {
        numMed += arms.type === 'medium' ? 1 : 0
        numHeavy += arms.type === 'heavy' ? 1 : 0
        runningAc += arms.type === 'heavy' ? 2 : arms.type === 'medium' ? 1 : 0
      }
      if (legs) {
        numMed += legs.type === 'medium' ? 1 : 0
        numHeavy += legs.type === 'heavy' ? 1 : 0
        runningAc += legs.type === 'heavy' ? 2 : legs.type === 'medium' ? 1 : 0
      }
    }
    if (head) {
      numMed += head.type === 'medium' ? 1 : 0
      numHeavy += head.type === 'heavy' ? 1 : 0
    }
    const dexMax = numHeavy > 0 ? 0 : numMed > 0 ? 2 : 999
    const appliedDex = Math.min(dexMax, dexMod)
    const equippedAc = runningAc + appliedDex

    const bestAc = Math.max(equippedAc, naturalArmor)
    return bestAc + flatBonus + character.settings.acBonus
  }
}

export const mutations = {
}

export const actions = {
}
