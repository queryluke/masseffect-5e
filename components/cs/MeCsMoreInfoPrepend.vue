<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ name }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'MeCsMoreInfo',
  computed: {
    toDisplay () {
      return this.$store.getters['character/navigation/toDisplay']
    },
    name () {
      let model = false
      if (this.toDisplay.moreInfo?.model) {
        model = this.$store.getters.getItem(this.toDisplay.moreInfo.model, this.toDisplay.moreInfo.id)
      }
      return model?.name || this.toDisplay.name
    }
  }
}
</script>
