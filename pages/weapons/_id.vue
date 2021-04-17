<template>
  <me-item-page :item="item" :label="$tc('weapon_title', 1)">
    <template #header>
      <me-weapon-title :item="item" />
    </template>
    <me-weapon-info :item="item" />
  </me-item-page>
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_DATA', 'weapons')
  },
  head () {
    return {
      title: `${this.item.name} - Weapons | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Information about ${this.item.name}` }
      ]
    }
  },
  computed: {
    item () {
      return this.$store.getters.getItem('weapons', this.$route.params.id)
    }
  },
  created () {
    this.$store.commit('pageTitle', this.item.name)
  }
}
</script>
