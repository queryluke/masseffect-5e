<template lang="pug">
  v-content

    // Armor Mods
    // div(v-for="am in armorMods" v-bind:key="am.id")
      p.title {{ am.name }}
      p {{ am.description }}
      p {{ am.feature }}

    // Armor Sets
    div(v-for="item in armorSets" v-bind:key="item.id")
      p.title {{ item.name }}
      p {{ item.description }}
      p {{ item.feature }}
      p {{ item.setBonus }}



</template>

<script>
  import armorMods from '~/static/data/armor_mods.json'
  import armorSets from '~/static/data/armor_sets.json'

  export default {
    data () {
      return {
        armorMods,
        armorSets
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
