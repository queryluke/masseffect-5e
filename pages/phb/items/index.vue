<template lang="pug">
  v-container
    h2.display-3 Items
    p.subheading Medi-gel, Thermal Clips, Heavy Weapons, Grenades, and Mines
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
          'grenades',
          'heavy-weapon-charges',
          'thermal-clips-variant'
        ]
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Equipment - Other items',
        meta: [
          { hid: 'description', name: 'description', content: 'List of consumable items in Mass Effect 5e: Medi-gel, Thermal Clips, Heavy Weapons, Grenades, and Mines' }
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
