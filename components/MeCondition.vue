<template>
  <me-more-info-dialog
    v-if="!$fetchState.pending"
    :title="item.name"
    :text="text"
    :content="item.html"
    :link-css="linkCss"
  />
</template>

<script>
export default {
  name: 'MeCondition',
  props: {
    id: {
      type: String,
      default: ''
    },
    sub: {
      type: String,
      default: ''
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'conditions')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('conditions', this.id)
    },
    text () {
      return this.sub !== '' ? `${this.id}: ${this.sub}` : this.id
    },
    primeTypeText () {
      return this.$store.getters['config/primeTypeText']
    },
    linkCss () {
      const mode = this.$vuetify.theme.dark ? 'dark' : 'light'
      return this.id === 'primed' ? this.primeTypeText[mode][this.sub] : ''
    }
  }
}
</script>
