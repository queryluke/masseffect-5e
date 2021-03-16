<template>
  <v-list>
    <v-list-item
      v-for="item in pastVersions"
      :key="item.name"
      :href="item.link"
      target="_blank"
    >
      <v-list-item-title>{{ item.name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'MeVersionMenu',
  computed: {
    pastVersions () {
      return this.$store.getters.pastVersions
    }
  }
}
</script>
