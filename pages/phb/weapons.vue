<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    div.text-md-right
      v-btn(to="/phb/rules/equipment#weapons" nuxt outline color="secondary") Weapon Rules
      v-btn(href="https://goo.gl/forms/pQS1leX183MSOLO32" target="_blank" outline color="secondary") Submit Your Idea

    // Search functions for large screens
    div.mb-5.hidden-sm-and-down
      h2.display-1 Weapons
      div.hr.mb-0
      v-card(elevation="0")
        v-card-text
          v-layout(row wrap)
            v-flex(xs12)
              v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
            v-flex(xs12)
              weapon-filters(:itemKey="itemKey")

    // List
    weapon-list(:items="filtered")

    // Mobile Filters
    mobile-filter-container(title="Filter Weapons")
      template(slot="filters")
        weapon-filters(:itemKey="itemKey")

</template>

<script>
  import WeaponList from '~/components/weapon/WeaponList.vue'
  import WeaponFilters from '~/components/weapon/WeaponFilters.vue'
  import BookmarkButton from '~/components/BookmarkButton.vue'
  import MobileFilterContainer from '~/components/list/MobileFilterContainer.vue'
  import {AverageFromDie} from '~/mixins/averageFromDie'
  import items from '~/static/data/weapons'

  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('itemList')

  export default {
    components: {
      MobileFilterContainer,
      WeaponFilters,
      WeaponList,
      BookmarkButton
    },
    mixins: [AverageFromDie],
    data () {
      return {
        items,
        itemKey: 'weapons'
      }
    },
    computed: {
      ...mapGetters(['order', 'sortBy', 'filters', 'searchString']),
      search: {
        get () {
          return this.searchString
        },
        set (value) {
          this.updateSearchString(value)
        }
      },
      filtered () {
        let data = this.items
        let sortBy = this.sortBy.key
        let order = this.order
        let self = this
        data.sort(function (a, b) {
          switch (sortBy) {
            case 'type':
            case 'name':
              a = a[sortBy]
              b = b[sortBy]
              break
            case 'damage':
              a = self.averageFromDie(a.damage)
              b = self.averageFromDie(b.damage)
              break
            default:
              a = a[sortBy] ? parseInt(a[sortBy].replace(/\D/, ''), 10) : 0
              b = b[sortBy] ? parseInt(b[sortBy].replace(/\D/, ''), 10) : 0
          }
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
        if (this.search) {
          data = data.filter((item) => {
            let nameMatch = item.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            let typeMatch = item.type.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            return nameMatch || typeMatch
          })
        }
        for (const key in this.filters[this.itemKey]) {
          const filter = this.filters[this.itemKey][key]
          if (filter.length > 0) {
            if (key === 'property') {
              data = data.filter(item => {
                for (const property of item.properties) {
                  if (filter.includes(property)) {
                    return item
                  }
                }
              })
            } else {
              data = data.filter(item => filter.includes(item[key]))
            }
          }
        }
        return data
      }
    },
    middleware: 'resetListFilters',
    head () {
      return {
        title: 'Weapons - Equipment | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'The Mass Effect 5e arsenal has over 80 unique weapons designed to match the game\'s weaponry' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      ...mapActions(['updateSearchString'])
    }
  }
</script>
