<template lang="pug">
  div
    h2 Backgrounds
    p More coming eventually. Feel free to adjust and backgrounds in the PHB or other D&D books.
    div.expansion-panel__sortable.primary
      v-layout.px-4
        v-flex(v-for="header in headers" v-bind:key="header.key" v-bind:class="header.classes")
          v-list(dark).primary.pa-0
            v-list-tile(@click.stop="sortBy(header.key)" ripple v-bind:class="{ active: header.key === sortKey }")
              v-list-tile-content
                v-list-tile-title(v-text="header.display")
              v-icon(:class="[sortOrder > 0 ? 'asc' : 'dsc']" dark) arrow_downward
    div.mt-3
      v-expansion-panel(popout).mb-2
        v-expansion-panel-content(v-for="item in filteredData" v-bind:key="item.id" hide-actions).large-panel
          div(slot="header")
            v-layout
              v-flex.xs12.sm3 {{ item.name }}
              v-flex.hidden-xs-only.sm5 {{ item.feature_name }}
              v-flex.hidden-xs-only.sm4 {{ item.skills }}
          v-card
            v-card-text.grey.lighten-3
              me-element(:text="item.description")
              div.hr
              dl.mt-3
                dt Skill Proficiencies
                dd {{ item.skills }}
                dt Tool Proficiencies
                dd {{ item.tools }}
                dt Equipment
                dd {{ item.equipment }}
              v-card.mt-3
                v-card-title.headline Feature: {{ item.feature_name }}
                v-card-text
                  me-element(:text="item.feature_description")
    v-layout(row wrap justify-space-between).mt-4
      span Last Updated: {{ updated }}
      a(:href="source" target="_blank") Source
</template>

<script>
  import MeElement from '../components/MeElement.vue';

  export default {
    name: 'Backgrounds',
    components: {
      MeElement
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
    computed: {
      filteredData() {
        let data = this.items;
        let sortKey = this.sortKey;
        let order = this.sortOrder;
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey];
            b = b[sortKey];
            return (a === b ? 0 : a > b ? 1 : -1) * order;
          });
        }
        return data
      },
    },
    data() {
      return {
        items: [],
        source: '',
        updated: '',
        headers: [
          {key: 'name', display: 'Name', classes: 'xs12 sm3'},
          {key: 'feature_name', display: 'Feature', classes: 'hidden-xs-only sm5'},
          {key: 'skills', display: 'Proficiencies', classes: 'hidden-xs-only sm4'},
        ],
        sortKey: 'name',
        sortOrder: 1,
      };
    },
    created() {
      return this.$http
        .get('../data/backgrounds.json')
        .then(response => response.json())
        .then(response => {
          this.items = response.data;
          this.updated = response.updated;
          this.source = response.source;
        });
    }
  };
</script>
