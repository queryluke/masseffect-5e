<template>
  <me-item-page :item="item" type="tool-prof" />
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_DATA', 'tool-profs')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('tool-profs', this.$route.params.id)
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item.name,
      subTitle: this.$t('tool_profs_title'),
      description: this.$t('meta.info', { name: this.item.name })
    })
  }
}
</script>
