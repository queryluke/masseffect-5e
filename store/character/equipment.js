import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
  nullArmor: {
    placement: 'none',
    type: 'none',
    cost: 0,
    manufacturer: '',
    image: '',
    tags: [],
    andromeda: false,
    set: false,
    rarity: 'common'
  },
  nullWeapon: {
    rarity: 'common',
    type: 'heavy_pistol',
    cost: 0,
    manufacturer: '',
    weight: 0,
    heat: 0,
    damage: {
      dieCount: 1,
      dieType: 4,
      type: 'piercing'
    }
  },
  customArmorStub: {
    cost: 0,
    manufacturer: null,
    image: null,
    tags: [],
    andromeda: false,
    set: false,
    rarity: 'common',
    flavor: '',
    html: ''
  },
  customArmor: [
    // chest
    { id: 'ca-chest-light-2', name: 'Light Chest Armor II', rarity: 'uncommon', placement: 'chest', type: 'light', cost: 8000, slots: 2 },
    { id: 'ca-chest-medium-2', name: 'Medium Chest Armor II', rarity: 'uncommon', placement: 'chest', type: 'medium', cost: 10000, slots: 2 },
    { id: 'ca-chest-heavy-2', name: 'Heavy Chest Armor II', rarity: 'uncommon', placement: 'chest', type: 'heavy', cost: 12000, slots: 2 },
    { id: 'ca-chest-light-3', name: 'Light Chest Armor III', rarity: 'rare', placement: 'chest', type: 'light', cost: 28000, slots: 3 },
    { id: 'ca-chest-medium-3', name: 'Medium Chest Armor III', rarity: 'rare', placement: 'chest', type: 'medium', cost: 30000, slots: 3 },
    { id: 'ca-chest-heavy-3', name: 'Heavy Chest Armor III', rarity: 'rare', placement: 'chest', type: 'heavy', cost: 32000, slots: 3 },
    // legs (arms auto generated)
    { id: 'ca-legs-light-0', name: 'Light Leg Armor', rarity: 'common', placement: 'legs', type: 'light', cost: 2000, slots: 0 },
    { id: 'ca-legs-medium-0', name: 'Medium Leg Armor', rarity: 'common', placement: 'legs', type: 'medium', cost: 3000, slots: 0 },
    { id: 'ca-legs-heavy-0', name: 'Heavy Leg Armor', rarity: 'common', placement: 'legs', type: 'heavy', cost: 4000, slots: 0 },
    { id: 'ca-legs-light-1', name: 'Light Leg Armor I', rarity: 'uncommon', placement: 'legs', type: 'light', cost: 22000, slots: 1 },
    { id: 'ca-legs-medium-1', name: 'Medium Leg Armor I', rarity: 'uncommon', placement: 'legs', type: 'medium', cost: 23000, slots: 1 },
    { id: 'ca-legs-heavy-1', name: 'Heavy Leg Armor I', rarity: 'uncommon', placement: 'legs', type: 'heavy', cost: 24000, slots: 1 },
    { id: 'ca-legs-light-2', name: 'Light Leg Armor II', rarity: 'rare', placement: 'legs', type: 'light', cost: 42000, slots: 2 },
    { id: 'ca-legs-medium-2', name: 'Medium Leg Armor II', rarity: 'rare', placement: 'legs', type: 'medium', cost: 43000, slots: 2 },
    { id: 'ca-legs-heavy-2', name: 'Heavy Leg Armor II', rarity: 'rare', placement: 'legs', type: 'heavy', cost: 44000, slots: 2 },
    // head
    { id: 'ca-head-light-1', name: 'Light Helmet I', rarity: 'uncommon', placement: 'head', type: 'light', cost: 5000, slots: 1 },
    { id: 'ca-head-medium-1', name: 'Medium Helmet I', rarity: 'uncommon', placement: 'head', type: 'medium', cost: 5000, slots: 1 },
    { id: 'ca-head-heavy-1', name: 'Heavy Helmet I', rarity: 'uncommon', placement: 'head', type: 'heavy', cost: 5000, slots: 1 },
    { id: 'ca-head-light-2', name: 'Light Helmet II', rarity: 'rare', placement: 'head', type: 'light', cost: 25000, slots: 2 },
    { id: 'ca-head-medium-2', name: 'Medium Helmet II', rarity: 'rare', placement: 'head', type: 'medium', cost: 25000, slots: 2 },
    { id: 'ca-head-heavy-2', name: 'Heavy Helmet II', rarity: 'rare', placement: 'head', type: 'heavy', cost: 25000, slots: 2 },
    { id: 'ca-head-light-3', name: 'Light Helmet III', rarity: 'spectre', placement: 'head', type: 'light', cost: 45000, slots: 3 },
    { id: 'ca-head-medium-3', name: 'Medium Helmet III', rarity: 'spectre', placement: 'head', type: 'medium', cost: 45000, slots: 3 },
    { id: 'ca-head-heavy-4', name: 'Heavy Helmet III', rarity: 'spectre', placement: 'head', type: 'heavy', cost: 45000, slots: 3 }
  ],
  unarmedStrike: {
    type: 'natural-melee',
    name: 'Unarmed Strike',
    damage: {
      dieCount: 1,
      dieType: null,
      type: 'bludgeoning'
    },
    range: 5,
    properties: [],
    notes: [],
    html: 'Instead of using a weapon to make a melee weapon attack, you can use an unarmed strike: a punch, kick, head-butt, or similar\n' +
      'forceful blow. On a hit, an unarmed strike deals bludgeoning damage equal to 1 + your\n' +
      'Strength modifier. You are proficient with your unarmed strikes and your unarmed strikes count as weapons.'
  },
  gunStrike: {
    type: 'gun-strike',
    name: 'Gun Strike',
    damage: {
      dieCount: 1,
      dieType: 4,
      type: 'bludgeoning'
    },
    properties: [],
    notes: [],
    html: 'Instead of using a melee weapon to make a melee weapon attack, you can use your ranged weapon, hitting a target with the butt of\n' +
      'the gun. On a hit, a gun strike deals bludgeoning damage equal to 1d4 + your Strength modifier. You are proficient with\n' +
      'gun strikes if you are proficient with the type of ranged weapon.'
  }
})

