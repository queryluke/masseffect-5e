<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Multiclassing
    p.
      Multiclassing rules are the same as in 5th edition. Information about Experience Points, Hit Points and Hit Dice, and your
      Proficiency Bonus can be found #[a(href="https://5thsrd.org/rules/multiclassing/" target="_blank") in the OLG].
    div(v-for="(rule, index) in pages[$route.name].rules" v-bind:key="index")
      component(v-bind:is="rule")
</template>

<script>
  // Rule Cards
  import {
    MulticlassingBarrier,
    MulticlassingProfs,
    MulticlassingPrereqs,
    MulticlassingTech,
    MulticlassingBiotics
  } from '~/components/phb/'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      MulticlassingBarrier,
      MulticlassingProfs,
      MulticlassingPrereqs,
      MulticlassingTech,
      MulticlassingBiotics
    },
    computed: {
      ...mapGetters('phb', {
        pages: 'pages'
      })
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - Multiclassing',
        meta: [
          { hid: 'description', name: 'description', content: 'Learn how to mix and match the classes of Mass Effect' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
