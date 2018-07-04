<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Weapons
    p.subtitle {{ description }}
    div(v-for="(rule, index) in pages[$route.name].rules" v-bind:key="index")
      component(v-bind:is="rule")
</template>

<script>
  // Rule Cards
  import {
    WeaponStats,
    Reloading,
    RapidReload,
    HolsteringAndDrawing,
    WeaponSlots,
    WeaponProficiency,
    WeaponAttributes,
    MeleeWeapons,
    HeavyWeapons,
    WeaponCustomization
  } from '~/components/phb/'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      WeaponStats,
      Reloading,
      RapidReload,
      HolsteringAndDrawing,
      WeaponSlots,
      WeaponProficiency,
      WeaponAttributes,
      MeleeWeapons,
      HeavyWeapons,
      WeaponCustomization
    },
    computed: {
      ...mapGetters('phb', {
        pages: 'pages'
      })
    },
    data () {
      return {
        description: 'Guns! A major difference between Mass Effect 5e and D&D 5e is the emphasis on ranged combat with firearms. You can still make a very powerful melee-focused character, but most characters in this setting will be shooting instead of slapping.'
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - Weapons',
        meta: [
          { hid: 'description', name: 'description', content: this.description }
        ]
      }
    },
    layout: 'phb-rules'
  }
</script>
