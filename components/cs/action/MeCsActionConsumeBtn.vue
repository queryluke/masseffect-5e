<template>
  <v-btn
    v-if="item"
    x-small
    depressed
    color="secondary"
    :disabled="viewOnly || !item.equippedAmount"
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
    consume () {
      const equippedAmount = Math.max(0, (this.item.equippedAmount - 1))
      const totalAmount = Math.max(0, (this.item.uses - 1))
      const changeItem = { ...this.item, equippedAmount, uses: totalAmount }
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid, replacement: changeItem })
    }
  }
}
</script>
