<template lang="pug">
  rule-card(id="weapon-attributes")
    span(slot="header") Special Weapon Attributes
    template(slot="text")
      table.table
        thead
          tr
            th Attribute
            th Mechanic
        tbody
          tr(v-for="(attribute, index) in weaponAttributes")
            td(data-table-key="Attribute") {{ attribute.name }}
            td(data-table-key="Mechanic") {{ attribute.description }}
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
