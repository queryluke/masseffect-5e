<template>
  <me-item-page :item="item" :type="$tc('power_title', 1)">
    <template #header>
      <me-item-title
        :title="item.name"
        avatar
        :avatar-src="require(`~/assets/images/powers/${item.type}.svg`)"
      />
    </template>
    <me-power-info :item="item" />
  </me-item-page>
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_DATA', 'powers')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('powers', this.$route.params.id)
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item.name,
      subTitle: this.$tc('power_title', 2),
      description: this.$t('meta.info', { name: this.item.name })
    })
  }
}
</script>
