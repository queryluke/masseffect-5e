<template>
  <v-skeleton-loader
    :loading="$fetchState.pending"
    type="text"
    class="d-inline-block"
    width="75"
  >
    <me-more-info-dialog
      :title="item.name"
      link-css="text-decoration-underline font-italic"
      :text="text"
    >
      <me-power-info :item="item" :hide-advancements="hideAdvancements" />
    </me-more-info-dialog>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'MePowerDialog',
  props: {
    id: {
      type: String,
      required: true
    },
    hideAdvancements: {
      type: Boolean,
      default: false
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'powers')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('powers', this.id)
    },
    text () {
      return this.item.name.toLowerCase()
    }
  },
  methods: {
    label (key) {
      return this.$t('markdown_label', { label: this.$t(key) })
    },
    stat (key, value) {
      return `<p class="my-0"><strong>${this.label(key)}</strong> ${value}</p>`
    }
  }
}
</script>
