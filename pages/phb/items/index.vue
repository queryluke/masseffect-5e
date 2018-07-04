<template lang="pug">
  v-container
    h2.display-3 Items
    p.subheading Medi-gel, Thermal Clips, Heavy Weapons, Grenades & Mines, Omni-gel, Tooks & Kits
    div(v-for="(rule, index) in pages[$route.name].rules" v-bind:key="index")
      component(v-bind:is="rule")
</template>

<script>
  // Rule Cards
  import {
    ThermalClips,
    MediGel,
    Grenades,
    HeavyWeaponCharges,
    OmniGel,
    ToolsKits
  } from '~/components/phb/'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      ThermalClips,
      MediGel,
      Grenades,
      HeavyWeaponCharges,
      OmniGel,
      ToolsKits
    },
    computed: {
      ...mapGetters('phb', {
        pages: 'pages'
      })
    },
    head () {
      return {
        title: 'Mass Effect 5e | Equipment - Other items',
        meta: [
          { hid: 'description', name: 'description', content: 'Find out more about the unique Mass Effect 5e items: Medi-gel, Thermal Clips, Heavy Weapons, Grenades & Mines, Omni-gel, Tooks & Kits' }
        ]
      }
    },
    layout: 'phb-rules'
  }
</script>
