export const state = () => ({
})

export const getters = {
  equippedArmorBreakdown: (state, getters, rootState, rootGetters) => {
    // equipped armor
    const equippedArmor = rootGetters['character/equipment/equippedArmor']
    const head = equippedArmor.find(i => i.data.placement === 'head')
    const body = equippedArmor.find(i => i.data.placement === 'body_armor')
    const chest = equippedArmor.find(i => i.data.placement === 'chest')
    const arms = equippedArmor.find(i => i.data.placement === 'arms')
    const legs = equippedArmor.find(i => i.data.placement === 'legs')
    let runningAc = 10
    let numMed = 0
    let numHeavy = 0
    let numLight = 0
    if (body) {
      if (body.data.type === 'light') {
        runningAc += 1
        numLight = 3
      } else if (body.data.type === 'medium') {
        runningAc += 4
        numMed = 3
      } else if (body.data.type === 'heavy') {
        runningAc += 7
        numHeavy = 3
      }
    } else {
      if (chest) {
        numLight += chest.data.type === 'light' ? 1 : 0
        numMed += chest.data.type === 'medium' ? 1 : 0
        numHeavy += chest.data.type === 'heavy' ? 1 : 0
        runningAc += chest.data.type === 'heavy' ? 3 : chest.data.type === 'medium' ? 2 : 1
      }
      if (arms) {
        numLight += arms.data.type === 'light' ? 1 : 0
        numMed += arms.data.type === 'medium' ? 1 : 0
        numHeavy += arms.data.type === 'heavy' ? 1 : 0
        runningAc += arms.data.type === 'heavy' ? 2 : arms.data.type === 'medium' ? 1 : 0
      }
      if (legs) {
        numLight += legs.data.type === 'light' ? 1 : 0
        numMed += legs.data.type === 'medium' ? 1 : 0
        numHeavy += legs.data.type === 'heavy' ? 1 : 0
        runningAc += legs.data.type === 'heavy' ? 2 : legs.data.type === 'medium' ? 1 : 0
      }
    }
    if (head) {
      numLight += head.data.type === 'light' ? 1 : 0
      numMed += head.data.type === 'medium' ? 1 : 0
      numHeavy += head.data.type === 'heavy' ? 1 : 0
    }
    const equippedTypes = [head, body, chest, legs, arms].map(i => i?.data?.type || 'none')
    const flatBonus = rootGetters['character/mechanics/mechanics']
      .filter(i => i.type === 'ac')
      .reduce((acc, curr) => {
        let bonus = (curr.bonus ? rootGetters['character/mechanics/mcBonus'](curr.bonus) : 0)
        if (curr.condition === 'barrier-active') {
          const barrierState = rootGetters['character/hp/barrier']
          const remainingTicks = barrierState.ticks.max - barrierState.ticks.used
          if (remainingTicks <= 0) {
            bonus = 0
          }
        }
        if (curr.limit) {
          const limits = [...curr.limit, 'none']
          if (!equippedTypes.every(type => limits.includes(type))) {
            bonus = 0
          }
        }
        return acc + bonus
      }, 0)
    return {
      runningAc,
      numLight,
      numMed,
      numHeavy,
      flatBonus
    }
  },
  ac: (state, getters, rootState, rootGetters) => {
    const character = rootGetters['character/character']
    if (character.settings.acOverride) {
      return character.settings.acOverride
    }
    const dexMod = rootGetters['character/abilities/dexMod']
    const { numHeavy, numMed, runningAc, flatBonus } = getters.equippedArmorBreakdown
    const dexMax = numHeavy > 0 ? 0 : numMed > 0 ? 2 : 999
    let appliedDex = Math.min(dexMax, dexMod)
    if (numHeavy > 0) {
      appliedDex = 0
    }
    // natural armor
    const naturalArmorBase = rootGetters['character/mechanics/mechanics']
      .filter(i => i.type === 'natural-armor')
      .map(i => i.base + rootGetters[`character/abilities/${i.mod}Mod`])
      .sort((a, b) => b - a)
    const naturalArmor = naturalArmorBase[0] || 0
    const equippedAc = runningAc + appliedDex
    const bestAc = Math.max(equippedAc, naturalArmor)
    return bestAc + flatBonus + character.settings.acBonus
  }
}

export const mutations = {
}

export const actions = {
}
