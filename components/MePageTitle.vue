<template>
  <h2 v-if="$vuetify.breakpoint.mdAndUp" class="text-h2">
    {{ pageTitle }}
  </h2>
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
