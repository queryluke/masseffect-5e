<template lang="jade">
  v-container
    v-layout(row wrap)
      v-flex.xs12
        h2 Conditions
      v-flex.xs12
        p.headline New
        p Frozen, Lifted, Targeting
    div.mt-3
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).elevation-1
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.description }}
</template>

<script>
  export default {
    name: 'Skills',
    data() {
      return {
        items: [],
        new_skills: '',
        removed: '',
        source: '',
        updated: '',
        headers: [
          { text: 'Name', value: 'name', align: 'left'},
          { text: 'Description', value: 'description', sortable: false, align: 'left'}
        ]
      };
    },
    created() {
      return this.$http
        .get('../data/conditions.json')
        .then(response => response.json())
        .then(response => {
          this.items = response;
        });
    }
  };
</script>
