<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex(xs12 sm6)
        h2.display-3 Bestiary
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
    monster-list(:monsters="filtered")
    v-layout(row wrap justify-space-between).mt-4
      span Last Updated: {{ updated }}
      a(:href="source" target="_blank") Source
</template>

<script>
  import MonsterList from '../components/MonsterList.vue';
  import {ConfigureMonsters} from '../mixins/monsters';

  export default {
    components: {
      MonsterList
    },
    computed: {
      filtered () {
        let data = this.monsters;
        let sortKey = this.sortKey;
        let search = this.search;
        let order = this.sortOrder;
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            switch(sortKey){
              case 'cr':
                a = a[sortKey] ? parseInt(a[sortKey].replace(/\D/,''),10) : 0;
                b = b[sortKey] ? parseInt(b[sortKey].replace(/\D/,''),10) : 0;
                break;
              default:
                a = a[sortKey];
                b = b[sortKey];
            }
            return (a === b ? 0 : a > b ? 1 : -1) * order;
          });
        }
        if (search) {
          data = data.filter( (monster) => {
            let name_match = monster.name.toLowerCase().indexOf(this.search.toLowerCase())>=0;
            let unit_match = monster.unit.toLowerCase().indexOf(this.search.toLowerCase())>=0;
            return name_match || unit_match;
          });
        }
        return data
      }
    },
    created() {
      this.monsters = this.getMonsters();
    },
    data() {
      return {
        monsters: [],
        search: '',
        source: '',
        sortKey: 'name',
        sortOrder: 1,
        updated: '',
        headers: [
          {key: 'name', display: 'Name', classes: 'xs9 lg5', sortable: true},
          {key: 'unit', display: 'Faction', classes: 'hidden-md-and-down lg5', sortable: true},
          {key: 'cr', display: 'CR', classes: 'xs3', sortable: true},
        ]
      };
    },
    methods: {
      sortBy (key) {
        if (this.sortKey === key) {
          this.sortOrder = this.sortOrder * -1;
        } else {
          this.sortKey = key;
          this.sortOrder = 1;
        }
      }
    },
    mixins: [ConfigureMonsters],
    name: 'Bestiary'
  };
</script>
