<template>
  <div class="d-flex">
    <div class="px-1">
      Remaining Uses: {{ item.equippedAmount }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCsActionResourceDisplayGearConsumable',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    item () {
      return this.$store.getters['character/equipment/equipment'].find(i => i.uuid === this.id)
    }
  },
  methods: {
    add () {
      if (this.cachedValue + 1 <= this.max) {
        this.cachedValue++
        this.debouncedUpdate()
      }
    },
    remove () {
      if (this.cachedValue - 1 >= 0) {
        this.cachedValue--
        this.debouncedUpdate()
      }
    },
    updateAttr () {
      if (isNaN(parseInt(this.cachedValue, 10))) {
        this.cachedValue = this.current
      }
      if (this.cachedValue >= 0 && this.cachedValue <= this.max) {
        const firstGel = this.equippedGel[0]
        if (!firstGel) {
          this.$store.dispatch('character/equipment/ADD_EQUIPMENT',
            {
              id: 'omni-gel',
              notes: '',
              subType: 'omni_gel',
              type: 'gear',
              uses: this.cachedValue,
              uuid: `omni-gel_${Date.now()}`
            }
          )
        } else {
          this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: firstGel.uuid, replacement: { ...firstGel, uses: this.cachedValue } })
        }
      } else {
        this.cachedValue = this.cachedValue < 0 ? 0 : this.max
      }
    }
  }
}
</script>
