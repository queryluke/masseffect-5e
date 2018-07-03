<template lang="pug">
  rule-card
    span(slot="header") Special Weapon Attributes
    template(slot="text")
      table.table.alt-table
        thead.text-xs-left
          tr
            th Attribute
            th Mechanic
        tbody
          tr(v-for="(attribute, index) in weaponAttributes")
            td {{ attribute.name }}
            td {{ attribute.description }}
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: { RuleCard },
    computed: {
      ...mapGetters(['getData'])
    },
    data () {
      return {
        weaponAttributes: []
      }
    },
    created () {
      this.weaponAttributes = this.getData('weaponAttributes')
    }
  }
</script>
