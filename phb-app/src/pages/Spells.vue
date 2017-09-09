<template lang="jade">
  v-container
    v-layout(row wrap)
      v-flex(xs12 sm6)
        h2 Spells
        div.small Biotics, Tech Powers, and Combat Abilities
      v-flex(xs12 sm6)
        v-text-field(
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
          autofocus
        )
    div.mt-3.mb-3
      v-layout.expansion-panel__sortable
        v-flex.xs2.sm2.lg2
        v-flex.xs12.sm6.lg2 Name
        v-flex.hidden-md-and-down.lg2 Duration
        v-flex.hidden-md-and-down.lg2 Range/Area
        v-flex.hidden-md-and-down.lg2 Attack/Save
        v-flex.hidden-md-and-down.lg2 Damage/Effect
    spell-list(:spells="filtered")
    v-layout(row wrap justify-space-between).mt-4
      span Last Updated: {{ updated }}
      a(:href="source" target="_blank") Source
</template>

<script>
  import SpellList from '../components/SpellList.vue';

  export default {
    name: 'Spells',
    data() {
      return {
        spells: [],
        search: '',
        source: '',
        updated: ''
      };
    },
    created() {
      return this.$http
        .get('../data/spells.json')
        .then(response => response.json())
        .then(response => {
          this.spells = response.data;
          this.updated = response.updated;
          this.source = response.source;
        });
    },
    computed: {
      filtered () {
        let self = this;
        return this.spells.filter( (spell) => {
          return spell.name.toLowerCase().indexOf(self.search.toLowerCase())>=0;
        });
      }
    },
    components: {
      SpellList
    }
  };
</script>
