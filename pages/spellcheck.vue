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

    // Class Features
    // div(v-for="item in classFeatures" v-bind:key="item.id")
      class-feature(:id="item.id" v-bind:featureLevel="{level: 1}")

    // Feats
    // div(v-for="item in feats" v-bind:key="item.id" v-if="item.new")
      p.title {{ item.name }}
      markdown-file(:id="item.id" itemType="feats")

    // Grenades
    // div(v-for="item in grenades" v-bind:key="item.id")
      p.title {{ item.name }}
      markdown-file(:id="item.id" itemType="grenades")

    // Tools
    // div(v-for="item in tools" v-bind:key="item.id")
      p.title {{ item.name }}
      markdown-file(:id="item.id" itemType="tools")

    // Weapon Mods
    // div(v-for="item in weaponMods" v-bind:key="item.id")
      p.title {{ item.name }}
      p {{ item.description }}
      p {{ item.feature }}

    // Weapons
    div(v-for="item in weapons" v-bind:key="item.id")
      p.title {{ item.name }}
      p {{ item.notes }}
      p {{ item.tags }}


</template>

<script>
  import armorMods from '~/static/data/armor_mods.json'
  import armorSets from '~/static/data/armor_sets.json'
  import classFeatures from '~/static/data/class_features.json'
  import feats from '~/static/data/feats.json'
  import grenades from '~/static/data/grenades.json'
  import tools from '~/static/data/tools.json'
  import weaponMods from '~/static/data/weapon_mods.json'
  import weapons from '~/static/data/weapons.json'

  import classFeature from '~/components/class/ClassFeature.vue'


  export default {
    components: {classFeature},
    data () {
      return {
        armorMods,
        armorSets,
        classFeatures,
        feats,
        grenades,
        tools,
        weaponMods,
        weapons
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
