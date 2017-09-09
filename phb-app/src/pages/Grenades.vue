<template lang="jade">
  div
    h2 Grenades
    div.mt-3
      v-layout.expansion-panel__sortable
        v-flex.xs12.sm6.md3.lg3 Name
        v-flex.hidden-xs-only.sm6.md3.lg2 Damage
        v-flex.hidden-sm-and-down.md3.lg2 Range/Thrown
        v-flex.hidden-sm-and-down.md3.lg2 Range/Damage
        v-flex.hidden-md-and-down.lg2 Damage Type
    div.mt-3
      v-expansion-panel(popout).mb-2
        v-expansion-panel-content(v-for="grenade in grenades" v-bind:key="grenade.id" hide-actions).large-panel
          div(slot="header")
            v-layout
              v-flex.xs12.sm6.md3.lg3 {{ grenade.name }}
              v-flex.hidden-xs-only.sm6.md3.lg2 {{ grenade.dmg }}
              v-flex.hidden-sm-and-down.md3.lg2 {{ grenade.range_thrown }}
              v-flex.hidden-sm-and-down.md3.lg2 {{ grenade.range_explosion }}
              v-flex.hidden-md-and-down.lg2 {{ grenade.damage_type }}
          v-card
            v-card-text.grey.lighten-3
              me-element(:text="grenade.desc")
    v-layout(row wrap justify-space-between).mt-4
      span Last Updated: {{ updated }}
      a(:href="source" target="_blank") Source
</template>

<script>
  import MeElement from '../components/MeElement.vue';

  export default {
    name: 'Grenades',
    components: {
      MeElement
    },
    data() {
      return {
        grenades: [],
        source: '',
        updated: '',
      };
    },
    created() {
      return this.$http
        .get('../data/grenades_mines.json')
        .then(response => response.json())
        .then(response => {
          this.grenades = response.data;
          this.updated = response.updated;
          this.source = response.source;
        });
    }
  };
</script>
