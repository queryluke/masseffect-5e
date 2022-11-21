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
        console.log(i)
        // console.log(i.mechanics)
        // console.log(i.mechanics.map(j => j.type))
        return i.mechanics && i.mechanics.map(j => j.type).includes('companion')
      })
      console.log(companionFeatures)
      return companionFeatures
    }
  }
}
</script>
