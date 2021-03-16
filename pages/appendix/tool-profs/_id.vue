<template>
  <me-item-page :pending="$fetchState.pending" :item="item" type="tool-prof" />
</template>

<script>
export default {
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'tool-profs', id: this.$route.params.id })
    this.$store.commit('pageTitle', 'Tool Proficiencies')
  },
  data () {
    return {
      item: {}
    }
  },
  head () {
    return {
      title: `${this.item.name} - Tool Proficiencies | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Information about the ${this.item.name} tool proficiency` }
      ]
    }
  }
}
</script>
