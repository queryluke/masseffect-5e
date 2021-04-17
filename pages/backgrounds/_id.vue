<template>
  <me-item-page :item="item" :label="$tc('background_title', 1)" />
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_DATA', 'backgrounds')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('backgrounds', this.$route.params.id)
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item.name,
      subTitle: this.$tc('background_title', 2),
      description: this.$t('meta.info', { name: this.item.name })
    })
  }
}
</script>
