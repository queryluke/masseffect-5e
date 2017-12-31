<template lang="pug">
  div
    h2.display-3 Armor Sets
    p.
      Pre-made Armor Sets are cheaper than creating a full set of custom armor. However, they cannot be customized or upgraded
      in any way. To learn about creating additional Armor Sets, read the #[router-link(to="/rules/armor") Armor Rules].
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
    v-layout(row wrap justify-space-between).mt-4
      span Last Updated: {{ updated }}
      a(:href="source" target="_blank") Source
</template>

<script>
  export default {
    name: 'ArmorMods',
    data() {
      return {
        items: [],
        source: '',
        updated: '',
        headers: [
          { text: 'Name', value: 'name', align: 'left'},
          { text: 'Slot', value: 'piece', align: 'left' },
          { text: 'Type', value: 'cost', align: 'left' },
          { text: 'Cost', value: 'cost', align: 'left' },
          { text: 'Mechanic(s)', value: 'mechanic', sortable: false, align: 'left'},
        ]
      };
    },
    created() {
      return this.$http
        .get('../data/armor_sets.json')
        .then(response => response.json())
        .then(response => {
          this.items = response.data;
          this.updated = response.updated;
          this.source = response.source;
        });
    }
  };
</script>