export const getters = {
  equipment: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].equipment
  },
  weapons: (state, getters) => {
    return getters.equipment
      .filter(i => i.type === 'weapon')
      .map((i) => {
        const weapon = getters.weaponsList.find(j => j.id === i.id) || state.nullWeapon
        const data = {
          ...weapon,
          ...i.overrides,
          damage: {
            ...weapon.damage,
            ...(i.overrides?.damage || {})
          }
        }
        return {
          data,
          ...i,
          slots: data.properties.includes('two-handed') ? 2 : 1
        }
      })
  },
  armor: (state, getters) => {
    return getters.equipment
      .filter(i => i.type === 'armor')
      .map((i) => {
        if (i.custom) {
          return {
            data: { ...state.customArmorStub, ...i.custom },
            ...i
          }
        } else {
          const armorData = getters.armorList.find(j => j.id === i.id) || state.nullArmor
          return {
            data: armorData,
            ...i
          }
        }
      })
  },
  gear: (state, getters) => {
    return getters.equipment
      .filter(i => i.type === 'gear')
      .map((i) => {
        const gearData = getters.gearList.find(j => j.id === i.id) || state.nullArmor
        return {
          data: gearData,
          ...i
        }
      })
  },
  equippedArmor: (state, getters) => {
    return getters.armor.filter(i => i.equipped)
  },
  equippedWeapons: (state, getters) => {
    return getters.weapons.filter(i => i.equipped)
  },
  weaponsList: (state, getters, rootState, rootGetters) => {
    return rootGetters.getData('weapons')
  },
  weaponPropertiesList: (state, getters, rootState, rootGetters) => {
    return rootGetters.getData('weapon-properties')
  },
  setBonusesList: (state, getters, rootState, rootGetters) => {
    return rootGetters.getData('set-bonuses')
  },
  armorList: (state, getters, rootState, rootGetters) => {
    const items = []
    const armorSets = rootGetters.getData('armor').map((i) => {
      let setBonus = false
      if (i.set) {
        setBonus = getters.setBonusesList.find(sb => sb.id === i.set) || false
      }
      return {
        ...i,
        setBonus
      }
    })
    const customArmor = state.customArmor.map((i) => {
      const armor = { ...state.customArmorStub, ...i }
      if (armor.slots > 0) {
        armor.html = `You may add ${armor.slots} armor mod${armor.slots > 1 ? 's' : ''} to this custom armor piece`
      }
      if (armor.type === 'legs') {
        const armArmor = Object.assign({}, armor)
        armArmor.id = armArmor.id.replace('-legs-', '-arms-')
        armArmor.name = armArmor.name.replace(' Leg ', ' Arm ')
        armArmor.placement = 'arms'
        items.push(armArmor)
      }
      return armor
    })
    return [...items, ...customArmor, ...armorSets]
  },
  gearList: (state, getters, rootState, rootGetters) => {
    const items = []
    for (const gear of rootGetters.getData('gear')) {
      if (gear.subsets) {
        for (const subset of gear.subsets) {
          items.push({ ...gear, ...subset })
        }
      } else {
        items.push(gear)
      }
    }
    return items
  },
  modsList: (state, getters, rootState, rootGetters) => {
    return rootGetters.getData('mods')
  },
  naturalWeapons: (state, getters, rootState, rootGetters) => {
    const naturalWeapons = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'natural-weapon')
    const baseUnarmed = cloneDeep(state.unarmedStrike)
    for (const unarmedReplacement of naturalWeapons.filter(i => i.replacesUnarmedStrike)) {
      const newUnarmed = unarmedReplacement.value
      if (newUnarmed.name) {
        baseUnarmed.name = newUnarmed.name
      }
      if (newUnarmed.damage?.dieCount) {
        baseUnarmed.damage.dieCount = Math.max(baseUnarmed.damage.dieCount, newUnarmed.damage?.dieCount)
      }
      if (newUnarmed.damage?.dieType) {
        baseUnarmed.damage.dieType = Math.max(baseUnarmed.damage.dieType, newUnarmed.damage?.dieType)
      }
      if (baseUnarmed.damage.type === 'bludgeoning' && newUnarmed.damage && newUnarmed.damage.type !== 'bludgeoning') {
        baseUnarmed.damage.type = newUnarmed.damage.type
      }
      if (newUnarmed.range) {
        baseUnarmed.range = Math.max(baseUnarmed.range, newUnarmed.range)
      }
      if (newUnarmed.notes?.length) {
        baseUnarmed.notes = baseUnarmed.notes.concat(newUnarmed.notes)
      }
      if (newUnarmed.properties?.length) {
        baseUnarmed.properties = baseUnarmed.properties.concat(newUnarmed.properties)
      }
      if (newUnarmed.moreInfo) {
        baseUnarmed.moreInfo = newUnarmed.moreInfo
      }
      if (newUnarmed.damageModOverride) {
        baseUnarmed.damageModOverride = newUnarmed.damageModOverride
      }
    }
    return [baseUnarmed, ...naturalWeapons.filter(i => !i.replacesUnarmedStrike).map(i => i.value)]
  },
  baseGunStrike: (state, getters, rootState, rootGetters) => {
    const gunStrikes = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'gun-strike-augment')
    const baseGunStrike = cloneDeep(state.gunStrike)
    for (const gunStrikeAugment of gunStrikes) {
      const newGunStrike = gunStrikeAugment.value
      if (newGunStrike.damage?.dieCount) {
        baseGunStrike.damage.dieCount = Math.max(baseGunStrike.damage.dieCount, newGunStrike.damage?.dieCount)
      }
      if (newGunStrike.damage?.dieType) {
        baseGunStrike.damage.dieType = Math.max(baseGunStrike.damage.dieType, newGunStrike.damage?.dieType)
      }
      if (newGunStrike.notes) {
        baseGunStrike.notes = baseGunStrike.notes.concat(newGunStrike.notes)
      }
    }
    return baseGunStrike
  },
  weaponAttacks: (state, getters, rootState, rootGetters) => {
    const attacks = {
      twf: [],
      dt: [],
      bf: [],
      attacks: []
    }
    const weaponProps = {}
    for (const prop of getters.weaponPropertiesList) {
      weaponProps[prop.id] = prop.name
    }
    const globalMods = {
      hit: {
        all: parseInt(rootGetters['character/character'].settings.attackMod, 10) || 0,
        melee: parseInt(rootGetters['character/character'].settings.attackMeleeMod, 10) || 0,
        ranged: parseInt(rootGetters['character/character'].settings.attackRangedMod, 10) || 0
      },
      damage: {
        all: parseInt(rootGetters['character/character'].settings.damageMod, 10) || 0,
        melee: parseInt(rootGetters['character/character'].settings.damageMeleeMod, 10) || 0,
        ranged: parseInt(rootGetters['character/character'].settings.damageRangedMod, 10) || 0
      }
    }
    const weaponProfs = rootGetters['character/profs/profs'].weapon
    const twfEligible = getters.equippedWeapons.filter(i => i.data.properties.includes('light') && !i.data.properties.includes('two-handed')).length > 1
    const attackTypes = {
      melee: 'Melee',
      ranged: 'Ranged'
    }

    const weaponsToProcess = [
      ...getters.equippedWeapons,
      ...getters.naturalWeapons.map((i) => {
        return {
          data: i,
          bonusHit: 0,
          bonusDamage: 0
        }
      })
    ]

    if (getters.equippedWeapons.length) {
      weaponsToProcess.push({
        data: getters.baseGunStrike,
        bonusHit: 0,
        bonusDamage: 0
      })
    }

    for (const weapon of weaponsToProcess) {
      // assess properties
      const light = weapon.data.properties.includes('light')
      const dt = weapon.data.properties.includes('double-tap')
      const bf = weapon.data.properties.includes('burst-fire')
      const finesse = weapon.data.properties.includes('finesse')
      const recoil = weapon.data.properties.includes('recoil')
      const reach = weapon.data.properties.includes('reach')
      const twoHanded = weapon.data.properties.includes('two-handed')
      const dexOrStr = rootGetters['character/abilities/dexMod'] > rootGetters['character/abilities/strMod'] ? 'dex' : 'str'
      // TODO: when new melee weapons arrive, need to change this...note that natural weapons are natural-ranged and natural-melee
      const attackType = ['melee', 'gun-strike', 'natural-melee'].includes(weapon.data.type) ? 'melee' : 'ranged'
      const weaponType = ['melee', 'gun-strike', 'natural-melee'].includes(weapon.data.type) ? 'melee' : weapon.data.type
      // shoulder mounts
      const smWeapons = rootGetters['character/character'].currentStats.shoulderMounts || []
      const isSmWeapon = smWeapons.includes(weapon.uuid)
      const hasShoulderMounts = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'shoulder-mounts').length
      const abilityMod = isSmWeapon && hasShoulderMounts
        ? 'int'
        : recoil || finesse
          ? dexOrStr
          : weaponType === 'melee'
            ? 'str'
            : 'dex'

      // Get Matching Augments
      const augments = getters.hydratedAttackAugments('attack-augment', attackType, 'weapons', weaponType, abilityMod)

      // WEAPON ATTACK
      const weaponBonusHit = weapon.bonusHit || 0
      const globalBonusHit = globalMods.hit.all + globalMods.hit[attackType]
      const augmentBonusHit = augments.attack
      const attack = {
        proficient: ['natural-melee', 'natural-ranged', 'gun-strike'].includes(weapon.data.type) || weaponProfs.includes(weaponType),
        mod: abilityMod,
        bonus: {
          type: 'flat',
          value: weaponBonusHit + globalBonusHit + augmentBonusHit
        }
      }

      // WEAPON DAMAGE
      const weaponBonusDamage = weapon.bonusDamage || 0
      const globalBonusDamage = globalMods.damage.all + globalMods.damage[attackType]
      const augmentBonusDamage = augments.damage
      const damageMod = weapon.data.damageModOverride === 'noMod'
        ? false
        : weapon.data.damageModOverride || abilityMod
      const damage = [
        {
          ...weapon.data.damage,
          mod: damageMod,
          bonus: {
            type: 'flat',
            value: weaponBonusDamage + globalBonusDamage + augmentBonusDamage
          }
        }
      ]

      // HEAT
      const resource = weapon.data.heat
        ? {
            displayType: 'heat',
            reset: 'manual',
            max: {
              type: 'flat',
              value: weapon.data.heat,
              min: 0
            },
            id: weapon.uuid
          }
        : null

      // RANGE
      let shortRange = attackType === 'melee'
        ? reach
          ? 10
          : 5
        : weapon.data.range
      shortRange += augments.range
      const longRange = attackType === 'ranged' && weapon.data.type !== 'natural-ranged'
        ? weaponType === 'shotgun'
          ? (weapon.data.range * 2)
          : (weapon.data.range * 3)
        : null
      const range = {
        short: shortRange,
        long: longRange
      }

      // NOTES
      const notes = [
        ...getters.weaponPropertiesList.filter(i => weapon.data.properties.includes(i.id)).map((i) => {
          return {
            type: 'tooltip',
            text: i.name,
            tooltipText: i.html,
            isHtml: true
          }
        }),
        ...(weapon.data.notes || []),
        ...(augments.notes || [])
      ]

      // TODO: thrown
      // const thrown = weapon.data.properties.includes('thrown')
      // TODO: arc
      // const arc = weapon.data.properties.includes('arc')

      const base = {
        type: 'attack',
        attackType,
        attack,
        name: weapon.data.name,
        damage,
        resource,
        range,
        notes,
        properties: [attackTypes[attackType]],
        component: 'me-cs-details-weapon',
        data: weapon.data,
        bonus: { type: 'flat', value: 0 }
      }
      attacks.attacks.push(base)

      if (bf) {
        const bfAugments = getters.hydratedAttackAugments('bf-augment', attackType, 'weapons', weaponType, abilityMod)
        attacks.bf.push({
          ...base,
          attack: null,
          range: {
            short: base.range.short,
            aoe: { type: 'cube', size: 10 }
          },
          resource: { ...base.resource, increment: 3 },
          dc: {
            // TODO: when bf is adjusted, improve this
            base: 15 + bfAugments.dc,
            proficient: false,
            mod: false,
            save: 'dex'
          },
          properties: [...base.properties, 'Burst Fire']
        })
      }
      if (light && twfEligible && !twoHanded) {
        const twfAugments = getters.hydratedAttackAugments('twf-augment', attackType, 'weapons', weaponType, abilityMod)
        // TODO: will we ever need other augments besides damage?
        const twfDamage = base.damage.map((i) => {
          const modRemoved = { ...i, mod: false }
          if (twfAugments.damage > 0) {
            return {
              ...modRemoved,
              bonus: {
                ...i.bonus,
                value: i.bonus.value + twfAugments.damage
              }
            }
          }
          return modRemoved
        })
        attacks.twf.push({
          ...base,
          damage: twfDamage,
          properties: [...base.properties, '2W-Fight']
        })
      }
      if (dt) {
        const dtAugments = getters.hydratedAttackAugments('dt-augment', attackType, 'weapons', weaponType, abilityMod)
        // TODO: will we ever need other augments besides damage?
        const dtDamage = base.damage.map((i) => {
          const modRemoved = { ...i, mod: false }
          if (dtAugments.damage > 0) {
            return {
              ...modRemoved,
              bonus: {
                ...i.bonus,
                value: i.bonus.value + dtAugments.damage
              }
            }
          }
          return modRemoved
        })
        attacks.dt.push({
          ...base,
          damage: dtDamage,
          properties: [...base.properties, 'Double Tap']
        })
      }
    }
    return attacks
  },
  hydratedAttackAugments: (state, getters, rootState, rootGetters) => (augmentType, attackType, model, modelType, abilityMod = 'str') => {
    const allAttackAugments = rootGetters['character/mechanics/mechanics'].filter(i => i.type === augmentType)
    const matchingAugments = allAttackAugments.filter((i) => {
      if (!i.limits) {
        return true
      }
      return (i.limits.attack ? i.limits.attack === attackType : true) &&
        (i.limits.model ? i.limits.model === model : true) &&
        (i.limits.modelType ? i.limits.modelType === modelType : true)
    })
    const augmentTypes = {
      attack: 0,
      damage: 0,
      dc: 0,
      range: 0,
      notes: []
    }
    for (const at of Object.keys(augmentTypes)) {
      augmentTypes[at] = matchingAugments.filter(i => i.augment === at)
        .reduce((acc, curr) => {
          if (at === 'notes') {
            return acc.concat(curr.value)
          } else if (curr.value === 'abilityMod') {
            // for abilityMod, need to use the best mod for the weapon
            return acc + rootGetters['character/mechanics/mcBonus']({ type: 'mod', value: abilityMod })
          } else {
            return acc + rootGetters['character/mechanics/mcBonus'](curr.value)
          }
        }, augmentTypes[at])
    }
    return augmentTypes
  },
  tentacleBlenderText: (state, getters) => {
    const tentacleBlender = [[1, 4, 'poison'], [1, 4, 'poison'], [1, 4, 'poison'], [1, 4, 'poison'], [1, 4, 'poison'], [1, 4, 'poison']]
    let i = 0
    for (const eqw of getters.equippedWeapons) {
      // TODO: update when there are new melee weapons
      if (eqw.data.type === 'melee') {
        tentacleBlender[i] = [eqw.data.damage.dieCount, eqw.data.damage.dieType, eqw.data.damage.type]
      } else {
        tentacleBlender[i] = [1, 4, 'bludgeoning']
      }
      i++
    }
    const finalDamage = {}
    for (const tbd of tentacleBlender) {
      if (finalDamage[`${tbd[1]}-${tbd[2]}`]) {
        finalDamage[`${tbd[1]}-${tbd[2]}`].dieCount += tbd[0]
      } else {
        finalDamage[`${tbd[1]}-${tbd[2]}`] = {
          dieCount: tbd[0],
          dieType: tbd[1],
          type: tbd[2]
        }
      }
    }
    return Object.values(finalDamage).map(i => `${i.dieCount}d${i.dieType} ${i.type}`).join(' + ')
  },
  armorMechanics: (state, getters) => {
    // custom armor mechanics
    const caMods = getters.equippedArmor.filter(i => i.custom).reduce((a, c) => a.concat(c.mods || []), [])
    const caMechanics = getters.modsList.filter(i => caMods.includes(i.id) && i.type === 'armor').reduce((a, c) => a.concat(c.mechanics || []), [])
    console.log(caMechanics)
    const customArmorMechanics = {
      path: 'customArmor',
      mechanics: caMechanics
    }
    // set bonuses
    return [
      customArmorMechanics
    ]
  }
}

