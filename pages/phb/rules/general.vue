<template lang="pug">
  v-container
    h2.display-3 General
    p.
      Overall, this system attempts to keep things in line with D&D 5e rules as much as possible. Some system
      additions are pretty significant, like Shield Points. But most are minor, like the addition of a few more conditions.
      Honestly, sometimes the change might seem pointless, like the conversion from feet to meters...but we have our reasons.
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
            'creature-types',
            'damage-types'
          ],
          additions: [
            'shields',
            'barriers',
            'infrared-vision',
            'paragon-and-renegade',
            'reloading',
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
