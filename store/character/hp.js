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
  barrier: (state, getters, rootState, rootGetters) => {
    const base = {
      ticks: {
        max: 0,
        used: rootGetters['character/character'].currentStats.barrier.ticksUsed
      },
      uses: {
        max: 0,
        used: rootGetters['character/character'].currentStats.barrier.used
      }
    }
    const klasses = rootGetters['character/klasses/klasses']
    if (klasses.some(i => ['vanguard', 'sentinel', 'adept'].includes(i.id))) {
      let level, barrierP, barrierUsesP
      if (klasses.length > 1) {
        barrierP = state.mcBarrier
        barrierUsesP = state.mcBarrier
        level = rootGetters['character/klasses/mcLevels']('vanguard', ['adept', 'sentinel'])
      } else {
        barrierP = klasses[0].data.progression.columns.find(i => i.label === 'barrier_ticks')?.values || []
        barrierUsesP = klasses[0].data.progression.columns.find(i => i.label === 'barrier_uses')?.values || []
        level = klasses[0].levels
      }
      base.ticks.max = barrierP[level - 1]
      base.uses.max = barrierUsesP[level - 1]
    }
    return base
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
