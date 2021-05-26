<template>
  <me-item-page :item="item" :label="$t('conditions_title')" />
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_DATA', 'conditions')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('conditions', this.$route.params.id)
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item.name,
      subTitle: this.$t('conditions_title'),
      description: this.$t('meta.info', { name: this.item.name })
    })
  }
}
</script>
