import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

function getDieIncrease (dieType, increase) {
  let dieIncreaseOverflow = 0
  let newDieType = false
  if (increase) {
    const dice = [1, 4, 6, 8, 10, 12]
    const increaseIndex = dice.indexOf(dieType) + increase
    if (increaseIndex >= dice.length) {
      dieIncreaseOverflow = dice.length - 1 - increaseIndex
      newDieType = 12
    }
    newDieType = dice[increaseIndex]
  }
  return { newDieType, dieIncreaseOverflow }
}

function upcastPower (base, upcast, advancement) {
  return merge(cloneDeep(base), (upcast || {}), (advancement || {}))
}

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
    const pcFeatures = []
    for (const kFeatures of rootGetters['character/klasses/klassesFeatures']) {
      const pcFeature = kFeatures.find(i => (i.mechanics || []).some(j => j.type.startsWith('powercasting')))
      if (pcFeature) {
        pcFeatures.push({
          klassId: pcFeature.klass,
          powercasting: pcFeature.mechanics.find(i => i.type.startsWith('powercasting'))
        })
      }
    }
    return pcFeatures
  },
  techPoints: (state, getters, rootState, rootGetters) => {
    const base = {
      max: 0,
      used: rootGetters['character/character'].currentStats.tpUsed,
      limit: 0
    }
    if (rootGetters['character/klasses/isMulticlassed']) {
      let multiclassPointcastingLevel = 0
      for (const feature of getters.klassesPowercastingMechanics.filter(i => i.powercasting.type === 'powercasting-points')) {
        const multiplier = feature.powercasting.multiclassConversion
        const levels = rootGetters['character/klasses/selectedKlasses'].find(i => i.id === feature.klassId).levels
        multiclassPointcastingLevel += (levels * multiplier)
      }
      multiclassPointcastingLevel = Math.floor(multiclassPointcastingLevel)
      if (multiclassPointcastingLevel > 0) {
        base.max = state.mcTp[multiclassPointcastingLevel - 1]
        base.limit = state.mcTpLimit[multiclassPointcastingLevel - 1]
      }
    } else {
      const pointCasting = getters.klassesPowercastingMechanics.find(i => i.powercasting.type === 'powercasting-points')
      if (pointCasting) {
        const klassLevel = rootGetters['character/klasses/level']
        base.max = pointCasting.powercasting.points[klassLevel - 1]
        base.limit = pointCasting.powercasting.limit[klassLevel - 1]
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
      for (const feature of getters.klassesPowercastingMechanics.filter(i => i.powercasting.type === 'powercasting-slots')) {
        const multiplier = feature.powercasting.multiclassConversion
        const levels = rootGetters['character/klasses/selectedKlasses'].find(i => i.id === feature.klassId).levels
        multiclassSlotcastingLevel += (levels * multiplier)
      }
      multiclassSlotcastingLevel = Math.floor(multiclassSlotcastingLevel)
      if (multiclassSlotcastingLevel > 0) {
        for (const slot of slots) {
          base[slot].max = state.mcPs[slot - 1][multiclassSlotcastingLevel - 1]
        }
      }
    } else {
      const slotCasting = getters.klassesPowercastingMechanics.find(i => i.powercasting.type === 'powercasting-slots')
      if (slotCasting) {
        const klassLevel = rootGetters['character/klasses/level']
        for (const slot of slots) {
          const klassSlot = slotCasting.powercasting.slots[slot]
          if (klassSlot) {
            base[slot].max = slotCasting.powercasting.slots[slot][klassLevel - 1]
          }
        }
      }
    }
    const pactCasting = getters.pactSlots
    if (pactCasting.slotLevel > 0) {
      base[pactCasting.slotLevel].max += pactCasting.numSlots
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
      for (const feature of getters.klassesPowercastingMechanics.filter(i => i.powercasting.type === 'powercasting-pact')) {
        const multiplier = feature.powercasting.multiclassConversion
        const levels = rootGetters['character/klasses/selectedKlasses'].find(i => i.id === feature.klassId).levels
        multiclassPactcastingLevel += (levels * multiplier)
      }
      multiclassPactcastingLevel = Math.floor(multiclassPactcastingLevel)
      if (multiclassPactcastingLevel > 0) {
        base.slotLevel = state.mcPactSlotLevel[multiclassPactcastingLevel - 1]
        base.numSlots = state.mcPactNumSlots[multiclassPactcastingLevel - 1]
      }
    } else {
      const pactCasting = getters.klassesPowercastingMechanics.find(i => i.powercasting.type === 'powercasting-pact')
      if (pactCasting) {
        const klassLevel = rootGetters['character/klasses/level']
        base.slotLevel = pactCasting.powercasting.slotLevel[klassLevel - 1]
        base.numSlots = pactCasting.powercasting.numSlots[klassLevel - 1]
      }
    }
    return base
  },
  klassPowercastingAbilities: (state, getters, rootState, rootGetters) => {
    const kpca = {}
    const selectedPowercasting = rootGetters['character/selections/selected'].filter(i => i.path.includes('powercasting'))
    for (const klass of rootGetters['character/klasses/selectedKlasses']) {
      const override = rootGetters['character/character'].settings.powercasting[klass.id] || false
      const klassSelected = selectedPowercasting.find(i => i.path.includes(klass.id))?.value || []
      const base = state.baseKlassPowercastingAbility[klass.id]
      kpca[klass.id] = override || klassSelected[0] || base
    }
    return kpca
  },
  klassPowercastingMaxes: (state, getters, rootState, rootGetters) => {
    const kpcms = {}
    const allKlassFeatures = rootGetters['character/klasses/klassesFeatures']
    for (const [index, klass] of rootGetters['character/klasses/selectedKlasses'].entries()) {
      const defaults = {
        numPowers: 0,
        maxPowerLevel: -1,
        numCantrips: 0,
        learned: true,
        powercastingType: null
      }
      // powers
      const powercastingFeature = allKlassFeatures[index].find(i => i.klass === klass.id && i.mechanics?.some(j => j.type.startsWith('powercasting')))
      if (powercastingFeature) {
        const powercasting = powercastingFeature.mechanics.find(i => i.type.startsWith('powercasting'))
        // numPowers
        if (powercasting.known) {
          defaults.numPowers = powercasting.known[klass.levels - 1]
        }
        if (powercasting.prepared) {
          let numPowers = Math.floor(powercasting.prepared.levelMultiplier * klass.levels)
          if (powercasting.prepared.modBonus) {
            const mod = getters.klassPowercastingAbilities[klass.id]
            numPowers += rootGetters[`character/abilities/${mod}Mod`]
          }
          defaults.numPowers = Math.max(1, numPowers)
          defaults.learned = false
        }
        // maxPowerLevel
        if (powercasting.type.endsWith('pact')) {
          defaults.maxPowerLevel = powercasting.slotLevel[klass.levels - 1]
          defaults.powercastingType = 'slots'
        }
        if (powercasting.type.endsWith('points')) {
          defaults.maxPowerLevel = powercasting.limit[klass.levels - 1]
          defaults.powercastingType = 'points'
        }
        if (powercasting.type.endsWith('slots')) {
          defaults.maxPowerLevel = Math.max(...Object.entries(powercasting.slots).filter(i => i[1][klass.levels - 1] > 0).map(i => parseInt(i[0], 10)))
          defaults.powercastingType = 'slots'
        }
      }
      // cantrips
      const cantripsFeatures = allKlassFeatures[index].find(i => i.klass === klass.id && i.mechanics?.some(j => j.type === 'cantrips'))
      if (cantripsFeatures) {
        const cantrips = cantripsFeatures.mechanics.find(i => i.type === 'cantrips')
        defaults.numCantrips = cantrips.known[klass.levels - 1]
        // cantrip mechanics
        const additionalCantrips = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'additional-cantrips')
        if (additionalCantrips.length) {
          let additional = 0
          for (const addition of additionalCantrips) {
            additional += rootGetters['character/mechanics/mcBonus'](addition.bonus)
          }
          defaults.numCantrips += additional
        }
      }
      kpcms[klass.id] = defaults
    }
    return kpcms
  },
  powers: (state, getters, rootState, rootGetters) => {
    const powers = []
    const list = getters.powerList
    // TODO: global overrides
    const defaultPcAbility = {
      tech: 'int',
      biotic: 'wis',
      combat: 'dex'
    }
    for (const p of getters.selectedPowers) {
      const power = list.find(i => i.id === p.id)
      if (!power) {
        continue
      }
      let baseMechanics = power.mechanics[0]
      baseMechanics = p.merge ? merge(cloneDeep(baseMechanics), cloneDeep(p.merge)) : baseMechanics
      const mod = p.mod || getters.klassPowercastingAbilities[p.klass] || defaultPcAbility[power.type]
      const baseAttackMod = baseMechanics.attack?.mod === 'pc' ? false : baseMechanics.attack?.mod
      const baseDcMod = baseMechanics.dc?.mod === 'pc' ? false : baseMechanics.dc?.mod
      const attack = baseMechanics.attack
        ? { ...baseMechanics.attack, mod: baseAttackMod || mod }
        : false
      const dc = baseMechanics.dc
        ? { ...baseMechanics.dc, mod: baseDcMod || mod }
        : false
      const damage = baseMechanics.damage
        ? baseMechanics.damage.map((i) => {
          return i.mod && i.mod === 'pc'
            ? { ...i, mod }
            : i
        })
        : false
      const resource = p.resource || baseMechanics.resource
      const basePower = {
        id: power.id,
        name: power.name,
        level: power.level,
        model: 'power',
        icon: `/images/powers/${power.type}.svg`,
        effect: (power.tags || []).filter(i => i !== 'damage'),
        source: p.source || p.klass,
        advancement: p.advancement
          // advancement selections used to be objects
          ? power.advancements.find(i => i.id === p.advancement) || power.advancements[p.advancement]
          : false,
        type: power.type,
        mod,
        upcast: false,
        alwaysCastable: p.alwaysCastable,
        ...baseMechanics,
        resource,
        attack,
        dc,
        damage
      }
      // upcast cantrips
      if (basePower.level === 0) {
        const level = rootGetters['character/klasses/level']
        const levels = rootGetters['character/mechanics/mechanics'].find(i => i.type === 'cantrip-boost')
          ? [0, 5, 11]
          : [5, 11, 17]
        const upcastLevel = level < levels[0]
          ? 0
          : level < levels[1]
            ? 1
            : level < levels[2]
              ? 2
              : 3
        let advancementMechanics = null
        if (p.advancement) {
          const advancement = power.advancements.find(i => i.id === p.advancement)
          if (advancement) {
            advancementMechanics = advancement.mechanics[upcastLevel] || advancement.mechanics[0]
          }
        }
        if (upcastLevel > 0) {
          const upcastMechanics = power.mechanics[upcastLevel]
          powers.push(upcastPower(basePower, upcastMechanics, advancementMechanics))
        } else {
          powers.push(upcastPower(basePower, null, advancementMechanics))
        }
      } else {
        let advancement = null
        if (p.advancement) {
          advancement = power.advancements.find(i => i.id === p.advancement)
        }
        for (let i = 0; i <= (6 - basePower.level); i++) {
          const level = i + basePower.level
          if (p.castAt && level !== p.castAt) {
            continue
          }
          let advancementMechanics = null
          const upcastMechanics = i === 0 ? {} : power.mechanics[i]
          if (advancement) {
            advancementMechanics = advancement.mechanics[i] || advancement.mechanics[0]
          }
          powers.push(upcastPower({ ...basePower, level, upcast: i !== 0 }, upcastMechanics, advancementMechanics, i))
        }
      }
    }
    // additional bonuses
    const powersAsAttacks = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'power-attack').map(i => i.value)
    const powersAtWill = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'power-at-will')
    const powerResource = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'power-resource')
    for (const power of powers) {
      // as attacks
      if (powersAsAttacks.length && powersAsAttacks.includes(power.id)) {
        if (power.altCasting && !power.altCasting.map(i => i.unit).includes('attack')) {
          power.altCasting.push({ length: 1, unit: 'attack' })
        } else {
          power.altCasting = [{ length: 1, unit: 'attack' }]
        }
      }
      // at will
      if (powersAtWill.length) {
        const atWillMechanic = powersAtWill.find(i => i.value === power.id && i.levels.includes(power.level))
        if (atWillMechanic) {
          power.alwaysCastable = power.level
        }
      }
      // resource
      if (powerResource.length) {
        const resourceMechanic = powerResource.find(i => i.value === power.id && i.levels.includes(power.level))
        if (resourceMechanic) {
          power.resource = { ...resourceMechanic.resource, id: `${resourceMechanic.resource.id}-${power.id}` }
          power.isCastableWithoutResource = true
        }
      }
      // augments
      const augmentQualities = {
        name: power.name,
        attackType: power.attack?.type,
        weaponOrPower: power.attack?.wp,
        powerType: power.type,
        abilityMod: power.mod
      }
      const augments = getters.hydratedAttackAugments(augmentQualities)
      // ATTACK
      if (augments.hit && power.attack) {
        const baseAttackBonus = power.attack.bonus ? rootGetters['character/mechanics/mcBonus'](power.attack.bonus) : 0
        power.attack = {
          ...power.attack,
          bonus: {
            type: 'flat',
            value: baseAttackBonus + augments.hit
          }
        }
      }

      // DC
      if (augments.dc && power.dc) {
        const baseDcBonus = power.dc.bonus ? rootGetters['character/mechanics/mcBonus'](power.dc.bonus) : 0
        power.dc = {
          ...power.dc,
          bonus: {
            type: 'flat',
            value: baseDcBonus + augments.dc
          }
        }
      }

      // DAMAGE
      if (power.damage && (augments.damage || augments.reroll || augments.dieIncrease)) {
        power.damage = power.damage.map((baseDamage) => {
          if (['temp', 'hp', 'shields'].includes(baseDamage.type) || baseDamage.addTo) {
            return baseDamage
          }
          const baseDamageBonus = baseDamage.bonus ? rootGetters['character/mechanics/mcBonus'](baseDamage.bonus) : 0
          const { newDieType, dieIncreaseOverflow } = getDieIncrease(baseDamage.dieType, augments.dieIncrease)
          return {
            ...baseDamage,
            dieType: newDieType || baseDamage.dieType,
            bonus: {
              type: 'flat',
              value: baseDamageBonus + augments.damage + dieIncreaseOverflow
            },
            reroll: augments.reroll
          }
        })
      }
    }
    // console.log(powers)
    return powers
  },
  hydratedAttackAugments: (state, getters, rootState, rootGetters) => ({ attackType, weaponOrPower = 'power', powerType, abilityMod }) => {
    // By default weaponOrPower = power, it is overridden by the wp property on the attack
    // When wp property is 'weapon' (i.e., for combat powers), an attackLimit.model === 'power' will be skipped
    const matchingAttackAugments = rootGetters['character/mechanics/mechanics']
      .filter((i) => {
        return i.type === 'attack-augment' &&
          (i.attackLimit?.type ? i.attackLimit.type === attackType : true) &&
          (i.attackLimit?.model ? i.attackLimit.model === weaponOrPower : true) &&
          (i.attackLimit?.modelTypes ? i.attackLimit.modelTypes.includes(powerType) : true) &&
          // remove any dt, bf, twf
          !i.attackLimit?.special
      })
    const hydrated = {
      hit: 0,
      damage: 0,
      dc: 0,
      range: 0,
      reroll: 0,
      dieIncrease: 0
    }
    for (const maa of matchingAttackAugments) {
      // get the resulting bonus
      const bonus = maa.abilityMod
        ? rootGetters['character/mechanics/mcBonus']({ type: 'mod', value: abilityMod })
        : rootGetters['character/mechanics/mcBonus'](maa.bonus)
      const reroll = maa.rerollIfLessThan || 0
      const dieIncrease = maa.dieIncrease || 0
      for (const at of maa.augmentTypes) {
        if (at === 'damage' && (reroll || dieIncrease)) {
          hydrated.reroll = Math.max(reroll, hydrated.reroll)
          hydrated.dieIncrease += dieIncrease
        }
        hydrated[at] += bonus
      }
    }
    return hydrated
  },
  selectedPowers: (state, getters, rootState, rootGetters) => {
    // hack for auto-learned power advancements
    const unusedAdvancements = rootGetters['character/mechanics/unusedSelections'].reduce((a, c) => a.concat(c.value), []).filter(i => i.type === 'advancement')
    const hydratedAdvancements = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'advancement')
    const advancements = [...hydratedAdvancements, ...unusedAdvancements]
    const mechanicPowers = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'powers').map((power) => {
      const advancement = advancements.find(adv => power.value === adv.id)
      // const advancementId
      // attempt to find source
      let source = ''
      try {
        // TODO: for these, should probably set source in the data
        if (power.provider) {
          const data = rootGetters.getItem(power.provider.model, power.provider.id)
          source = data.name
        }
      } catch (e) {
        console.error(`could not find source ${power.source}`)
      }
      return {
        ...power,
        id: power.value,
        path: power.source,
        source,
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
    return rootGetters.getData('powers').concat(rootGetters['character/homebrew/powers'])
  }
}

export const mutations = {
}

export const actions = {
}
