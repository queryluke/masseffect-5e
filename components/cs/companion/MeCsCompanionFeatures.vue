<template>
  <v-expansion-panels multiple>
    <v-expansion-panel v-for="feature in features" :key="feature.id">
      <v-expansion-panel-header>
        {{ feature.name }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <me-html :content="feature.html" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'MeCsCompanionFeatures',
  computed: {
    features () {
      const allClassesFeatures = this.$store.getters['character/klasses/klassesFeatures'].reduce((a, c) => a.concat(c), [])
      const companionFeatures = allClassesFeatures.filter((i) => {
        return i.mechanics && i.mechanics.map(j => j.type).includes('companion')
      })
      return companionFeatures
    }
  }
}
</script>
