<template>
  <v-btn
    v-if="item"
    x-small
    depressed
    color="secondary"
    :disabled="viewOnly || !equippedAmount"
    @click.stop="consume"
  >
    <small>Use</small>
  </v-btn>
</template>

<script>
export default {
  name: 'MeCsActionConsumeBtn',
  props: {
    id: {
      type: String,
      required: true
    },
    useEquippedAmount: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    item () {
      return this.$store.getters['character/equipment/equipment'].find(i => i.uuid === this.id)
    },
    equippedAmount () {
      return this.useEquippedAmount ? this.item.equippedAmount : this.item.uses
    }
  },
  methods: {
    consume () {
      const equippedAmount = this.useEquippedAmount ? Math.max(0, (this.item.equippedAmount - 1)) : 0
      const totalAmount = Math.max(0, (this.item.uses - 1))
      const changeItem = { ...this.item, equippedAmount, uses: totalAmount }
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid, replacement: changeItem })
    }
  }
}
</script>
