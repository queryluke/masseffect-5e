<template lang="pug">
  v-container
    h2.display-3 Items
    p.subheading Medi-gel, Thermal Clips, Heavy Weapons, Grenades & Mines, Omni-gel, Tooks & Kits
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
          'thermal-clips',
          'medi-gel',
          'grenades',
          'heavy-weapon-charges',
          'omni-gel',
          'tools-kits'
        ]
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Equipment - Other items',
        meta: [
          { hid: 'description', name: 'description', content: 'Find out more about the unique Mass Effect 5e items: Medi-gel, Thermal Clips, Heavy Weapons, Grenades & Mines, Omni-gel, Tooks & Kits' }
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
