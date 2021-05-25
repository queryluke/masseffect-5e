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
      link-css="text-decoration-underline font-italic"
      :text="text"
    />
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'MeGrenadeDialog',
  props: {
    id: {
      type: String,
      required: true
    },
    mark: {
      type: [String, Boolean],
      default: false
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'gear')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('gear', this.id)
    },
    markText () {
      return this.mark ? ` ${this.$t(`marks.${this.mark}`)}` : ''
    },
    text () {
      return `${this.item.name.toLowerCase()}${this.markText}`
    }
  }
}
</script>
