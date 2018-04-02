<template lang="pug">
  div
    h2.display-3 Backgrounds
    p More coming eventually. Feel free to adjust backgrounds in the 5e PHB or other D&D books.
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
    page-footer(:list="listName")
</template>

<script>
  import MeElement from '../components/MeElement.vue';
  import PageFooter from '../components/PageFooter.vue';
  import {mapGetters} from 'vuex';

  export default {
    name: 'Backgrounds',
    components: {
      MeElement,
      PageFooter
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
      ...mapGetters(['getData']),
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
        listName: 'backgrounds',
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
      this.items = this.getData('backgrounds');
    }
  };
</script>
