
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
    }
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
        return {
          data: {
            ...weapon,
            ...i.overrides,
            damage: {
              ...weapon.damage,
              ...(i.overrides?.damage || {})
            }
          },
          ...i
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
  armorList: (state, getters, rootState, rootGetters) => {
    return rootGetters.getData('armor')
  },
  gearList: (state, getters, rootState, rootGetters) => {
    return rootGetters.getData('gear')
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
  }
}
