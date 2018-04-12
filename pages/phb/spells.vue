<template lang="pug">
  v-container
    h2.display-3 Spells
    div.small Biotics, Tech Powers, and Combat Abilities
    v-container(grid-list-xl)
      v-layout(row wrap)
        v-flex(xs12 sm6 d-flex)
          v-text-field(
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
            autofocus
          )
        v-flex(xs12 sm6 d-flex)
          v-layout(row)
            v-flex
              v-checkbox(label="Biotic" v-model="spellFilter" value="biotic" color="purple darken-4")
            v-flex
              v-checkbox(label="Tech" v-model="spellFilter" value="tech" color="orange darken-4")
            v-flex
              v-checkbox(label="Combat" v-model="spellFilter" value="combat" color="primary")
    div.expansion-panel__sortable.primary
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
    page-footer(:list="listName")

</template>

<script>
  import SpellList from '~/components/phb/SpellList.vue'
  import PageFooter from '~/components/phb/PageFooter.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      PageFooter,
      SpellList
    },
    computed: {
      ...mapGetters(['getData']),
      filtered () {
        let data = this.items
        let sortKey = this.sortKey
        let order = this.sortOrder
        data = data.slice().sort(function (a, b) {
          switch (sortKey) {
            case 'type':
              if (a[sortKey] === b[sortKey]) {
                if (a.level === b.level) {
                  return (a.name > b.name ? 1 : -1) * order
                } else {
                  return (a.level > b.level ? 1 : -1) * order
                }
              } else {
                return (a[sortKey] > b[sortKey] ? 1 : -1) * order
              }
            default:
              return (a[sortKey] === b[sortKey] ? 0 : a[sortKey] > b[sortKey] ? 1 : -1) * order
          }
        })
        if (this.search) {
          data = data.filter((spell) => {
            let nameMatch = spell.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            let textMatch = spell.mechanic_text_dump.indexOf(this.search.toLowerCase()) >= 0
            return nameMatch || textMatch
          })
        }
        if (this.spellFilter.length > 0) {
          data = data.filter(spell => this.spellFilter.includes(spell.type))
        }
        return data
      }
    },
    created () {
      this.items = this.getData(this.listName).sort((a, b) => a.name > b.name ? 1 : -1)
    },
    data () {
      return {
        items: [],
        listName: 'spells',
        search: '',
        sortKey: 'name',
        sortOrder: 1,
        spellFilter: [],
        headers: [
          { key: 'type', display: 'Type', classes: 'xs4 sm3 lg2', sortable: true },
          { key: 'name', display: 'Name', classes: 'xs8 sm9 lg2', sortable: true },
          { key: 'duration', display: 'Duration', classes: 'hidden-md-and-down lg2', sortable: false },
          { key: 'range', display: 'Range/Area', classes: 'hidden-md-and-down lg2', sortable: false },
          { key: 'attack_type', display: 'Attack/Save', classes: 'hidden-md-and-down lg2', sortable: false },
          { key: 'damage', display: 'Damage/Effect', classes: 'hidden-md-and-down lg2', sortable: false }
        ]
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Biotics, Tech and Combat Powers',
        meta: [
          { hid: 'description', name: 'description', content: 'Dozens of unique and re-skinned D&D spells are available as Biotic, Tech, and Combat powers' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      sortBy (key) {
        if (this.sortKey === key) {
          this.sortOrder = this.sortOrder * -1
        } else {
          this.sortKey = key
          this.sortOrder = 1
        }
      }
    }
  }
</script>
