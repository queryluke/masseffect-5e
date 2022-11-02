<template>
  <div>
    <!-- page header -->
    <div v-if="$vuetify.breakpoint.mdAndUp">
      <!-- Rule link -->
      <slot name="ruleLink">
        <div v-if="ruleLink" class="text-md-right">
          <v-btn :to="localePath(ruleLink)" nuxt outlined color="primary">
            {{ $t('buttons.view_rules') }}
          </v-btn>
        </div>
      </slot>
      <slot name="pageHeader">
        <me-page-title />
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$t('search')"
              single-line
              hide-details
              clearable
            />
          </v-col>
          <v-col v-for="filter in filters" :key="filter.name">
            <v-select
              :items="filter.options"
              :label="filter.label"
              multiple
              clearable
              @change="updateSelectedFilters(filter.key, $event)"
            />
          </v-col>
        </v-row>
      </slot>
    </div>

    <!-- desktop sort -->
    <div v-if="$vuetify.breakpoint.mdAndUp">
      <slot name="desktopSort">
        <v-row class="ml-3 mr-15" no-gutters>
          <v-col
            v-for="header in headers"
            :key="header.key"
            :cols="header.cols"
            :sm="header.sm || header.cols"
            :md="header.md || header.sm || header.cols"
            :lg="header.lg || header.md || header.sm || header.cols"
            :xl="header.xl || header.lg || header.md || header.sm || header.cols"
            :class="header.classes"
            class="pl-0"
          >
            <v-btn
              v-if="isSortable(header)"
              text
              small
              @click="updateSortBy(header)"
            >
              {{ $t(header.label) }}
              <v-icon small>
                {{ icon(header) }}
              </v-icon>
            </v-btn>
            <span v-else class="text-caption text-uppercase font-weight-bold pt-1 pl-3">
              {{ $t(header.label) }}
            </span>
          </v-col>
        </v-row>
      </slot>
    </div>

    <!-- list -->
    <me-skeleton-loader :pending="pending" type="listPage">
      <component :is="component" :items="sortedItems" />
    </me-skeleton-loader>

    <!-- mobile filter dialog -->
    <me-mobile-filters :title="$t('buttons.filter')">
      <template #filters>
        <v-row class="my-5">
          <v-col v-for="filter in filters" :key="filter.name" cols="12">
            <v-select
              :items="filter.options"
              :label="filter.label"
              multiple
              clearable
              @change="updateSelectedFilters(filter.key, $event)"
            />
          </v-col>
        </v-row>
      </template>
    </me-mobile-filters>

    <!-- mobile sort dialog -->
    <me-mobile-sort>
      <template #sortables>
        <v-list>
          <v-subheader>Sort By:</v-subheader>
          <slot name="sortables" />
          <v-list-item
            v-for="sortable in sortables"
            :key="sortable.key"
            :input-value="sortable.key === sortBy"
            color="primary"
            @click="updateSortBy(sortable)"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(sortable.label) }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon v-if="sortable.key === sortBy">
              <v-icon>
                {{ sortDesc ? 'mdi-arrow-down' : 'mdi-arrow-up' }}
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </template>
    </me-mobile-sort>
  </div>
</template>

<script>
import { ListPageHelpers } from '~/mixins/list_page/ListPageHelpers'

export default {
  name: 'MeListPage',
  mixins: [ListPageHelpers],
  props: {
    pending: {
      type: Boolean,
      default: true
    },
    model: {
      type: String,
      required: true
    },
    component: {
      type: String,
      required: true
    },
    ruleLink: {
      type: [String, Boolean],
      default: false
    },
    customFilter: {
      type: Function,
      default: (item, search = null, filters = [], selectedFilters = {}) => {
        const matches = []
        if (search && search.length > 0) {
          matches.push(item.name.toLowerCase().includes(search.toLowerCase()))
        }
        for (const filter of filters) {
          // filter value
          const testValue = item[filter.key]
          const selected = selectedFilters[filter.key]
          if (typeof selected === 'undefined' || selected === null || selected.length === 0 || !testValue) {
            // continue if null
            continue
          }
          const selectedIsArray = Array.isArray(selected)
          const testValueIsArray = Array.isArray(testValue)
          if (selectedIsArray && testValueIsArray) {
            // multi-select filter comparing to another array
            matches.push(testValue.some(i => selected.includes(i)))
          } else if (selectedIsArray && !testValueIsArray) {
            // multi-select filter comparing to a string
            matches.push(selected.includes(testValue))
          } else if (!selectedIsArray && testValueIsArray) {
            // single-select filters comparing to array
            matches.push(testValue.includes(selected))
          } else if (!selectedIsArray && !testValueIsArray) {
            // single-select filter comparing to a string
            matches.push(selected === testValue)
          }
        }
        return matches.every(value => value)
      }
    },
    customSort: {
      type: Function,
      default: (items, sortBy, sortDesc) => {
        const desc = sortDesc ? 1 : -1
        items.sort((a, b) => {
          const aVal = typeof a[sortBy] === 'string' ? a[sortBy].toUpperCase() : a[sortBy]
          const bVal = typeof b[sortBy] === 'string' ? b[sortBy].toUpperCase() : b[sortBy]
          return aVal === bVal
            ? a.id > b.id ? desc : desc * -1
            : aVal > bVal ? desc : desc * -1
        })
        return items
      }
    },
    defaultSort: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {
      sortBy: 'id',
      sortDesc: true,
      selectedFilters: {}
    }
  },
  computed: {
    items () {
      return this.$store.getters.getData(this.model)
    },
    search: {
      get () {
        return this.$store.getters['listPage/search']
      },
      set (value) {
        this.$store.dispatch('listPage/DEBOUNCED_SET_SEARCH', value)
      }
    },
    sortables () {
      return this.headers.filter(h => this.isSortable(h))
    },
    filteredItems () {
      return this.items.filter(i => this.customFilter(i, this.search, this.filters, this.selectedFilters))
    },
    sortedItems () {
      return [...this.customSort(this.filteredItems, this.sortBy, this.sortDesc)]
    }
  },
  created () {
    this.sortBy = this.defaultSort
    this.$store.commit('listPage/SET_MOBILE_SORT_LABEL', (this.headers.find(h => h.key === this.sortBy) || { label: '' }).label)
    this.$store.commit('listPage/TOGGLE_MOBILE_SORT_DESC', this.sortDesc)
  },
  methods: {
    updateSortBy (header) {
      if (this.isActiveSort(header)) {
        this.sortDesc = !this.sortDesc
      } else {
        this.sortBy = header.key
        this.sortDesc = true
      }
      this.$store.commit('listPage/SET_MOBILE_SORT_LABEL', header.label)
      this.$store.commit('listPage/TOGGLE_MOBILE_SORT_DESC', this.sortDesc)
    },
    updateSelectedFilters (key, value) {
      this.selectedFilters = { ...this.selectedFilters, ...{ [key]: value } }
      if (Object.values(this.selectedFilters).some(v => v && v.length > 0)) {
        this.$store.commit('listPage/INDICATE_ACTIVE_FILTERS')
      } else {
        this.$store.commit('listPage/INDICATE_NO_FILTERS')
      }
    },
    isSortable (header) {
      return typeof header.sortable === 'undefined' || header.sortable
    },
    isActiveSort (header) {
      return header.key === this.sortBy
    },
    icon (header) {
      return this.isActiveSort(header)
        ? this.sortDesc ? 'mdi-chevron-down' : 'mdi-chevron-up'
        : 'mdi-unfold-more-horizontal'
    }
  }
}
</script>
