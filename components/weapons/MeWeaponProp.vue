<template>
  <v-skeleton-loader
    :loading="$fetchState.pending"
    type="text"
    class="d-inline-block"
    width="75"
  >
    <me-more-info-dialog
      :title="item.name"
      :content="item.html"
    />
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'MeWeaponProp',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'weapon-properties')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('weapon-properties', this.id)
    }
  }
}
</script>
