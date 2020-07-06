<template>
  <h2 v-if="$vuetify.breakpoint.mdAndUp" class="display-1">
    {{ title }}
  </h2>
</template>

<script>
export default {
  name: 'MePageTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
