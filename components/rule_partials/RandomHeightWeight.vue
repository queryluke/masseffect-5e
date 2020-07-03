<template lang="pug">
  div
    p #[strong Calculating Random Height]: Base Height + Height Modifier Roll
    p #[strong Calculating Random Weight]: Base Weight + (Height Modifier Roll x Weight Modifier Roll)
    div(v-for="table in tables" v-bind:key="table.name").mb-4
      p.headline {{ table.name }}
      table.table
        thead
          tr
            th(v-for="h in table.headers" v-bind:key="h.key") {{ h.display }}
        tbody
          tr(v-for="stat in stats" v-bind:key="stat.id")
            td(v-for="h in table.headers" v-bind:key="h.key" v-bind:data-table-key="h.display") {{ stat[h.key] }}
      div(v-if="table.name === 'Metric'").hr
</template>

<script>
import stats from '~/static/data/random_height_weight'
export default {
  data () {
    return {
      stats,
      tables: [
        {
          name: 'Metric',
          headers: [
            { key: 'race', display: 'Race' },
            { key: 'baseCm', display: 'Base Height (cm)' },
            { key: 'heightModifierCm', display: 'Height Modifier' },
            { key: 'weightKg', display: 'Base Weight (kg)' },
            { key: 'weightModifierKg', display: 'Weight Modifier' }
          ]
        },
        {
          name: 'Imperial',
          headers: [
            { key: 'race', display: 'Race' },
            { key: 'base', display: 'Base Height' },
            { key: 'heightModifier', display: 'Height Modifier' },
            { key: 'baseWeight', display: 'Base Weight' },
            { key: 'weightModifier', display: 'Weight Modifier' }
          ]
        }
      ]
    }
  }
}
</script>
