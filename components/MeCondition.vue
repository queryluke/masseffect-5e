<template>
  <span v-if="!$fetchState.pending">
    <me-standard-dialog :shown="show" @close="show = false">
      <template #title>
        {{ item.name }}
      </template>
      <me-conditions-info :item="item" />
    </me-standard-dialog>
    <a :class="linkCss" @click.stop="show = true">{{ text }}</a>
  </span>
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
    },
    label: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      show: false
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
      return this.label || (this.sub !== '' ? `${this.id}: ${this.sub}` : this.id)
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
