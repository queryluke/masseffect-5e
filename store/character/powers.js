export const state = () => ({
  mcPs: [
    [2, 4, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [0, 0, 0, 0, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 4, 5, 5],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
  ],
  mcTp: [2, 4, 5, 7, 11, 13, 15, 17, 20, 23, 26, 26, 30, 30, 34, 34, 39, 42, 45, 50],
  mcTpLimit: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6]
})

export const getters = {
  startingClassPowerModAbility: (state, getters, rootState, rootGetters) => {
    const pcMod = {
      adept: 'wis',
      vanguard: 'wis',
      engineer: 'int',
      sentinel: 'wis',
      infiltrator: 'int',
      soldier: 'dex'
    }
    const startingKlassId = rootGetters['character/klasses/selectedKlasses'][0].id
    return pcMod[startingKlassId]
  },
  powerModAbility: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].settings.powerModAbility || getters.startingClassPowerModAbility
  },
  powercastingMod: (state, getters, rootState, rootGetters) => {
    return rootGetters[`character/abilities/${getters.powerModAbility}Mod`]
  },
  techPoints: (state, getters, rootState, rootGetters) => {
    const base = {
      max: 0,
      used: rootGetters['character/character'].currentStats.tpUsed,
      limit: 0
    }
    const klasses = rootGetters['character/klasses/klasses']
    if (klasses.some(i => ['engineer', 'infiltrator'].includes(i.id))) {
      let level, tpP, tpLimitP
      if (klasses.length > 1) {
        tpP = state.mcTp
        tpLimitP = state.mcTpLimit
        level = rootGetters['character/klasses/mcLevels']('engineer', ['infiltrator'])
      } else {
        tpP = klasses[0].data.progression.columns.find(i => i.label === 'tech_points')?.values || []
        tpLimitP = klasses[0].data.progression.columns.find(i => i.label === 'tech_point_limit')?.values || []
        level = klasses[0].levels
      }
      base.max = tpP[level - 1]
      base.limit = tpLimitP[level - 1]
    }
    return base
  },
  powerSlots: (state, getters, rootState, rootGetters) => {
    const current = rootGetters['character/character'].currentStats.psUsed
    const slots = [1, 2, 3, 4, 5]
    const base = {}
    for (const slot of slots) {
      base[slot] = {
        max: 0,
        used: current[slot - 1]
      }
    }
    const klasses = rootGetters['character/klasses/klasses']
    if (klasses.some(i => ['adept', 'vanguard'].includes(i.id))) {
      let level, psP
      if (klasses.length > 1) {
        psP = state.mcPs
        level = rootGetters['character/klasses/mcLevels']('adept', ['vangaurd'])
      } else {
        level = klasses[0].levels
        psP = klasses[0].data.progression.columns.find(i => i.label === 'power_slots_by_power_level')?.values || []
      }
      for (const slot of slots) {
        base[slot].max = psP[slot - 1][level - 1]
      }
    }
    const sentinel = klasses.find(i => i.id === 'sentinel')
    if (sentinel) {
      const numSlots = sentinel.data.progression.columns.find(i => i.label === 'power_slots').values[sentinel.levels - 1]
      const atLevel = sentinel.data.progression.columns.find(i => i.label === 'power_level').values[sentinel.levels - 1]
      base[atLevel].max += numSlots
      if (sentinel.levels >= 11) {
        base[3].max += 1
      }
      if (sentinel.levels >= 13) {
        base[4].max += 1
      }
      if (sentinel.levels >= 15) {
        base[4].max += 1
      }
      if (sentinel.levels >= 17) {
        base[5].max += 1
      }
    }
    return base
  },
  powers: (state, getters, rootState, rootGetters) => {
    const powers = []
    const list = getters.powerList
    const levelText = ['cantrip', '1st', '2nd', '3rd', '4th', '5th']
    const modOverride = rootGetters['character/character'].settings.powerModAbility || false
    for (const p of getters.selectedPowers) {
      // i.value needed for selections/mechanicbag
      const power = list.find(i => (i.id || i.value) === p.id)
      const mod = modOverride || (power.type === 'tech'
        ? 'int'
        : power.type === 'biotic'
          ? 'wis'
          : power.mod === 'noMod'
            ? false
            : power.mod)
      let toHit = false
      if (power.attack.melee || power.attack.ranged) {
        toHit = {
          proficient: true,
          mod: power.id === 'hawk-missile-launcher' ? false : mod
        }
      }
      const resource = power.type === 'combat'
        ? { reset: power.recharge, max: { type: 'flat', value: power.uses }, id: power.id }
        : p.resource || false
      let dc = false
      if (!toHit) {
        const powerSaves = Object.entries(power.save)
        if (powerSaves.some(i => i[1])) {
          dc = {
            base: 8,
            proficient: true,
            mod,
            save: powerSaves.find(i => i[1])[0]
          }
        }
      }
      const powerLevelText = levelText[power.level]

      power.push({
        id: power.id,
        name: power.name,
        level: power.level,
        // icon: `/images/powers/${power.type}.svg`,
        resource,
        range: {
          short: power.range,
          aoe: power.aoe
        },
        attack: toHit,
        notes: p.advancement ? [`Adv: ${p.advancement}`] : [],
        properties: [power.type, powerLevelText],
        dc,
        castingTime: power.castingTime,
        moreInfo: {
          component: 'me-power-info',
          bind: power
        }
      })
    }
    return powers
  },
  selectedPowers: (state, getters, rootState, rootGetters) => {
    return [
      ...rootGetters['character/character'].powers,
      ...rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'power')
    ]
  },
  powerList: (state, getters, rootState, rootGetters) => {
    return rootGetters.getData('powers')
  }
}

export const mutations = {
}

export const actions = {
}
