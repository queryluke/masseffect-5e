export const state = () => ({
})

export const getters = {
  hp: (state, getters, rootState, rootGetters) => {
    let max = 0
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
    return {
      max,
      current: Math.max(max - rootGetters['character/character'].currentStats.hitPointsLost, 0)
    }
  },
  shields: (state, getters, rootState, rootGetters) => {
    const max = rootGetters['character/character'].settings.shields
    return {
      // TODO: settings.shields is the override, eventually need to calculate shields
      max: rootGetters['character/character'].settings.shields,
      current: Math.max(max - rootGetters['character/character'].currentStats.shieldsLost, 0),
      regen: rootGetters['character/character'].settings.regen
    }
  },
  tempHp: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].currentStats.tempHp
  },
  hasBarrier: (state, getters, rootState, rootGetters) => {
    // TODO: should be in the mechanics
    return rootGetters['character/klasses/selectedKlassesIds'].some(i => ['adept', 'sentinel', 'vanguard'].includes(i))
  },
  barrier (stat, getters, rootState, rootGetters) {
    // TODO: probably need a multiclassing mechanic for these type features?
    const progression = rootGetters['character/klasses/klassesList'].find(i => i.id === 'vanguard').progression.columns
    const level = rootGetters['character/klasses/selectedKlasses'].reduce((acc, curr) => {
      const adder = curr.id === 'vanguard'
        ? curr.levels
        : ['adept', 'sentinel'].includes(curr.id)
            ? Math.floor(curr.levels / 2)
            : 0
      return acc + adder
    }, 0)
    return {
      ticks: {
        max: progression.find(i => i.label === 'barrier_ticks').values[level - 1],
        used: rootGetters['character/character'].currentStats.barrier.ticksUsed
      },
      uses: {
        max: progression.find(i => i.label === 'barrier_uses').values[level - 1],
        used: rootGetters['character/character'].currentStats.barrier.used
      }
    }
  },
  barrierDie: (state, getters, rootState, rootGetters) => {
    if (!rootGetters['character/klasses/selectedKlassesIds'].includes('vanguard')) {
      return '1d8'
    }
    const vanguardClass = rootGetters['character/klasses/selectedKlasses'].find(i => i.id === 'vanguard')
    let num = 1
    let type = 8
    if (vanguardClass.levels >= 11) {
      num = 2
    }
    if (vanguardClass.subclass === 'battle-master') {
      if (vanguardClass.levels >= 10) {
        type = 10
      }
      if (vanguardClass.levels >= 18) {
        type = 12
      }
    }
    return `${num}d${type}`
  }
}

export const mutations = {
}

export const actions = {
}
