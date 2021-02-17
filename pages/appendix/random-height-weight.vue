<template>
  <v-container v-if="!loading">
    <me-page-title />
    <p class="mt-5">
      <strong>Calculating Random Height.</strong> Base Height + Height Modifier Roll
    </p>
    <p>
      <strong>Calculating Random Weight.</strong> Base Weight + (Height Modifier Roll x Weight Modifier Roll)
    </p>
    <me-skeleton-loader :pending="$fetchState.pending" type="table-tbody">
      <v-simple-table>
        <template v-if="imperial" slot="default">
          <thead>
            <tr>
              <th v-for="h in imperialTable" :key="h.key">
                {{ h.display }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in stats" :key="stat.id">
              <td v-for="h in imperialTable" :key="h.key">
                {{ stat[h.key] }}
              </td>
            </tr>
          </tbody>
        </template>
        <template v-else slot="default">
          <thead>
            <tr>
              <th v-for="h in metricTable" :key="h.key">
                {{ h.display }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in stats" :key="stat.id">
              <td v-for="h in metricTable" :key="h.key">
                {{ stat[h.key] }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </me-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', 'Random Height & Weight')
    this.stats = await this.$store.dispatch('FETCH_DATA', 'random-height-weight')
    this.loading = false
  },
  data () {
    return {
      loading: true,
      stats: [],
      metricTable: [
        { key: 'species', display: 'Species' },
        { key: 'baseCm', display: 'Base Height (cm)' },
        { key: 'heightModifierCm', display: 'Height Modifier' },
        { key: 'weightKg', display: 'Base Weight (kg)' },
        { key: 'weightModifierKg', display: 'Weight Modifier' }
      ],
      imperialTable: [
        { key: 'species', display: 'Species' },
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
  head () {
    return {
      title: 'Conditions - Random Height & Weight | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Create random heights and weights for your Mass Effect 5e Operative' }
      ]
    }
  }
}
</script>
