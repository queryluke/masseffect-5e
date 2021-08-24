<template>
  <me-item-page :item="item" :label="$tc('gear_title', 1)">
    <template #header>
      <me-gear-title :item="item" />
    </template>
    <me-gear-info :item="item" />
  </me-item-page>
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_DATA', 'gear')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('gear', this.$route.params.id)
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item.name,
      subTitle: this.$tc('gear_title', 2),
      description: this.$t('meta.info', { name: this.item.name })
    })
  }
}
</script>
