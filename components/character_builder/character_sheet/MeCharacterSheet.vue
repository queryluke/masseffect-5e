<template>
  <div>
    <me-character-sheet-views-xs v-if="$vuetify.breakpoint.smAndDown" />
    <me-character-sheet-views-lg v-if="$vuetify.breakpoint.mdAndUp" />
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$store.getters['cb/characters'][this.$route.query.id])
  }
}
</script>
