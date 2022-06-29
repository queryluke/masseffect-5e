<template>
  <v-btn
    outlined
    :color="added ? 'success' : 'primary'"
    :loading="adding"
    x-small
    @click.stop="addItem()"
  >
    {{ added ? 'Added' : 'Add' }}
  </v-btn>
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
  methods: {
    addItem () {
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
            uses: this.item.charges || 1,
            notes: '',
            type: 'gear',
            subType: this.item.type,
            equipped: false,
            equippedAmount: 0
          }
          break
        default:
          break
      }
      if (newItem) {
        this.adding = true
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
