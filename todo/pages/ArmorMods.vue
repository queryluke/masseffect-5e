<template lang="pug">
  div
    h2.display-3 Armor Mods
    p Read the #[router-link(to="/rules/armor") Armor Rules] to understand how armor customization works.
    div.mt-3
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).elevation-1
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.piece }}
          td {{ props.item.cost }}
          td {{ props.item.mechanic }}
    page-footer(:list="listName")
</template>

<script>
  import PageFooter from '../components/PageFooter.vue';
  import {mapGetters} from 'vuex';

  export default {
    components: {PageFooter},
    computed: {
      ...mapGetters(['getData'])
    },
    name: 'ArmorMods',
    data() {
      return {
        items: [],
        listName: 'armorMods',
        headers: [
          { text: 'Name', value: 'name', align: 'left'},
          { text: 'Slot', value: 'piece', align: 'left' },
          { text: 'Cost', value: 'cost', align: 'left' },
          { text: 'Mechanic', value: 'mechanic', sortable: false, align: 'left'},
        ]
      };
    },
    created() {
      this.items = this.getData('armorMods');
    }
  };
</script>
