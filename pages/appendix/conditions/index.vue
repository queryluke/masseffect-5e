<template>
  <v-container>
    <me-page-title />
    <p>
      All of the conditions which can affect a character or object are listed below. Note that there are a few new
      conditions in this system in order to maintain consistency with the Mass Effect setting: Frozen, Lifted, Primed
    </p>
    <me-skeleton-loader :pending="$fetchState.pending" type="expansionList">
      <me-expansion-list
        :items="items"
        :headers="headers"
        type="appendix/conditions"
        :bookmarkable="false"
      >
        <template #body="{ item }">
          <me-conditions-info :item="item" />
        </template>
      </me-expansion-list>
    </me-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { label: 'Name', key: 'name' }
      ]
    }
  },
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$t('conditions_title'),
      subtitle: this.$t('appendix_title'),
      description: this.$t('meta.conditions')
    })
    await this.$store.dispatch('FETCH_DATA', 'conditions')
  },
  computed: {
    items () {
      return this.$store.getters.getData('conditions')
    }
  }
}
</script>
