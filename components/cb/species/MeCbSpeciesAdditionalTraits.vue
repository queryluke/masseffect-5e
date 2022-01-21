<template>
  <v-card max-width="800px" flat class="mx-auto mt-3">
    <v-card-title>
      <me-tpg s="h5">
        Additional Traits & Characteristics
      </me-tpg>
    </v-card-title>
    <v-card-text>
      <me-species-trait v-if="speciesData.age" :label="$t('age_title')">
        {{ speciesData.age }}
      </me-species-trait>
      <me-species-trait v-if="speciesData.alignment" :label="$t('alignment_title')">
        {{ speciesData.alignment }}
      </me-species-trait>
      <me-species-trait v-if="speciesData.size" :label="$t('size_title')">
        {{ speciesData.size }}
      </me-species-trait>
      <me-species-speed :item="speciesData" />
      <me-species-trait label="Visual Characteristics">
        <v-simple-table>
          <tbody>
            <template v-for="vis of visualProps">
              <tr v-if="speciesData[vis.key]" :key="vis.key">
                <td class="font-weight-bold">
                  {{ vis.label }}
                </td>
                <td>{{ speciesData[vis.key] }}</td>
              </tr>
            </template>
          </tbody>
        </v-simple-table>
      </me-species-trait>
      <me-species-trait label="Physical Characteristics">
        <v-simple-table>
          <thead>
            <tr>
              <td>Attribute</td>
              <td>Base</td>
              <td>Mod</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-weight-bold">
                Height
              </td>
              <td>{{ height.val }}</td>
              <td>{{ height.mod }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                Weight
              </td>
              <td>{{ weight.val }}</td>
              <td>{{ weight.mod }}</td>
            </tr>
            <tr v-if="speciesData.bioticPotential">
              <td>Biotic Potential</td>
              <td colspan="2">
                {{ speciesData.bioticPotential }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </me-species-trait>
      <me-species-trait label="Visual Characteristics">
        <v-simple-table>
          <tbody>
            <template v-for="vis of socioProps">
              <tr v-if="speciesData[vis.key]" :key="vis.key">
                <td class="font-weight-bold">
                  {{ vis.label }}
                </td>
                <td>{{ vis.key === 'galaxy' ? $t(`galaxies.${speciesData[vis.key]}`) : speciesData[vis.key] }}</td>
              </tr>
            </template>
          </tbody>
        </v-simple-table>
      </me-species-trait>
    </v-card-text>
  </v-card>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  name: 'MeCbSpeciesAdditionalTraits',
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      search: null,
      changeSpecies: false,
      visualProps: [
        { label: 'Skin Color', key: 'skinColor' },
        { label: 'Hair Color', key: 'hairColor' },
        { label: 'Eye Color', key: 'eyeColor' },
        { label: 'Color Scheme', key: 'colorScheme' },
        { label: 'Distinctions', key: 'distinctions' }
      ],
      socioProps: [
        { label: 'Galaxy', key: 'galaxy' },
        { label: 'Homeworld', key: 'homeworld' },
        { label: 'Manufacturer', key: 'manufacturer' },
        { label: 'Language', key: 'language' }
      ]
    }
  },
  computed: {
    heightWeightData () {
      return this.speciesData.randomDimensions
    },
    unitSystem () {
      return this.$store.getters['user/imperial'] ? 'imperial' : 'metric'
    },
    weight () {
      const base = this.heightWeightData.weight.base[this.unitSystem]
      const mod = this.heightWeightData.weight.mod[this.unitSystem]
      const units = this.unitSystem === 'imperial' ? ' lbs' : ' kg'
      return {
        val: base + units,
        mod: mod.dieCount + 'd' + mod.dieType + (mod.divisor ? ' / ' + mod.divisor : '') + units
      }
    },
    height () {
      const base = this.heightWeightData.height.base[this.unitSystem]
      const mod = this.heightWeightData.height.mod[this.unitSystem]
      const units = this.unitSystem === 'imperial' ? '"' : ' cm'
      return {
        val: base + units,
        mod: mod.dieCount + 'd' + mod.dieType + (mod.divisor ? ' / ' + mod.divisor : '') + units
      }
    }
  }
}
</script>
