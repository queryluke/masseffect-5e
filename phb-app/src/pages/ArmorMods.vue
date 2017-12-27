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
          { text: 'Cost', value: 'cost', align: 'left' },
          { text: 'Mechanic', value: 'mechanic', sortable: false, align: 'left'},
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
