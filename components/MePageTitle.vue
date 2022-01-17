<template>
  <me-tpg v-if="$vuetify.breakpoint.mdAndUp" e="h2" s="h1">
    {{ pageTitle }}
  </me-tpg>
</template>

<script>
export default {
  name: 'MePageTitle',
  props: {
    title: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    pageTitle () {
      return this.title ? this.title : this.$store.getters.pageTitle
    }
  }
}
</script>
