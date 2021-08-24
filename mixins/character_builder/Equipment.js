export const Equipment = {
  computed: {
    csEquipment: {
      get () {
        return this.character.equipment
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'equipment', value })
      }
    },
    csWeapons () {
      return this.character.equipment.filter(i => i.type === 'weapon')
    },
    csGear () {
      return this.character.equipment.filter(i => i.type === 'gear')
    },
    csArmor () {
      return this.character.equipment.filter(i => i.type === 'armor')
    }
  },
  methods: {
    addEquipment (type, item) {
      let newItem = false
      let mods, custom
      const now = new Date().toISOString()
      switch (type) {
        case 'weapons':
          mods = item.type === 'melee'
            ? { grip: null, strike: null }
            : { magazine: null, body: null, ammo: null, barrel: null }
          newItem = {
            id: item.id,
            uuid: `${item.id}_${now}`,
            type: 'weapon',
            mods,
            equipped: false,
            heat: 0,
            bonusDamage: 0,
            bonusHit: 0,
            stats: {
              heat: item.heat,
              range: item.range,
              damage: item.damage,
              properties: item.properties
            }
          }
          break
        case 'armor':
          custom = item.custom ? { name: item.name, notes: item.notes } : false
          newItem = { id: item.id, uuid: `${item.id}_${now}`, type: 'armor', mods: [], stats: { placement: item.placement, type: item.type }, equipped: false, custom }
          break
        case 'gear':
          newItem = { id: item.id, uuid: `${item.id}_${now}`, uses: 1, notes: '', type: 'gear', subType: item.type }
          break
        default:
          break
      }
      if (newItem) {
        this.csEquipment = [...this.csEquipment, newItem]
      }
    },
    removeEquipment (type, uuid, replacement = null) {
      const index = this.csEquipment.findIndex(i => i.uuid === uuid && i.type === type)
      if (index > -1) {
        const items = [...this.csEquipment]
        if (replacement) {
          items.splice(index, 1, replacement)
        } else {
          items.splice(index, 1)
        }
        this.csEquipment = items
      }
    },
    equipmentData (type, id) {
      const lookupType = type === 'weapon' ? 'weapons' : type
      return this[lookupType].find(i => i.id === id)
    }
  }

}
