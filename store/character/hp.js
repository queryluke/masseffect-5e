export const state = () => ({
  mcBarrier: [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 9, 9, 10],
  mcBarrierUses: [2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6]
})

export const getters = {
  hp: (state, getters, rootState, rootGetters) => {
    let max = 0
    if (rootGetters['character/character'].settings.hp) {
      max = rootGetters['character/character'].settings.hp
    } else {
      for (const klass of rootGetters['character/klasses/selectedKlasses']) {
        for (const hp of klass.hitPoints) {
          max += hp
        }
      }
      const level = rootGetters['character/klasses/level']
      max += (level * rootGetters['character/abilities/conMod'])
      max += rootGetters['character/mechanics/mechanics']
        .filter(i => i.type === 'hp')
        .reduce((acc, curr) => acc + rootGetters['character/mechanics/mcBonus'](curr.bonus), 0)
      max = Math.max(level, max)
    }
    return {
      max,
      current: Math.max(max - rootGetters['character/character'].currentStats.hitPointsLost, 0)
    }
  },
  shieldSources: (state, getters, rootState, rootGetters) => {
    const sources = []
    for (const gear of rootGetters['character/equipment/gear'].filter(i => i.equipped)) {
      const shieldMc = (gear.data?.mechanics || []).find(i => i.type === 'shields')
      if (shieldMc) {
        sources.push({
          id: gear.uuid,
          name: gear.data.name,
          capacity: rootGetters['character/mechanics/mcBonus'](shieldMc.capacity),
          regen: rootGetters['character/mechanics/mcBonus'](shieldMc.regen)
        })
      }
    }
    const armorSource = { id: 'armor', name: 'Armor', capacity: 0, regen: 0 }
    const armorMechanics = rootGetters['character/equipment/armorMechanics'].reduce((a, c) => a.concat(c.mechanics || []), [])
    const setBonusMechanics = rootGetters['character/equipment/setBonusMechanics'].reduce((a, c) => a.concat(c.mechanics || []), [])
    const mechanicsToProcess = [...armorMechanics, ...setBonusMechanics].filter(i => i.type === 'shields')
    for (const am of mechanicsToProcess) {
      armorSource.capacity += rootGetters['character/mechanics/mcBonus'](am.capacity)
      armorSource.regen += rootGetters['character/mechanics/mcBonus'](am.regen)
    }
    sources.push(armorSource)
    sources.sort((a, b) => {
      return a.capacity === b.capacity
        ? b.regen - a.regen
        : b.capacity - a.capacity
    })
    return sources
  },
  shields: (state, getters, rootState, rootGetters) => {
    const overrideCapacity = parseInt(rootGetters['character/character'].settings.shields) || 0
    const overrideRegen = parseInt(rootGetters['character/character'].settings.regen) || 0
    const sourceSelection = rootGetters['character/character'].settings.shieldSource
    let source = null
    if (sourceSelection) {
      source = getters.shieldSources.find(i => i.id === sourceSelection)
    }
    if (!source) {
      source = getters.shieldSources[0]
    }
    const max = overrideCapacity || source.capacity
    return {
      max,
      current: Math.max(max - rootGetters['character/character'].currentStats.shieldsLost, 0),
      regen: overrideRegen || source.regen
    }
  },
  tempHp: (state, getters, rootState, rootGetters) => {
    const tempHp = rootGetters['character/character'].currentStats.tempHp
    if (!tempHp) {
      return {
        max: 0,
        value: 0
      }
    }
    return tempHp
  },
  barrier: (state, getters, rootState, rootGetters) => {
    const base = {
      dieType: 0,
      dieCount: 0,
      ticks: {
        max: 0,
        used: rootGetters['character/character'].currentStats.barrier.ticksUsed
      },
      uses: {
        max: 0,
        used: rootGetters['character/character'].currentStats.barrier.used
      }
    }
    if (rootGetters['character/klasses/isMulticlassed']) {
      let multiclassBarrierTickLevel = 0
      let multiclassBarrierUsesLevel = 0
      let dieCount = 0
      let dieType = 0
      let maxTicksOfKlass = 0
      for (const [index, klass] of Object.entries(rootGetters['character/klasses/klasses'])) {
        const barrierMechanic = (rootGetters['character/klasses/klassesFeatures'][index] || []).reduce((a, c) => a.concat((c.mechanics || [])), []).find(i => i.type === 'barrier')
        if (!barrierMechanic) {
          continue
        }
        const multiplier = barrierMechanic.multiclassConversion
        multiclassBarrierTickLevel += (klass.levels * multiplier)
        multiclassBarrierUsesLevel += klass.levels
        maxTicksOfKlass = Math.max(maxTicksOfKlass, barrierMechanic.ticks[klass.levels - 1])
        dieType = Math.max(dieType, barrierMechanic.dieType)
        dieCount = Math.max(dieCount, barrierMechanic.dieCount)
      }
      multiclassBarrierTickLevel = Math.floor(multiclassBarrierTickLevel)
      if (multiclassBarrierTickLevel > 0 && multiclassBarrierUsesLevel > 0) {
        base.dieType = dieType
        base.dieCount = dieCount
        base.ticks.max = Math.max(state.mcBarrier[multiclassBarrierTickLevel - 1], maxTicksOfKlass)
        base.uses.max = state.mcBarrierUses[multiclassBarrierUsesLevel - 1]
      }
    } else {
      const barrierMechanic = rootGetters['character/mechanics/mechanics'].find(i => i.type === 'barrier')
      if (barrierMechanic) {
        const klassLevel = rootGetters['character/klasses/level']
        base.ticks.max = barrierMechanic.ticks[klassLevel - 1]
        base.uses.max = barrierMechanic.uses[klassLevel - 1]
        base.dieType = barrierMechanic.dieType
        base.dieCount = barrierMechanic.dieCount
      }
    }
    return base
  },
  techArmor: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].currentStats.resources['tech-armor-hp'] || 0
  },
  techArmorMax: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].currentStats.techArmorMax || 0
  }
}

export const mutations = {
}

export const actions = {
}
