<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="8" offset-lg="2" xl="6" offset-xl="3">
        <v-card>
          <v-card-text>
            <v-text-field v-model="search" append-icon="mdi-magnify" :label="$t('buttons.search')" clearable autofocus />
            <v-row justify="space-around">
              <v-col v-for="sf in searchFilters" :key="sf.id" cols="2" class="text-center">
                <v-btn
                  fab
                  :small="$vuetify.breakpoint.xs"
                  :outlined="!filters.includes(sf.id)"
                  :color="searchFilterColor(sf.id)"
                  :dark="!darkMode"
                  :light="darkMode"
                  :title="sf.id"
                  @click="setFilter(sf.id)"
                >
                  <v-icon>
                    {{ sf.icon }}
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="!$fetchState.pending">
      <div v-if="filteredResults.length > 0">
        <template v-for="result in filteredResults">
          <me-search-result
            :key="result.ref"
            :result="result"
          />
        </template>
      </div>
      <div v-else class="text-center mt-8">
        <v-progress-circular v-if="searching" size="70" width="7" color="primary" indeterminate />
        <div v-else-if="search === '' || search === null">
          <p class="text-h5">
            {{ $t('buttons.enter_search') }}
          </p>
        </div>
        <div v-else>
          <p class="text-h5">
            {{ $t('buttons.no_results') }}
          </p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import lunr from 'lunr'
import { debounce } from 'lodash'

export default {
  layout: 'phb',
  data () {
    return {
      index: null,
      searching: false,
      docs: [],
      filters: [],
      results: []
    }
  },
  async fetch () {
    this.$store.commit('pageTitle', 'Search')
    this.docs = await this.$store.dispatch('FETCH_DATA', 'search-index')
    this.index = await this.createIndex(this.docs.slice())
  },
  head () {
    return {
      title: 'Search | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Search Mass Effect 5e rules, spells, class features, etc.' }
      ]
    }
  },
  computed: {
    search: {
      get () {
        return this.$store.getters['user/search']
      },
      set (value) {
        this.$store.commit('user/SET_SEARCH', value)
      }
    },
    searchFilters () {
      return this.$store.getters['config/searchFilters']
    },
    filteredResults () {
      if (this.filters.length > 0) {
        return this.results.filter(r => this.filters.includes(r.doc.type))
      }
      return this.results
    },
    darkMode () {
      return this.$store.getters['user/darkMode']
    }
  },
  watch: {
    search () {
      this.results = []
      this.debouncedGetResults()
      this.searching = true
    }
  },
  created () {
    this.debouncedGetResults = debounce(this.getResults, 500)
    if (this.search !== '') {
      this.debouncedGetResults()
      this.searching = true
    }
  },
  methods: {
    searchFilterColor (sf) {
      return this.$store.getters['config/searchFilterColor'](sf)
    },
    createIndex (docs) {
      return lunr(function () {
        this.ref('id')
        this.field('title', { boost: 3 })
        this.field('type')
        this.field('qualifiers')
        this.field('body')
        this.metadataWhitelist = ['position']

        docs.forEach(function (doc) {
          this.add(doc)
        }, this)
      })
    },
    setFilter (id) {
      if (this.filters.includes(id)) {
        this.filters.splice(this.filters.indexOf(id), 1)
      } else {
        this.filters.push(id)
      }
    },
    getResults () {
      if (this.search === '' || this.search === null || typeof (this.search) === 'undefined' || this.index === null) {
        this.results = []
      } else {
        const results = this.index.search(this.search)
        if (results.length > 0) {
          for (const r of results) {
            r.doc = this.getDoc(r.ref)
          }
          this.results = results
        }
      }
      this.searching = false
    },
    getDoc (ref) {
      return this.docs.find(d => d.id === ref)
    }
  }
}
</script>
