<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex(xs12 sm6)
        h2 Weapons
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
    weapon-list(:weapons="filtered")
    v-layout(row wrap justify-space-between).mt-4
      span Last Updated: {{ updated }}
      a(:href="source" target="_blank") Source
</template>

<script>
  import WeaponList from '../components/WeaponList.vue';

  export default {
    name: 'Weapons',
    components: {
      WeaponList
    },
    methods: {
      sortBy (key) {
        if(this.sortKey === key){
          this.sortOrder = this.sortOrder * -1;
        } else {
          this.sortKey = key;
          this.sortOrder = 1;
        }
      },
    },
    data() {
      return {
        weapons: [],
        search: '',
        source: '',
        updated: '',
        sortKey: 'name',
        sortOrder: 1,
        headers: [
          {key: 'type', display: '', classes: 'xs4 sm3 lg1', sortable: false},
          {key: 'name', display: 'Name', classes: 'xs8 sm9 lg3', sortable: true},
          {key: 'rof', display: 'RoF', classes: 'hidden-md-and-down lg1', sortable: true},
          {key: 'damage', display: 'Dmg', classes: 'hidden-md-and-down lg1', sortable: true},
          {key: 'heat', display: 'Heat', classes: 'hidden-md-and-down lg2', sortable: true},
          {key: 'range', display: 'Range', classes: 'hidden-md-and-down lg2', sortable: true},
          {key: 'weight', display: 'Weight', classes: 'hidden-md-and-down lg2', sortable: true},
        ]
      };
    },
    created() {
      return this.$http
        .get('../data/weapons.json')
        .then(response => response.json())
        .then(response => {
          this.weapons = response.data;
          this.updated = response.updated;
          this.source = response.source;
          this.sortKey = 'name';
          this.sortOrder = 1;
        });
    },
    computed: {
      filtered () {
        let data = this.weapons;
        let sortKey = this.sortKey;
        let search = this.search;
        let order = this.sortOrder;
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            switch(sortKey){
              case 'name':
                a = a[sortKey];
                b = b[sortKey];
                break;
              default:
                a = a[sortKey] ? parseInt(a[sortKey].replace(/\D/,''),10) : 0;
                b = b[sortKey] ? parseInt(b[sortKey].replace(/\D/,''),10) : 0;
            }
            return (a === b ? 0 : a > b ? 1 : -1) * order;
          });
        }
        if (search) {
          data = data.filter( (weapon) => {
            let name_match = weapon.name.toLowerCase().indexOf(this.search.toLowerCase())>=0;
            let type_match = weapon.type.toLowerCase().indexOf(this.search.toLowerCase())>=0;
            let note_match = weapon.notes_text_dump.toLowerCase().indexOf(this.search.toLowerCase())>=0;
            return name_match || type_match || note_match;
          });
        }
        return data
      }
    },
  };
</script>
