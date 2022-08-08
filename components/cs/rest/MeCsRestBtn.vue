<template>
  <v-btn v-bind="props" @click.stop="open">
    <slot>
      <span>
        {{ type }} rest
      </span>
    </slot>
  </v-btn>
</template>

<script>
export default {
  name: 'MeCsRestDialog',
  props: {
    props: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    open () {
      this.$store.commit('character/navigation/SET', { key: 'restMenu', value: this.type })
      this.$store.commit('character/navigation/SET', { key: 'mobileMenu', value: false })
      this.$nextTick(() => {
        this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-rest-menu')
      })
    }
  }
}
</script>
