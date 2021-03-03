<template>
  <me-expansion-list
    :headers="headers"
    :items="items"
    type="bestiary"
  >
    <template v-slot:header.expanded="{ item }">
      <me-npc-title :item="item" />
    </template>
    <template v-slot:body="{ item }">
      <me-stat-block :stats="item" />
    </template>
  </me-expansion-list>
</template>

<script>
export default {
  name: 'MeNpcList',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    bookmarkable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    headers () {
      return this.$store.getters['config/npcHeaders']
    }
  }
}
</script>
