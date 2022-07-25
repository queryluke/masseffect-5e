import cloneDeep from 'lodash/cloneDeep'

function getDieIncrease (dieType, increase) {
  let dieIncreaseOverflow = 0
  let newDieType = false
  if (increase) {
    const dice = [1, 2, 4, 6, 8, 10, 12]
    const increaseIndex = dice.indexOf(dieType) + increase
    if (increaseIndex >= dice.length) {
      dieIncreaseOverflow = dice.length - 1 - increaseIndex
      newDieType = 12
    }
    newDieType = dice[increaseIndex]
  }
  return { newDieType, dieIncreaseOverflow }
}

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
    rarity: 'common',
    mechanics: []
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
    html: '',
    mechanics: []
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
        const modIds = Object.values(i.mods || {}).filter(i => i)
        const mods = getters.modsList.filter(i => modIds.includes(i.id))
        const modMechanics = mods.reduce((a, c) => a.concat(c.mechanics || []), [])

        const data = {
          ...weapon,
          ...i.overrides,
          damage: {
            ...weapon.damage,
            ...(i.overrides?.damage || {})
          }
        }

        // remove/add props from mods
        let properties = data.properties.slice()
        const adjustProps = modMechanics.filter(i => i.type === 'adjust-weapon-props')
        if (adjustProps.length) {
          const toRemove = adjustProps.reduce((a, c) => a.concat(c.remove || []), [])
          const toAdd = adjustProps.reduce((a, c) => a.concat(c.add || []), [])
          properties = properties.concat(toAdd)
          properties = properties.filter(i => !toRemove.includes(i))
          properties = [...new Set(properties)]
        }

        return {
          data,
          ...i,
          slots: data.properties.includes('two-handed') ? 2 : 1,
          mechanics: modMechanics.filter(i => i.type !== 'adjust-weapon-props'),
          properties
        }
      }).sort((a, b) => a.uuid > b.uuid ? 1 : -1)
  },
  armor: (state, getters) => {
    return getters.equipment
      .filter(i => i.type === 'armor')
      .map((i) => {
        // TEMP for old custom armor
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
      }).sort((a, b) => a.uuid > b.uuid ? 1 : -1)
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
      }).sort((a, b) => a.uuid > b.uuid ? 1 : -1)
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
      const armor = { ...state.customArmorStub, ...i, mechanics: [] }
      if (armor.slots > 0) {
        armor.html = `You may add ${armor.slots} armor mod${armor.slots > 1 ? 's' : ''} to this custom armor piece`
      }
      if (armor.placement === 'chest') {
        armor.mechanics = [
          { type: 'thermal-clip-capacity', value: 10 },
          { type: 'shields', capacity: { type: 'flat', value: 5 }, regen: { type: 'flat', value: 5 } },
          { type: 'medi-gel-capacity', value: 2 }
        ]
      } else if (armor.placement === 'legs') {
        const armArmor = Object.assign({}, armor)
        armor.mechanics = [{ type: 'thermal-clip-capacity', value: 2 }, { type: 'grenade-capacity', value: 2 }]
        armArmor.id = armArmor.id.replace('-legs-', '-arms-')
        armArmor.name = armArmor.name.replace(' Leg ', ' Arm ')
        armArmor.placement = 'arms'
        armArmor.mechanics = [{ type: 'thermal-clip-capacity', value: 2 }, { type: 'medi-gel-capacity', value: 2 }]
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
        // Temp to avoid not showing added old gear
        items.push({
          ...gear,
          notAddable: true
        })
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
          bonusDamage: 0,
          component: 'me-cs-details-weapon',
          properties: [],
          mechanics: []
        }
      })
    ]

    if (getters.equippedWeapons.length) {
      weaponsToProcess.push({
        data: getters.baseGunStrike,
        bonusHit: 0,
        bonusDamage: 0,
        component: 'me-cs-details-weapon',
        properties: [],
        mechanics: []
      })
    }

    // other augments
    const heatIncrease = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'weapon-heat-increase')

    for (const weapon of weaponsToProcess) {
      // assess properties
      const light = weapon.properties.includes('light')
      const dt = weapon.properties.includes('double-tap')
      const bf = weapon.properties.includes('burst-fire')
      const finesse = weapon.properties.includes('finesse')
      const recoil = weapon.properties.includes('recoil')
      const reach = weapon.properties.includes('reach')
      const vented = weapon.properties.includes('vented')
      const twoHanded = weapon.properties.includes('two-handed')
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
      const augmentQualities = {
        weaponType,
        attackType,
        abilityMod,
        specialAttacks: {
          bf,
          dt,
          twf: twfEligible
        }
      }
      const augments = getters.hydratedAttackAugments(augmentQualities, weapon.mechanics || [])

      // WEAPON ATTACK
      const weaponBonusHit = weapon.bonusHit || 0
      const globalBonusHit = globalMods.hit.all + globalMods.hit[attackType]
      const augmentBonusHit = augments.base.hit
      const attack = {
        proficient: ['natural-melee', 'natural-ranged', 'gun-strike'].includes(weapon.data.type) || weaponProfs.includes(weaponType),
        mod: abilityMod,
        bonus: {
          type: 'flat',
          value: weaponBonusHit + globalBonusHit + augmentBonusHit
        },
        crit: augments.base.crit || 20
      }

      // WEAPON DAMAGE
      const weaponBonusDamage = weapon.bonusDamage || 0
      const globalBonusDamage = globalMods.damage.all + globalMods.damage[attackType]
      const augmentBonusDamage = augments.base.damage
      const damageMod = weapon.data.damageModOverride === 'noMod'
        ? false
        : weapon.data.damageModOverride || abilityMod
      // TODO: versatile
      const { newDieType, dieIncreaseOverflow } = getDieIncrease(weapon.data.damage.dieType, augments.base.dieIncrease)
      const damage = [
        {
          ...{ ...weapon.data.damage, dieType: newDieType || weapon.data.damage.dieType },
          mod: damageMod,
          bonus: {
            type: 'flat',
            value: weaponBonusDamage + globalBonusDamage + augmentBonusDamage + dieIncreaseOverflow
          },
          reroll: augments.base.reroll || false,
          addCritDie: augments.base.addCritDie || false
        }
      ]

      // HEAT
      let resource = null
      if (weapon.data.heat) {
        // TODO: add from mods
        const weaponModHeatIncrease = weapon.mechanics.filter(i => i.type === 'weapon-heat-increase')
        const multiplierIncreases = weaponModHeatIncrease.filter(i => i.multiplier)
        const applicableHeatIncreases = [...heatIncrease, ...multiplierIncreases].reduce((a, c) => a + (Math.max(Math.floor(weapon.data.heat * c.multiplier), 1)), 0)
        const staticIncreases = weaponModHeatIncrease.filter(i => i.value).reduce((a, c) => a + c.value, 0)
        resource = {
          displayType: 'heat',
          reset: 'manual',
          vented,
          max: {
            type: 'flat',
            value: weapon.data.heat + applicableHeatIncreases + staticIncreases,
            min: 0
          },
          id: weapon.uuid
        }
      }

      // RANGE
      let shortRange = attackType === 'melee'
        ? reach
          ? 10
          : 5
        : weapon.data.range
      shortRange += augments.base.range
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
        ...getters.weaponPropertiesList.filter(i => weapon.properties.includes(i.id)).map((i) => {
          return {
            type: 'tooltip',
            text: i.name,
            tooltipText: i.html,
            isHtml: true
          }
        }),
        ...(weapon.data.notes || [])
      ]

      // TODO: thrown
      // const thrown = weapon.properties.includes('thrown')
      // TODO: arc
      // const arc = weapon.properties.includes('arc')

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
        data: weapon.data,
        bonus: { type: 'flat', value: 0 },
        component: weapon.component || false,
        moreInfo: weapon.component ? false : { component: 'me-cs-equipment-weapon-side-nav', toDisplay: weapon.uuid }
      }
      attacks.attacks.push(base)

      if (bf) {
        const bfAugments = augments.bf
        const { newDieType, dieIncreaseOverflow } = getDieIncrease(base.damage, bfAugments.dieIncrease)
        const newDamage = base.damage.map((i) => {
          return {
            ...i,
            dieType: newDieType || i.dieType,
            bonus: {
              ...i.bonus,
              value: i.bonus.value + dieIncreaseOverflow + bfAugments.damage
            },
            reroll: bfAugments.reroll || i.reroll
          }
        })
        attacks.bf.push({
          ...base,
          attack: null,
          range: {
            short: base.range.short + bfAugments.range,
            aoe: { type: 'cube', size: 10 }
          },
          damage: newDamage,
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
        const twfAugments = augments.twf
        // TODO: will we ever need other augments besides damage?
        const { newDieType, dieIncreaseOverflow } = getDieIncrease(base.damage, twfAugments.dieIncrease)
        const twfDamage = base.damage.map((i) => {
          const modRemoved = { ...i, mod: false }
          return {
            ...modRemoved,
            dieType: newDieType || i.dieType,
            bonus: {
              ...i.bonus,
              value: i.bonus.value + twfAugments.damage + dieIncreaseOverflow
            },
            reroll: twfAugments.reroll || i.reroll
          }
        })
        attacks.twf.push({
          ...base,
          damage: twfDamage,
          attack: {
            ...base.attack,
            bonus: {
              type: 'flat',
              value: base.attack.bonus.value + twfAugments.hit
            }
          },
          properties: [...base.properties, '2W-Fight']
        })
      }
      if (dt) {
        const dtAugments = augments.dt
        // TODO: will we ever need other augments besides damage?
        const { newDieType, dieIncreaseOverflow } = getDieIncrease(base.damage, dtAugments.dieIncrease)
        const dtDamage = base.damage.map((i) => {
          const modRemoved = { ...i, mod: false }
          if (dtAugments.damage > 0) {
            return {
              ...modRemoved,
              dieType: newDieType || i.dieType,
              bonus: {
                ...i.bonus,
                value: i.bonus.value + dtAugments.damage + dieIncreaseOverflow
              },
              reroll: dtAugments.reroll || i.reroll
            }
          }
          return modRemoved
        })
        attacks.dt.push({
          ...base,
          attack: {
            ...base.attack,
            bonus: {
              type: 'flat',
              value: base.attack.bonus.value + dt.hit
            }
          },
          damage: dtDamage,
          properties: [...base.properties, 'Double Tap']
        })
      }
    }
    return attacks
  },
  hydratedAttackAugments: (state, getters, rootState, rootGetters) => ({ attackType, weaponType, abilityMod, specialAttacks }, additionalMechanics = []) => {
    const allAugments = [...rootGetters['character/mechanics/mechanics'], ...additionalMechanics]
    const matchingAttackAugments = allAugments
      .filter((i) => {
        return i.type === 'attack-augment' &&
          (i.attackLimit?.type ? i.attackLimit.type === attackType : true) &&
          (i.attackLimit?.model ? i.attackLimit.model === 'weapon' : true) &&
          (i.attackLimit?.modelTypes ? i.attackLimit.modelTypes.includes(weaponType) : true)
      })
    const hydrated = {
      base: {
        hit: 0,
        damage: 0,
        dc: 0,
        range: 0,
        reroll: 0,
        crit: 20,
        dieIncrease: 0,
        addCritDie: 0
      }
    }
    for (const specialKey of ['bf', 'twf', 'dt']) {
      hydrated[specialKey] = Object.assign({}, hydrated.base)
    }
    for (const maa of matchingAttackAugments) {
      // get the resulting bonus
      const bonus = maa.abilityMod
        ? rootGetters['character/mechanics/mcBonus']({ type: 'mod', value: abilityMod })
        : rootGetters['character/mechanics/mcBonus'](maa.bonus)
      const reroll = maa.rerollIfLessThan || 0
      const dieIncrease = maa.dieIncrease || 0
      const crit = maa.crit || 20
      const addCritDie = maa.addCritDie || 20
      let applicator = 'base'
      if (maa.attackLimit?.special) {
        const special = maa.attackLimit?.special
        // ignore if this weapon doesn't have that special attack available
        if (!specialAttacks[special]) {
          continue
        }
        // change the applicators
        applicator = special
      }
      for (const at of maa.augmentTypes) {
        if (at === 'damage' && (reroll || dieIncrease)) {
          hydrated[applicator].reroll = Math.max(reroll, hydrated[applicator].reroll)
          hydrated[applicator].dieIncrease += dieIncrease
          hydrated[applicator].addCritDie += addCritDie
        }
        if (at === 'hit') {
          hydrated[applicator].crit = Math.min(crit, hydrated[applicator].crit)
        }
        hydrated[applicator][at] += bonus
      }
    }
    return hydrated
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
  activeSetBonuses: (state, getters) => {
    const bonuses = {}
    for (const armor of getters.equippedArmor) {
      if (armor.data.set) {
        if (bonuses[armor.data.set]) {
          bonuses[armor.data.set].count += 1
          bonuses[armor.data.set].items.push({ uuid: armor.uuid, name: armor.data.name })
        } else {
          bonuses[armor.data.set] = {
            items: [{ uuid: armor.uuid, name: armor.data.name }],
            count: 1
          }
        }
      }
    }
    const setBonuses = getters.setBonusesList
    return Object.entries(bonuses).map((i) => {
      const bonus = setBonuses.find(sb => sb.id === i[0])
      if (!bonus) {
        return null
      }
      const activeBonuses = bonus.bonuses.filter(sbb => sbb.threshold <= i[1].count)
      if (activeBonuses.length === 0) {
        return null
      }
      return {
        name: i[0],
        activeBonuses,
        items: i[1].items,
        max: bonus.max
      }
    }).filter(i => !!i)
  },
  weaponMechanics: (state, getters) => {
    const excludedMechanicTypes = ['attack-augment', 'weapon-heat-increase', 'adjust-weapon-props']
    return getters.equippedWeapons.map((i) => {
      return {
        path: `weapon/${i.data.id}`,
        mechanics: i.mechanics.filter(i => !excludedMechanicTypes.includes(i.type))
      }
    })
  },
  armorMechanics: (state, getters) => {
    // custom armor mechanics
    const caMods = getters.equippedArmor.reduce((a, c) => a.concat(c.mods || []), [])
    const modMechanics = getters.modsList.filter(i => caMods.includes(i.id) && i.type === 'armor').map((i) => {
      return {
        path: `armor/mod/${i.id}`,
        mechanics: i.mechanics
      }
    })
    // regular armor mechanics
    const armorMechanics = getters.equippedArmor.filter(i => !i.custom).map((armor) => {
      return {
        path: `armor/${armor.data.id}`,
        mechanics: armor.data.mechanics.map((mechanic) => {
          let resource = false
          if (mechanic.resource) {
            resource = { ...mechanic.resource, id: armor.uuid }
          }
          return {
            ...mechanic,
            resource,
            moreInfo: {
              toDisplay: armor.uuid,
              component: 'me-cs-equipment-armor-side-nav'
            }
          }
        })
      }
    })
    const setBonusMechanics = getters.activeSetBonuses.reduce((a, c) => {
      const mechanics = c.activeBonuses.map(i => i.mechanics).flat()
      return a.concat(mechanics)
    }, [])
    return [
      ...getters.weaponMechanics,
      ...modMechanics,
      ...armorMechanics,
      { path: 'armorSetBonus', mechanics: setBonusMechanics }
    ]
  },
  equipmentMechanics: (state, getters) => {
    const gearMechanics = getters.gear.filter(i => i.equipped).reduce((a, c) => {
      let toConcat = []
      if (c.data.mechanics) {
        toConcat = c.data.mechanics.map((i) => {
          let resource = false
          if (i.resource) {
            resource = { ...i.resource, id: c.uuid }
          }
          return {
            ...i,
            resource,
            moreInfo: {
              toDisplay: c.uuid,
              component: 'me-cs-equipment-gear-side-nav'
            }
          }
        })
      }
      return a.concat(toConcat)
    }, [])
    return [
      { path: 'gear', mechanics: gearMechanics },
      ...getters.armorMechanics
    ]
  },
  capacities: (state, getters, rootState, rootGetters) => {
    const capacities = {}
    for (const key of ['grenadeSlots', 'medigelSlots', 'thermalClips', 'weaponSlots']) {
      if (!rootGetters['character/character'].options[key]) {
        capacities[key] = 99
      } else {
        const mechanicType = key === 'grenadeSlots'
          ? 'grenade-capacity'
          : key === 'medigelSlots'
            ? 'medi-gel-capacity'
            : 'thermal-clip-capacity'
        capacities[key] = rootGetters['character/mechanics/mechanics'].filter(i => i.type === mechanicType).reduce((a, c) => a + c.value, 0)
      }
    }
    return capacities
  },
  thermalClips: (state, getters) => {
    const thermalClips = getters.gear.filter(i => i.data.id === 'thermal-clip')
    return {
      max: getters.capacities.thermalClips,
      equipped: thermalClips.reduce((a, c) => a + (c.equippedAmount || 0), 0),
      available: thermalClips.reduce((a, c) => a + (c.uses || 0), 0),
      items: thermalClips
    }
  }
}

