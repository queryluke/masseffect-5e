<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex.xs12
        h2.display-3 Skills
      v-flex.xs12.sm6
        p.headline New
        p {{ new_skills }}
      v-flex.xs12.sm6
        p.headline Removed
        p {{ removed }}
    div.mt-3
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).elevation-1
        template(slot="items" slot-scope="props")
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
        new_skills: '',
        removed: '',
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
          this.items = response.data.filter((i) => { return i.removed === null });
          this.removed = response.data.filter((i) => { return i.removed }).map((i) => { return i.name }).join(', ');
          this.new_skills = response.data.filter((i) => { return i.new }).map((i) => { return i.name }).join(', ');
          this.updated = response.updated;
          this.source = response.source;
        });
    }
  };
</script>
