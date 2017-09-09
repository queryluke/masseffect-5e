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
    div.expansion-panel__sortable.primary.my-3
      v-layout.px-4
        v-flex(v-for="header in headers" v-bind:key="header.key" v-bind:class="header.classes")
          v-list(dark).primary.pa-0
            v-list-tile(@click.stop="sortBy(header.key)" ripple v-bind:class="{ active: header.key === sortKey }" v-if="header.sortable")
              v-list-tile-content
                v-list-tile-title(v-text="header.display")
              v-icon(:class="[sortOrder > 0 ? 'asc' : 'dsc']" dark) arrow_downward
            v-list-tile(v-else)
              v-list-tile-content
                v-list-tile-title(v-text="header.display")
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
        updated: '',
        headers: [
          {key: 'type', display: '', classes: 'xs4 sm3 lg2', sortable: false},
          {key: 'name', display: 'Name', classes: 'xs8 sm9 lg2', sortable: false},
          {key: 'duration', display: 'Duration', classes: 'hidden-md-and-down lg2', sortable: false},
          {key: 'range', display: 'Range/Area', classes: 'hidden-md-and-down lg2', sortable: false},
          {key: 'attack_type', display: 'Attack/Save', classes: 'hidden-md-and-down lg2', sortable: false},
          {key: 'damage', display: 'Damage/Effect', classes: 'hidden-md-and-down lg2', sortable: false},
        ]
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