export const mutations = {
}

export const actions = {
  ADD_EQUIPMENT ({ dispatch, getters }, item) {
    const value = getters.equipment.slice()
    value.push(item)
    dispatch('character/UPDATE_CHARACTER', { attr: 'equipment', value }, { root: true })
  },
  TOGGLE_EQUIPPED ({ dispatch, getters }, uuid) {
    const item = getters.equipment.find(i => i.uuid === uuid)
    if (item) {
      dispatch('REPLACE_EQUIPMENT', { uuid, replacement: { ...item, equipped: !item.equipped } })
    }
  },
  REPLACE_EQUIPMENT ({ dispatch, getters }, { uuid, replacement = null }) {
    const index = getters.equipment.findIndex(i => i.uuid === uuid)
    if (index > -1) {
      const items = getters.equipment.slice()
      if (replacement) {
        delete replacement.data
        items.splice(index, 1, replacement)
      } else {
        items.splice(index, 1)
      }
      dispatch('character/UPDATE_CHARACTER', { attr: 'equipment', value: items }, { root: true })
    }
  },
  REMOVE_FROM_SHOULDER_MOUNTS ({ dispatch, rootGetters }, uuid) {
    const sm = JSON.parse(JSON.stringify(rootGetters['character/character'].currentStats.shoulderMounts || []))
    const smIndex = sm.indexOf(uuid)
    if (smIndex > -1) {
      sm.splice(smIndex, 1)
      dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.shoulderMounts', value: sm }, { root: true })
    }
  }
}
