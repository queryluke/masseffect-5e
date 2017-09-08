<template lang="jade">
  v-container
    v-layout(row wrap)
      v-flex.xs12
        h2 Skills
    div.mt-3
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).elevation-1
        template(slot="items" scope="props")
          td {{ props.item.name }}
          td {{ props.item.link }}
          td {{ props.item.description }}
    v-layout(row wrap justify-space-between).mt-4
      span Last Updated: {{ updated }}
      a(:href="source" target="_blank") Source
</template>

<script>
  export default {
    name: 'Skills',
    data() {
      return {
        items: [],
        source: '',
        updated: '',
        headers: [
          { text: 'Name', value: 'name', align: 'left'},
          { text: 'Ability', value: 'link', align: 'left' },
          { text: 'Description', value: 'description', sortable: false, align: 'left'}
        ]
      };
    },
    created() {
      return this.$http
        .get('../data/skills.json')
        .then(response => response.json())
        .then(response => {
          this.items = response.data;
          this.updated = response.updated;
          this.source = response.source;
        });
    }
  };
</script>
