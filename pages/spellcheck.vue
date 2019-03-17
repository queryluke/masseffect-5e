<template lang="pug">
  v-content

    // Armor Mods
    div(v-for="am in armorMods" v-bind:key="am.id")
      p.title {{ am.name }}
      p {{ am.description }}
      p {{ am.feature }}


</template>

<script>
  import armorMods from '~/static/data/armor_mods.json'

  export default {
    data () {
      return {
        armorMods: armorMods
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
