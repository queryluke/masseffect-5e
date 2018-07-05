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
</template>

<script>
  import MonsterList from '~/components/npc/MonsterList.vue'
  import {ConfigureMonsters} from '~/mixins/monsters'
  import {CrToInt} from '~/mixins/crToInt'

  export default {
    components: {
      MonsterList
    },
    computed: {
      filtered () {
        let data = this.monsters
        let sortKey = this.sortKey
        let search = this.search
        if (sortKey) {
          data = data.slice().sort(this.sortFunction)
        }
        if (search) {
          data = data.filter((monster) => {
            let nameMatch = monster.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            let unitMatch = monster.unit.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            return nameMatch || unitMatch
          })
        }
        return data
      }
    },
    created () {
      this.monsters = this.getMonsters()
    },
    data () {
      return {
        monsters: [],
        search: '',
        source: '',
        sortKey: 'name',
        sortOrder: 1,
        updated: '',
        headers: [
          { key: 'name', display: 'Name', classes: 'xs9 lg5', sortable: true },
          { key: 'unit', display: 'Faction', classes: 'hidden-md-and-down lg5', sortable: true },
          { key: 'cr', display: 'CR', classes: 'xs3', sortable: true }
        ]
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Bestiary',
        meta: [
          { hid: 'description', name: 'description', content: 'Give your player\'s a unique challenge with over 100 custom made Mass Effect enemies! ' }
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
      },
      sortFunction (a, b) {
        switch (this.sortKey) {
          case 'cr':
            a = this.crToInt(a[this.sortKey])
            b = this.crToInt(b[this.sortKey])
            break
          default:
            a = a[this.sortKey]
            b = b[this.sortKey]
        }
        return (a === b ? 0 : a > b ? 1 : -1) * this.sortOrder
      }
    },
    mixins: [ConfigureMonsters, CrToInt]
  }
</script>
