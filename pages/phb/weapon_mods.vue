<template lang="pug">
  v-container
    h2.display-3 Weapon Mods
    p Read the #[router-link(to="/phb/rules/weapons") Weapon Customization Rules] to understand how weapons customization works.
    div.mt-3
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).elevation-1
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.placement }}
          td {{ props.item.cost | groupDigits(',') }}
          td {{ props.item.availability }}
          td {{ props.item.feature }}
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['getData'])
    },
    created () {
      this.items = this.getData('weaponMods')
    },
    data () {
      return {
        items: [],
        listName: 'weaponMods',
        headers: [
          { text: 'Name', value: 'name', align: 'left' },
          { text: 'Slot', value: 'placement', align: 'left' },
          { text: 'Cost', value: 'cost', align: 'left' },
          { text: 'Weapon Types', value: 'availability', sortable: false, align: 'left' },
          { text: 'Mechanic', value: 'feature', sortable: false, align: 'left' }
        ]
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Equipment - Weapon Mods',
        meta: [
          { hid: 'description', name: 'description', content: 'Mass Effect 5e comes with a full set of weapon  mods that let you customize your weapon to your needs.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
