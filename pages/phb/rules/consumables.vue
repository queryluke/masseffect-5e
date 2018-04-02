<template lang="pug">
  div
    h2.display-3 Consumables
    div(v-for="(rule, index) in rules")
      component(v-bind:is="rule")
</template>

<script>
  import RuleCards from '~/components/phb/RuleCards'

  export default {
    name: 'Consumables',
    components: RuleCards,
    data () {
      return {
        rules: [
          'medi-gel',
          'thermal-clips',
          'thermal-clips-variant',
          'grenades',
          'heavy-weapon-charges'
        ]
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - Consumables',
        meta: [
          { hid: 'description', name: 'description', content: 'List of consumable items in Mass Effect 5e' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      showGlobalDialog (component) {
        this.$emit('showGlobalDialog', component)
      }
    }
  }
</script>
