<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down General
    p.
      Overall, this system attempts to keep things in line with D&D 5e rules as much as possible. There are some
      significant additions, like Shield Points, but most are minor, like the addition of a few more conditions.
      Some changes might seem pointless at first, such as using meters instead of feet as the base unit of distance.
      In these situations we have made the changes in order for the rules to better reflect the Mass Effect setting.
    div(v-for="(rule, index) in pages[$route.name].rules" v-bind:key="index")
      component(v-bind:is="rule")
</template>

<script>
  // Rule Cards
  import {
    GalaxyMaster,
    Distance,
    LiftingAndCarrying,
    Encumbrance,
    RaceClassRestrictions,
    CreatureTypes,
    InfraredVision,
    ParagonAndRenegade,
    SexyLevel
  } from '~/components/phb/'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      GalaxyMaster,
      Distance,
      LiftingAndCarrying,
      Encumbrance,
      RaceClassRestrictions,
      CreatureTypes,
      InfraredVision,
      ParagonAndRenegade,
      SexyLevel
    },
    computed: {
      ...mapGetters('phb', {
        pages: 'pages'
      })
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - General',
        meta: [
          { hid: 'description', name: 'description', content: 'Learn about the primary rule changes and additions between Mass Effect 5e and Dungeons and Dragons 5th Edition' }
        ]
      }
    },
    layout: 'phb-rules'
  }
</script>
