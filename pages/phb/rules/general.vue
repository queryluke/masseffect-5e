<template lang="pug">
  v-container
    h2.display-3 General
    p.
      Overall, this system attempts to keep things in line with D&D 5e rules as much as possible. There are some significant additions, like Shield Points, but most are minor, like the addition of a few more conditions.
      Some changes might seem pointless at first, such as using meters instead of feet as the base unit of distance. In these situations we have made the changes in order for the rules to better reflect the Mass Effect setting. 
    h3.display-2.mb-2 Rule Changes
    div(v-for="(ruleChange, ruleChangeIndex) in rules.changes")
      component(v-bind:is="ruleChange")
    h3.display-2.mb-2 Rule Additions
    div(v-for="(ruleAddition, ruleAdditionIndex) in rules.additions")
      component(v-bind:is="ruleAddition")
</template>

<script>
  import RuleCards from '~/components/phb/RuleCards'

  export default {
    components: RuleCards,
    data () {
      return {
        rules: {
          changes: [
            'galaxy-master',
            'distance',
            'lifting-and-carrying',
            'encumbrance',
            'race-class-restrictions',
            'creature-types'
          ],
          additions: [
            'infrared-vision',
            'paragon-and-renegade',
            'sexy-level'
          ]
        }
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - General',
        meta: [
          { hid: 'description', name: 'description', content: 'Learn about the primary rule changes and additions between Mass Effect 5e and Dungeons and Dragons 5th Edition' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
