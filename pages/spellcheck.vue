<template lang="pug">
  v-content

    // Armor Mods
    // div(v-for="am in armorMods" v-bind:key="am.id")
      p.title {{ am.name }}
      p {{ am.description }}
      p {{ am.feature }}

    // Armor Sets
    // div(v-for="item in armorSets" v-bind:key="item.id")
      p.title {{ item.name }}
      p {{ item.description }}
      p {{ item.feature }}
      p {{ item.setBonus }}

    // Feats
    // div(v-for="item in feats" v-bind:key="item.id" v-if="item.new")
      p.title {{ item.name }}
      markdown-file(:id="item.id" itemType="feats")

    // Feats
    // div(v-for="item in grenades" v-bind:key="item.id")
      p.title {{ item.name }}
      markdown-file(:id="item.id" itemType="grenades")

    // Class Features
    div(v-for="item in classFeatures" v-bind:key="item.id")
      class-feature(:id="item.id" v-bind:featureLevel="{level: 1}")




</template>

<script>
  import armorMods from '~/static/data/armor_mods.json'
  import armorSets from '~/static/data/armor_sets.json'
  import feats from '~/static/data/feats.json'
  import grenades from '~/static/data/grenades.json'
  import classFeatures from '~/static/data/class_features.json'

  import classFeature from '~/components/class/ClassFeature.vue'


  export default {
    components: {classFeature},
    data () {
      return {
        armorMods,
        armorSets,
        feats,
        grenades,
        classFeatures
      }
    },
    head () {
      return {
        title: `Mass Effect 5e`
      }
    },
    layout: 'print'
  }
</script>
