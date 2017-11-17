<template lang="jade">
  div
    h2 Thermal Clips
    p Starting capacity is 6 (Variant 10).
    div.mt-3
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).elevation-1
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.mechanic }}
    v-layout(row wrap justify-space-between).mt-4
      span Last Updated: {{ updated }}
      a(:href="source" target="_blank") Source
</template>

<script>
  export default {
    name: 'ThermalClips',
    data() {
      return {
        items: [],
        source: '',
        updated: '',
        headers: [
          { text: 'Name', value: 'name', align: 'left'},
          { text: 'Description', value: 'mechanic', sortable: false, align: 'left'}
        ]
      };
    },
    created() {
      return this.$http
        .get('../data/thermal_clips.json')
        .then(response => response.json())
        .then(response => {
          this.items = response.data;
          this.updated = response.updated;
          this.source = response.source;
        });
    }
  };
</script>
