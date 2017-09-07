<template lang="jade">
  div
    h2 Feats
    p.
      Feats are part of the official D&D PHB. Due to copyright reasons, I can only note any changes or new feats
      available in this system. Hence, if a feat doesn't have a description, you can look it up in the PHB with the page
      number provided.
    p.
      The following feats from the PHB are not available: {{ not_available }}
    div.mt-3
      v-expansion-panel(popout).mb-2
        v-expansion-panel-content(
        v-for="feat in feats"
        v-bind:feat="feat"
        v-bind:key="feat.name"
        hide-actions)
          div(slot="header")
            v-layout
              v-flex.xs2
                v-avatar(:class="[feat.page_number ? 'deep-purple' : 'deep-orange']" size="25px")
                  span(v-if="feat.page_number").white--text.headline PHB
                  span(v-else).white--text New
              v-flex.xs10 {{ feat.name }}
              v-spacer
          v-card
            v-card-text.grey.lighten-3
    v-layout(row wrap justify-space-between).mt-4
      span Last Updated: {{ updated }}
      a(:href="source" target="_blank") Source
</template>

<script>
  export default {
    name: 'Feats',
    data() {
      return {
        feats: [],
        source: '',
        updated: '',
        not_available: '',
      };
    },
    created() {
      return this.$http
        .get('../data/feats.json')
        .then(response => response.json())
        .then(response => {
          this.feats = response.data.filter(function(value) {
            return value.not_available === null;
          });
          let not_available = response.data.filter(function(value) {
            return value.not_available !== null;
          });
          this.not_available = not_available.map(function(value){
            return value.name;
          }).join(', ');
          this.updated = response.updated;
          this.source = response.source;
        });
    }
  };
</script>
