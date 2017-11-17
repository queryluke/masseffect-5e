<template lang="jade">
  div
    h2 Armor Mods
    p Read the #[router-link(to="/rules/armor") Armor Rules] to understand how armor customization works.
    p.text-xs-center #[v-icon warning] This is a work in progress #[v-icon warning]
    div.mt-3
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).elevation-1
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.piece }}
          td {{ props.item.mechanic }}
          td {{ props.item.cost }}
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
          { text: 'Piece', value: 'piece', align: 'left' },
          { text: 'Modifier', value: 'mecanic', sortable: false, align: 'left'},
          { text: 'Cost', value: 'cost', align: 'left' },
        ]
      };
    },
    created() {
      return this.$http
        .get('../data/armor_mods.json')
        .then(response => response.json())
        .then(response => {
          this.items = response.data;
          this.updated = response.updated;
          this.source = response.source;
        });
    }
  };
</script>
