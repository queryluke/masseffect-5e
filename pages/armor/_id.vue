<template>
  <me-item-page :item="item" :type="$tc('armor_title', 1)">
    <template #header>
      <me-armor-title :item="item" />
    </template>
    <me-armor-info :item="item" />
  </me-item-page>
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_DATA', 'armor')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('armor', this.$route.params.id)
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item.name,
      subTitle: this.$tc('armor_title', 2),
      description: this.$t('meta.info', { name: this.item.name })
    })
  }
}
</script>
