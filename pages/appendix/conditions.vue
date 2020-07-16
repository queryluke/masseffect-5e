<template>
  <v-container>
    <me-page-title />
    <p>
      All of the conditions which can affect a character or object are listed below. Note that there are a few new
      conditions in this system in order to maintain consistency with the Mass Effect setting: Frozen, Lifted, Primed
    </p>
    <me-expansion-list
      :items="items"
      :headers="headers"
    />
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', 'Conditions')
    this.items = await this.$store.dispatch('FETCH_DATA', 'conditions')
  },
  data () {
    return {
      items: [],
      headers: [
        { label: 'Name', key: 'name' }
      ]
    }
  },
  head () {
    return {
      title: 'Conditions - Appendix | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'There are new conditions in Mass Effect 5e that add variety to combat.' }
      ]
    }
  }
}
</script>
