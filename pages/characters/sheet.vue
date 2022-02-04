<template>
  <div>
    <me-cs-not-ready v-if="!characterReady" />
    <div v-else>
      <me-cs-views-xs v-if="$vuetify.breakpoint.smAndDown" />
      <me-cs-views-lg v-if="$vuetify.breakpoint.mdAndUp" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'charactersheet',
  async asyncData ({ store, redirect, route }) {
    if (!route.query.id) {
      redirect('/characters')
    }
    store.commit('pageTitle', 'Mass Effect 5e')
    await store.dispatch('character/FETCH_CB_DATA')
    const character = await store.dispatch('character/LOAD_CHARACTER', route.query.id)
    if (!character) {
      await redirect('/characters')
    }
  },
  computed: {
    characterReady () {
      return this.$store.getters['character/characterReady']
    }
  }
}
</script>
