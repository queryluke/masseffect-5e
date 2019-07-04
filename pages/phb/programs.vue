<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    div.text-md-right
      v-btn(to="/phb/rules/equipment#omni-tool-programs" nuxt outline color="secondary") Program Rules

    // Search functions for large screens
    div.mb-5.hidden-sm-and-down
      h2.display-1 Omni-tool Programs
      div.hr.mb-0
      v-card(elevation="0")
        v-card-text
          v-layout(row wrap)
            v-flex(md4).px-1
              v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
            v-flex(md8).px-1
              program-filters(:itemKey="itemKey")

    // List
    program-list(:items="filtered")

    // Mobile Filters
    mobile-filter-container(title="Filter Programs")
      template(slot="filters")
        program-filters(:itemKey="itemKey")

</template>

<script>
  import ProgramList from '~/components/programs/ProgramList.vue'
  import ProgramFilters from '~/components/programs/ProgramFilters.vue'
  import BookmarkButton from '~/components/BookmarkButton.vue'
  import MobileFilterContainer from '~/components/list/MobileFilterContainer.vue'
  import items from '~/static/data/programs'

  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('itemList')

  export default {
    components: {
      MobileFilterContainer,
      ProgramFilters,
      ProgramList,
      BookmarkButton
    },
    data () {
      return {
        items,
        itemKey: 'programs'
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
        data.sort(function (a, b) {
          return (a[sortBy] === b[sortBy] ? 0 : a[sortBy] > b[sortBy] ? 1 : -1) * order
        })
        if (this.search) {
          data = data.filter((item) => item.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
        }
        if (this.filters[this.itemKey].rarity.length > 0) {
          data = data.filter(item => this.filters[this.itemKey].rarity.map(r => r.toLowerCase()).includes(item.rarity))
        }
        if (this.filters[this.itemKey].installation) {
          data = data.filter(item => item.installation)
        }
        return data
      }
    },
    middleware: 'resetListFilters',
    head () {
      return {
        title: 'Programs - Equipment | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Mass Effect 5e useds omni-tool programs in places of 5th editions magic items.' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      ...mapActions(['updateSearchString'])
    }
  }
</script>
