<template lang="pug">
  div
    div(v-if="speciesData").text-left
      div(:class="$style.topSection")
        div(:class="$style.bioBlock").block
          h2 {{ speciesData.name }}
          hr

          h4 Visual Characteristics
          table(:class="$style.bioTable").table
            tbody
              tr(v-if="speciesData.skinColor")
                td #[strong #[em Skin Color] ]
                td {{ speciesData.skinColor }}
              tr(v-if="speciesData.hairColor")
                td #[strong #[em Hair Color] ]
                td {{ speciesData.hairColor }}
              tr(v-if="speciesData.eyeColor")
                td #[strong #[em Eye Color] ]
                td {{ speciesData.eyeColor }}
              tr(v-if="speciesData.colorScheme")
                td #[strong #[em Color Scheme] ]
                td {{ speciesData.colorScheme }}
              tr(v-if="speciesData.distinctions")
                td #[strong #[em Distinctions] ]
                td {{ speciesData.distinctions }}
          hr

          h4 Physical Characteristics
          table(:class="$style.bioTable").table
            tbody
              tr
                td #[strong #[em Height] ]
                td {{ height.val }}
                td {{ height.mod }}
              tr
                td #[strong #[em Weight] ]
                td {{ weight.val }}
                td {{ weight.mod }}
              tr(v-if="speciesData.bioticPotential")
                td #[strong #[em Biotic Potential] ]
                td {{ speciesData.bioticPotential }}
          hr

          h4 Sociocultural Characteristics
          table(:class="$style.bioTable").table
            tbody
              tr(v-if="speciesData.galaxy")
                td #[strong #[em Galaxy] ]
                td {{ $t(`galaxies.${speciesData.galaxy}`) }}
              tr(v-if="speciesData.homeworld")
                td #[strong #[em Homeworld] ]
                td {{ speciesData.homeworld }}
              tr(v-if="speciesData.manufacturer")
                td #[strong #[em Manufacturer] ]
                td {{ speciesData.manufacturer}}
              tr(v-if="speciesData.language")
                td #[strong #[em Language] ]
                td {{ speciesData.language }}
        div
          small
            i {{speciesData.snippet}}

</template>

<script>
export default {
  props: {
    speciesData: {
      type: Object,
      required: true
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

<style module lang="scss">
  .topSection {
    display: flex;
    flex-wrap: wrap;

    .bioBlock {
      width: 100%;
      padding: 15px 10px;
      margin: 15px;
      background-color: inherit;
      border-top: 0.2em solid #FF6600;
      border-bottom: 0.2em solid #FF6600;
      border-left: 0;
      border-right: 0;
      box-shadow: 0 0 1.5em rgba(#FF6600, 0.5);
      overflow-x: auto;

      hr {
          visibility: visible;
          background-color: #FF6600;
          height: 5px;
          border: none;
      }

      .bioTable {
        width: 100%;
        font-size: 12px;
      }
    }
  }
</style>
