<template>
  <v-list-item :key="`${item.modelType}-${item.id}`" dense>
    <v-list-item-content>
      <v-list-item-title>
        {{ item.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <me-cs-equipment-subtitle :item="item" />
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn
        small
        outlined
        :color="added ? 'success' : 'primary'"
        :loading="adding"
        @click="addEquipment()"
      >
        {{ added ? 'Added' : 'Add' }}
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      adding: false,
      added: false
    }
  },
  computed: {
    subtitle () {
      switch (this.item.modelType) {
        case 'weapons':
          return this.$t('weapon_item_subtitle', {
            rarity: this.$t(`rarities.${this.item.rarity}`),
            weaponType: this.$tc(`weapon_types.${this.item.type}`, 1)
          })
        case 'armor':
          return this.$t('armor_item_subtitle', {
            rarity: this.$t(`rarities.${this.item.rarity}`),
            armorType: this.$t(`armor_types.${this.item.type}_armor`),
            placement: this.$t(`armor_placements.${this.item.placement}`)
          })
        case 'gear':
          return `${this.item.rarity} ${this.$t(`gear_types.${this.item.type}`)}`
        default:
          return ''
      }
    }
  },
  methods: {
    addEquipment () {
      let newItem = false
      let mods
      const now = new Date().toISOString()
      switch (this.item.modelType) {
        case 'weapons':
          mods = this.item.type === 'melee'
            ? { grip: null, strike: null }
            : { magazine: null, body: null, ammo: null, barrel: null }
          newItem = {
            id: this.item.id,
            uuid: `${this.item.id}_${now}`,
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
            id: this.item.id,
            uuid: `${this.item.id}_${now}`,
            type: 'armor',
            mods: [],
            equipped: false
          }
          break
        case 'gear':
          newItem = {
            id: this.item.id,
            uuid: `${this.item.id}_${now}`,
            uses: 1,
            notes: '',
            type: 'gear',
            subType: this.item.type
          }
          break
        default:
          break
      }
      if (newItem) {
        this.adding = true
        // this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'equipment', value: [] })
        this.$store.dispatch('character/equipment/ADD_EQUIPMENT', newItem)
        this.adding = false
        this.added = true
        setTimeout(() => {
          this.added = false
        }, 1000)
      }
    }
  }
}
</script>