export const mutations = {
}

export const actions = {
  async ADD_EQUIPMENT ({ dispatch, getters }, item) {
    let newItem = false
    let mods
    const now = new Date().toISOString()
    switch (item.modelType) {
      case 'weapons':
        mods = item.type === 'melee'
          ? { grip: null, strike: null }
          : { magazine: null, body: null, ammo: null, barrel: null }
        newItem = {
          id: item.id,
          uuid: `${item.id}_${now}`,
          type: 'weapon',
          mods,
          overrides: {},
          equipped: false,
          bonusDamage: 0,
          bonusHit: 0
        }
        break
      case 'armor':
        newItem = {
          id: item.id,
          uuid: `${item.id}_${now}`,
          type: 'armor',
          mods: [],
          equipped: false
        }
        break
      case 'gear':
        newItem = {
          id: item.id,
          uuid: `${item.id}_${now}`,
          uses: item.charges || 1,
          notes: '',
          type: 'gear',
          subType: item.type,
          equipped: false,
          equippedAmount: 0
        }
        break
      default:
        break
    }
    if (newItem) {
      const value = getters.equipment.slice()
      if (item.consumable) {
        const existingIndex = value.findIndex(i => i.id === newItem.id)
        if (existingIndex > -1) {
          const adder = { ...value[existingIndex], uses: value[existingIndex].uses + newItem.uses }
          value.splice(existingIndex, 1, adder)
        } else {
          value.push(newItem)
        }
      } else {
        value.push(newItem)
      }
      await dispatch('character/UPDATE_CHARACTER', { attr: 'equipment', value }, { root: true })
      return true
    } else {
      return false
    }
  },
  TOGGLE_EQUIPPED ({ dispatch, getters }, uuid) {
    const item = getters.equipment.find(i => i.uuid === uuid)
    if (item) {
      dispatch('REPLACE_EQUIPMENT', { uuid, replacement: { ...item, equipped: !item.equipped, equippedAmount: 0 } })
    }
    if (getters.thermalClips.equipped > getters.thermalClips.max) {
      dispatch('SET_THERMAL_CLIPS')
    }
  },
  SET_THERMAL_CLIPS ({ dispatch, getters }) {
    const thermalClips = getters.thermalClips
    const max = thermalClips.max
    let runningTotal = 0
    for (const th of thermalClips.items) {
      if (runningTotal === max) {
        continue
      }
      const newTh = {
        ...th
      }
      if (newTh.uses > 0) {
        const amountToEquip = Math.min(th.uses, max - runningTotal)
        newTh.equippedAmount = amountToEquip
        newTh.equipped = true
        runningTotal += amountToEquip
      } else {
        newTh.equipped = false
      }
      dispatch('REPLACE_EQUIPMENT', { uuid: newTh.uuid, replacement: newTh })
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
      dispatch('REMOVE_FROM_SHOULDER_MOUNTS', uuid)
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
  },
  ADD_OMNI_GEL ({ dispatch, getters }, amount) {
    const currentGel = getters.equipment.find(i => i.id === 'omni-gel')
    if (currentGel) {
      const newGel = { ...currentGel, uses: currentGel.uses + amount }
      dispatch('REPLACE_EQUIPMENT', { uuid: currentGel.uuid, replacement: newGel })
    } else {
      const newGel = getters.gearList.find(i => i.id === 'omni-gel')
      newGel.charges = amount
      newGel.modelType = 'gear'
      dispatch('ADD_EQUIPMENT', newGel)
    }
  }
}
