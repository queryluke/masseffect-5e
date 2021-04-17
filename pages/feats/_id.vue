<template>
  <me-item-page :item="item" :label="$tc('feat_title')" />
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_DATA', 'feats')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('feats', this.$route.params.id)
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item.name,
      subTitle: this.$tc('feat_title', 2),
      description: this.$t('meta.info', { name: this.item.name })
    })
  }
}
</script>
