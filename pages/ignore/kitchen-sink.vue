<template>
  <div>
    <me-cs-views-xs v-if="$vuetify.breakpoint.smAndDown" />
    <me-cs-views-lg v-if="$vuetify.breakpoint.mdAndUp" />
  </div>
</template>

<script>
export default {
  layout: 'charactersheet',
  async asyncData ({ store }) {
    store.commit('pageTitle', 'Mass Effect 5e')
    await store.dispatch('character/FETCH_CB_DATA')
    const character = await store.dispatch('character/kitchenSink/LOAD_KITCHEN_SINK')
    return {
      characterNotFound: !character
    }
  }
}
</script>
