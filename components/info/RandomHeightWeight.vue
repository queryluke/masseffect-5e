<template lang="pug">
  div.mt-10
    p #[strong Calculating Random Height]: Base Height + Height Modifier Roll
    p #[strong Calculating Random Weight]: Base Weight + (Height Modifier Roll x Weight Modifier Roll)
    div(v-if="imperial")
      p.headline Imperial
      v-simple-table
        thead
          tr
            th(v-for="h in imperialTable" :key="h.key") {{ h.display }}
        tbody
          tr(v-for="stat in stats" :key="stat.id")
            td(v-for="h in imperialTable" :key="h.key") {{ stat[h.key] }}
    div(v-else)
      p.headline Metric
      v-simple-table
        thead
          tr
            th(v-for="h in metricTable" :key="h.key") {{ h.display }}
        tbody
          tr(v-for="stat in stats" :key="stat.id")
            td(v-for="h in metricTable" :key="h.key") {{ stat[h.key] }}
</template>

<script>
export default {
  data () {
    return {
      stats: [],
      metricTable: [
        { key: 'race', display: 'Race' },
        { key: 'baseCm', display: 'Base Height (cm)' },
        { key: 'heightModifierCm', display: 'Height Modifier' },
        { key: 'weightKg', display: 'Base Weight (kg)' },
        { key: 'weightModifierKg', display: 'Weight Modifier' }
      ],
      imperialTable: [
        { key: 'race', display: 'Race' },
        { key: 'base', display: 'Base Height' },
        { key: 'heightModifier', display: 'Height Modifier' },
        { key: 'baseWeight', display: 'Base Weight' },
        { key: 'weightModifier', display: 'Weight Modifier' }
      ]
    }
  },
  computed: {
    imperial () {
      return this.$store.getters['user/imperial']
    }
  },
  async created () {
    this.stats = await this.$store.dispatch('FETCH_DATA', 'random-height-weight')
  }
}
</script>
