export const state = () => ({
  mcPs: [
    [2, 4, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [0, 0, 0, 0, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 4, 5, 5],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
  ],
  mcTp: [2, 4, 5, 7, 11, 13, 15, 17, 20, 23, 26, 26, 30, 30, 34, 34, 39, 42, 45, 50],
  mcTpLimit: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6],
  mcPactSlotLevel: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  mcPactNumSlots: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4],
  levelText: ['Cantrip', '1st Level', '2nd Level', '3rd Level', '4th Level', '5th Level'],
  castingTimeText: {
    action: '1A',
    attack: 'Atk',
    bonus_action: '1BA',
    reaction: '1R*'
  },
  baseKlassPowercastingAbility: {
    adept: 'wis',
    vanguard: 'wis',
    engineer: 'int',
    sentinel: 'wis',
    infiltrator: 'int',
    soldier: false
  }
})

export const getters = {
  klassesPowercastingMechanics: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/klasses/klassesFeatures']
      .reduce((acc, curr) => acc.concat(curr.mechanics || []), [])
      .filter(i => i.type.startsWith('powercasting'))
  },
  techPoints: (state, getters, rootState, rootGetters) => {
    const base = {
      max: 0,
      used: rootGetters['character/character'].currentStats.tpUsed,
      limit: 0
    }
    if (rootGetters['character/klasses/isMulticlassed']) {
      let multiclassPointcastingLevel = 0
      for (const feature of rootGetters['character/klasses/klassesFeatures']) {
        const pointcastingFeature = feature.mechanics?.find(i => i.type === 'powercasting-points')
        if (pointcastingFeature) {
          const multiplier = pointcastingFeature.multiclassConversion
          const levels = rootGetters['character/klasses/selectedKlasses'].find(i => i.id === feature.klass).levels
          multiclassPointcastingLevel += Math.floor(levels * multiplier)
        }
      }
      if (multiclassPointcastingLevel > 0) {
        base.max = state.mcTp[multiclassPointcastingLevel - 1]
        base.limit = state.mcTpLimit[multiclassPointcastingLevel - 1]
      }
    } else {
      const pointCasting = getters.klassesPowercastingMechanics.find(i => i.type === 'powercasting-points')
      if (pointCasting) {
        const klassLevel = rootGetters['character/klasses/level']
        base.max = pointCasting.points[klassLevel - 1]
        base.limit = pointCasting.limit[klassLevel - 1]
      }
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
    if (rootGetters['character/klasses/isMulticlassed']) {
      let multiclassSlotcastingLevel = 0
      for (const feature of rootGetters['character/klasses/klassesFeatures']) {
        const slotcastingFeature = feature.mechanics?.find(i => i.type === 'powercasting-slots')
        if (slotcastingFeature) {
          const multiplier = slotcastingFeature.multiclassConversion
          const levels = rootGetters['character/klasses/selectedKlasses'].find(i => i.id === feature.klass).levels
          multiclassSlotcastingLevel += Math.floor(levels * multiplier)
        }
      }
      if (multiclassSlotcastingLevel > 0) {
        for (const slot of slots) {
          base[slot].max = state.mcPs[slot - 1][multiclassSlotcastingLevel - 1]
        }
      }
    } else {
      const slotCasting = getters.klassesPowercastingMechanics.find(i => i.type === 'powercasting-slots')
      if (slotCasting) {
        const klassLevel = rootGetters['character/klasses/level']
        for (const slot of slots) {
          base[slot].max = slotCasting[slot][klassLevel - 1]
        }
      }
    }
    const pactCasting = getters.pactSlots
    if (pactCasting.slotLevel > 0) {
      base[pactCasting].max += pactCasting.numSlots
    }
    return base
  },
  pactSlots: (state, getters, rootState, rootGetters) => {
    const base = {
      slotLevel: 0,
      numSlots: 0
    }
    if (rootGetters['character/klasses/isMulticlassed']) {
      let multiclassPactcastingLevel = 0
      for (const feature of rootGetters['character/klasses/klassesFeatures']) {
        const pactcastingFeature = feature.mechanics?.find(i => i.type === 'powercasting-pact')
        if (pactcastingFeature) {
          const multiplier = pactcastingFeature.multiclassConversion
          const levels = rootGetters['character/klasses/selectedKlasses'].find(i => i.id === feature.klass).levels
          multiclassPactcastingLevel += Math.floor(levels * multiplier)
        }
      }
      if (multiclassPactcastingLevel > 0) {
        base.slotLevel = state.mcPactSlotLevel[multiclassPactcastingLevel - 1]
        base.numSlots = state.mcPactNumSlots[multiclassPactcastingLevel - 1]
      }
    } else {
      const pactCasting = getters.klassesPowercastingMechanics.find(i => i.type === 'powercasting-pact')
      if (pactCasting) {
        const klassLevel = rootGetters['character/klasses/level']
        base.slotLevel = pactCasting.slotLevel[klassLevel - 1]
        base.numSlots = pactCasting.numSlots[klassLevel - 1]
      }
    }
    return base
  },
  klassPowercastingAbilities: (state, getters, rootState, rootGetters) => {
    const kpca = {}
    for (const klass of rootGetters['character/klasses/selectedKlasses']) {
      kpca[klass.id] = rootGetters['character/character'].settings.powercasting[klass.id] || state.baseKlassPowercastingAbility[klass.id]
    }
    return kpca
  },
  powers: (state, getters, rootState, rootGetters) => {
    const powers = []
    const list = getters.powerList
    const baseMods = {
      tech: 'int',
      biotic: 'wis'
    }
    let fhEligible = false
    const hasFreeHand = rootGetters['character/mechanics/mechanics'].find(i => i.type === 'free-hand-fs')
    if (hasFreeHand) {
      const eqWeapons = rootGetters['character/equipment/equippedWeapons']
      fhEligible = eqWeapons.length < 2 && eqWeapons.filter(i => i.data.properties.includes('light') && !i.data.properties.includes('two-handed')).length < 2
    }
    for (const p of getters.selectedPowers) {
      // i.value needed for selections/mechanicbag
      const power = list.find(i => i.id === (p.id || p.value))
      let mod
      if (power.type === 'combat') {
        mod = power.mod === 'noMod' ? false : power.mod
      } else {
        const appendedMod = p.mod || false
        const baseMod = baseMods[power.type]
        const klassMod = getters.klassPowercastingAbilities[p.klass]
        mod = appendedMod || klassMod || baseMod
      }
      let toHit = false
      if (power.attack.melee || power.attack.ranged) {
        toHit = {
          proficient: true,
          mod: power.id === 'hawk-missile-launcher' ? false : mod,
          bonus: fhEligible && power.attack.ranged && power.type !== 'combat'
            ? { type: 'flat', value: 2 }
            : false
        }
      }
      const resource = power.type === 'combat'
        ? { reset: power.recharge || 'manual', max: { type: 'flat', value: power.uses }, id: power.id }
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
      const castingTimes = power.castingTimes.map(i => state.castingTimeText[i])
      const notes = []
      if (p.advancement) {
        const adv = power.advancements[p.advancement]
        if (adv) {
          notes.push(`Adv: ${adv.name}`)
        }
      }

      powers.push({
        id: power.id,
        name: power.name,
        level: power.level,
        layout: 'attack',
        icon: `/images/powers/${power.type}.svg`,
        resource,
        range: {
          short: power.range,
          aoe: power.aoe
        },
        attack: toHit,
        notes,
        properties: [state.levelText[power.level]],
        dc,
        castingTimes,
        moreInfo: {
          component: 'me-power-info',
          bind: power
        }
      })
    }
    return powers
  },
  selectedPowers: (state, getters, rootState, rootGetters) => {
    const advancements = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'advancement')
    const mechanicPowers = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'powers').map((power) => {
      const advancement = advancements.find(adv => power.value === adv.id)
      return {
        ...power,
        advancement: advancement?.value
      }
    })
    return [
      ...rootGetters['character/character'].powers,
      ...mechanicPowers
      // powers are unique, in that they can be selected, but will never have mechanics
      // ...selected
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
