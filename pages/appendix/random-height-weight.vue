<template>
  <v-container>
    <me-page-title />
    <p class="mt-5">
      <strong>{{ $t('random_hw_titles.calc_height_title') }}</strong> {{ $t('random_hw_titles.calc_height') }}
    </p>
    <p>
      <strong>{{ $t('random_hw_titles.calc_weight_title') }}</strong> {{ $t('random_hw_titles.calc_weight') }}
    </p>
    <me-skeleton-loader :pending="$fetchState.pending" type="table-tbody">
      <v-simple-table>
        <template slot="default">
          <thead>
            <tr>
              <th v-for="(h, index) in headers" :key="index">
                {{ h }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="sp in species">
              <tr :key="sp.id">
                <td>
                  {{ sp.name }}
                </td>
                <td>
                  {{ displayBase(sp, 'height') }}
                </td>
                <td>
                  {{ displayMod(sp, 'height') }}
                </td>
                <td>
                  {{ displayBase(sp, 'weight') }}
                </td>
                <td>
                  {{ displayMod(sp, 'weight') }}
                </td>
              </tr>
              <tr v-if="sp.id === 'hanar'" :key="`${sp.id}Length`">
                <td class="font-italic">
                  -- {{ $t('random_hw_titles.length') }}
                </td>
                <td>
                  {{ displayBase(sp, 'length') }}
                </td>
                <td>
                  {{ displayMod(sp, 'length') }}
                </td>
                <td />
                <td />
              </tr>
            </template>
          </tbody>
        </template>
      </v-simple-table>
    </me-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$t('random_height_weight_title'),
      subtitle: this.$t('appendix_title'),
      description: this.$t('meta.random_height_weight')
    })
    await this.$store.dispatch('FETCH_DATA', 'species')
  },
  head () {
    return {
      title: 'Conditions - Random Height & Weight | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Create random heights and weights for your Mass Effect 5e Operative' }
      ]
    }
  },
  computed: {
    species () {
      return this.$store.getters.getData('species').filter(i => i.type !== 'subspecies' && i.type !== 'variant')
    },
    headers () {
      return [
        this.$tc('species_title', 1),
        this.$t('random_hw_titles.base_height'),
        this.$t('random_hw_titles.height_mod'),
        this.$t('random_hw_titles.base_weight'),
        this.$t('random_hw_titles.weight_mod')
      ]
    },
    imperial () {
      return this.$store.getters['user/imperial']
    },
    impOrMet () {
      return this.imperial ? 'imperial' : 'metric'
    }
  },
  methods: {
    displayBase (species, which) {
      console.log(species)
      const base = species.randomDimensions[which].base[this.impOrMet]
      if (which === 'height' || which === 'length') {
        if (this.imperial) {
          const rem = base % 12
          const b = Math.floor(base / 12)
          return `${b}'${rem}"`
        } else {
          return `${base} ${this.$t('measurements.cm.abbr')}`
        }
      } else {
        return this.imperial
          ? this.$tc('measurements.lb.abbr', base)
          : this.$tc('measurements.kg.abbr', base)
      }
    },
    displayMod (species, which) {
      const { dieCount, dieType, divisor = null } = species.randomDimensions[which].mod[this.impOrMet]
      if (dieCount === 0) {
        return '-'
      }
      if (!dieType) {
        return dieCount
      }
      const text = this.$t('dice', { dieType, dieCount })
      return divisor ? `${text} / ${divisor}` : text
    }
  }
}
</script>
