<template lang="pug">
  v-container
    h2.display-3 Armor Sets
    p.
      Pre-made Armor Sets are cheaper than creating a full set of custom armor. However, they cannot be customized or upgraded
      in any way. To learn about creating additional Armor Sets, read the #[router-link(to="/phb/rules/armor") Armor Rules].
    p.
      An armor set can be one or multiple pieces of armor. "Full Set" means the armor consists of Head, Chest, Arms, and Legs piece.
      "Body Armor" consists of a Chest, Arm and Leg piece.
    div.mt-3
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).elevation-1
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.piece }}
          td {{ props.item.type }}
          td {{ props.item.cost }}
          td {{ props.item.mechanic }}
    page-footer(:list="listName")
</template>

<script>
  import PageFooter from '~/components/phb/PageFooter.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: { PageFooter },
    computed: {
      ...mapGetters(['getData'])
    },
    created () {
      this.items = this.getData('armorSets')
    },
    data () {
      return {
        items: [],
        listName: 'armorSets',
        headers: [
          { text: 'Name', value: 'name', align: 'left' },
          { text: 'Slot', value: 'piece', align: 'left' },
          { text: 'Type', value: 'cost', align: 'left' },
          { text: 'Cost', value: 'cost', align: 'left' },
          { text: 'Mechanic(s)', value: 'mechanic', sortable: false, align: 'left' }
        ]
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Equipment - Pre-made Armor Sets',
        meta: [
          { hid: 'description', name: 'description', content: 'Pre-made armor sets ...' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
