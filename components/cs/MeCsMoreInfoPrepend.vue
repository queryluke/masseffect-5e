<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ toDisplay.name }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'MeCsMoreInfo',
  computed: {
    sideNav () {
      return this.$store.getters['character/navigation/sideNav']
    },
    toDisplay () {
      return this.$store.getters['character/navigation/toDisplay']
    }
  }
}
</script>
