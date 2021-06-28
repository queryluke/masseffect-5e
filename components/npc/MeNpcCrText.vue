<template>
  <span v-if="!$fetchState.pending">
    {{ cr }}
  </span>
</template>

<script>
export default {
  name: 'MeNpcCrText',
  props: {
    crId: {
      type: String,
      default: '00000'
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'npc-stats')
  },
  computed: {
    crs () {
      return this.$store.getters.getData('npc-stats')
    },
    cr () {
      return this.crs.find(i => i.id === this.crId).cr
    }
  }
}
</script>
