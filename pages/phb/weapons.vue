<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex(xs12 sm6)
        h2.display-3 Weapons
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
    page-footer(:list="listName")
</template>

<script>
  import WeaponList from '~/components/phb/WeaponList.vue'
  import {mapGetters} from 'vuex'
  import PageFooter from '~/components/phb/PageFooter.vue'
  import {AverageFromDie} from '~/mixins/averageFromDie'

  export default {
    components: {
      PageFooter,
      WeaponList
    },
    computed: {
      ...mapGetters(['getData']),
      filtered () {
        let data = this.items
        let sortKey = this.sortKey
        let search = this.search
        let order = this.sortOrder
        if (sortKey) {
          const self = this
          data = data.slice().sort(function (a, b) {
            switch (sortKey) {
              case 'name':
                a = a[sortKey]
                b = b[sortKey]
                break
              case 'rof':
                a = self.averageFromDie(`${a.rof}d${a.damage}`)
                b = self.averageFromDie(`${b.rof}d${b.damage}`)
                break
              default:
                a = a[sortKey] ? parseInt(a[sortKey].replace(/\D/, ''), 10) : 0
                b = b[sortKey] ? parseInt(b[sortKey].replace(/\D/, ''), 10) : 0
            }
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        if (search) {
          data = data.filter((weapon) => {
            let nameMatch = weapon.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            let typeMatch = weapon.type.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            let noteMatch = weapon.notes_text_dump.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            return nameMatch || typeMatch || noteMatch
          })
        }
        return data
      }
    },
    created () {
      this.items = this.getData('weapons')
    },
    data () {
      return {
        items: [],
        listName: 'weapons',
        search: '',
        sortKey: 'name',
        sortOrder: 1,
        headers: [
          { key: 'type', display: '', classes: 'xs4 sm3 lg1', sortable: false },
          { key: 'name', display: 'Name', classes: 'xs8 sm9 lg3', sortable: true },
          { key: 'rof', display: 'RoF/Dmg', classes: 'hidden-md-and-down lg2', sortable: true },
          { key: 'heat', display: 'Heat', classes: 'hidden-md-and-down lg2', sortable: true },
          { key: 'range', display: 'Range', classes: 'hidden-md-and-down lg2', sortable: true },
          { key: 'weight', display: 'Weight', classes: 'hidden-md-and-down lg2', sortable: true },
          { key: 'cost', display: 'Cost', classes: 'hidden-md-and-down lg2', sortable: true }
        ]
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Equipment - Weapons',
        meta: [
          { hid: 'description', name: 'description', content: 'The Mass Effect 5e arsenal has over 80 unique weapons designed to match the game\'s weaponry' }
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
    },
    mixins: [AverageFromDie]
  }
</script>
