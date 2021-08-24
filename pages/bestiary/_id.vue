<template>
  <me-item-page :item="item" type="bestiary">
    <template #header>
      <me-npc-title :item="item" />
    </template>
    <me-npc-stat-block :stats="item" />
  </me-item-page>
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_LOTS', ['bestiary', 'npc-stats'])
  },
  computed: {
    item () {
      return this.$store.getters.getItem('bestiary', this.$route.params.id)
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item.name,
      subTitle: this.$tc('bestiary_title', 2),
      description: this.$t('meta.info', { name: this.item.name })
    })
  }
}
</script>
