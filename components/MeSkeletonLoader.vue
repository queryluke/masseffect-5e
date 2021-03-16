<template>
  <v-skeleton-loader :loading="pending" transition="fade-transition" :type="typeObject.type" :types="typeObject.types">
    <slot />
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'MeSkeletonLoader',
  props: {
    pending: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'item'
    }
  },
  computed: {
    typeObject () {
      const configTypes = this.$store.getters['config/sklTypes']
      return configTypes[this.type] || { type: this.type, types: {} }
    }
  }
}
</script>
