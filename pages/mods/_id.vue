<template>
  <me-item-page :item="item" :label="$tc('mod_title', 1)">
    <template #header>
      <me-mod-title :item="item" />
    </template>
    <me-mod-info :item="item" />
  </me-item-page>
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_DATA', 'mods')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('mods', this.$route.params.id)
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item.name,
      subTitle: this.$tc('mod_title', 2),
      description: this.$t('meta.info', { name: this.item.name })
    })
  }
}
</script>
