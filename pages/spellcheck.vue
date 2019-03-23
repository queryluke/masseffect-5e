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

    // Conditions
    // div(v-for="item in conditions" v-bind:key="item.id")
      p.title {{ item.name }}
      markdown-file(:id="item.id" itemType="conditions")

    // Feats
    // div(v-for="item in feats" v-bind:key="item.id" v-if="item.new")
      p.title {{ item.name }}
      markdown-file(:id="item.id" itemType="feats")

    // Grenades
    // div(v-for="item in grenades" v-bind:key="item.id")
      p.title {{ item.name }}
      markdown-file(:id="item.id" itemType="grenades")

    // Programs
    div(v-for="item in programs" v-bind:key="item.id")
      p.title {{ item.name }}
      markdown-file(:id="item.id" itemType="programs")

    // Spells
    // div(v-for="item in spells" v-bind:key="item.id")
      p.title {{ item.name }}
      markdown-file(:id="item.id" itemType="spells")
      div(v-for="(option, i) in item.advancementOptions" v-bind:key="i")
        p {{ option.name }}
        p {{ option.description }}

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
    // div(v-for="item in weapons" v-bind:key="item.id")
      p.title {{ item.name }}
      p {{ item.notes }}
      p {{ item.tags }}

    // Vehicles
    // div(v-for="item in vehicles" v-bind:key="item.id")
      vehicle-info(:item="item")



</template>

<script>
  import armorMods from '~/static/data/armor_mods.json'
  import armorSets from '~/static/data/armor_sets.json'
  import classFeatures from '~/static/data/class_features.json'
  import conditions from '~/static/data/conditions.json'
  import feats from '~/static/data/feats.json'
  import grenades from '~/static/data/grenades.json'
  import programs from '~/static/data/programs.json'
  import spells from '~/static/data/spells.json'
  import tools from '~/static/data/tools.json'
  import weaponMods from '~/static/data/weapon_mods.json'
  import weapons from '~/static/data/weapons.json'
  import vehicles from '~/static/data/vehicles.json'

  import classFeature from '~/components/class/ClassFeature.vue'
  import vehicleInfo from '~/components/vehicle/VehicleInfo.vue'


  export default {
    components: {classFeature, vehicleInfo},
    data () {
      return {
        armorMods,
        armorSets,
        classFeatures,
        conditions,
        feats,
        grenades,
        programs,
        spells,
        tools,
        weaponMods,
        weapons,
        vehicles
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
