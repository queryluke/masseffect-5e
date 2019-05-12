<template lang="pug">
  v-container
    div.mb-5
      h2.display-1.hidden-sm-and-down Search
      div.hr.mb-0
      v-card(elevation="0")
        v-card-text
          v-text-field(append-icon="search" label="Search" single-line hide-details clearable v-model="search")
          v-layout(row wrap).mt-3
            v-flex(v-for="(sf, i) in searchFilters" v-bind:key="sf.id" xs6 md2 :offset-md1="i === 0")
              v-btn(@click="setFilter(sf.id)" v-bind:outline="!filters.includes(sf.id)" v-bind:color="sf.color" fab v-bind:title="sf.id" dark)
                v-icon {{ sf.icon }}
    div(v-if="results.length > 0")
      search-result(
        v-if="show(result.ref)"
        v-for="result in results"
        v-bind:key="result.ref"
        v-bind:doc="getDoc(result.ref)"
        v-bind:result="result"
      ).mb-2
        p {{ show(result.ref) }}
    div.text-xs-center
      div(v-if="searching")
        v-progress-circular(size="70" width="7" color="primary" indeterminate)
      div(v-else-if="search !== '' && results.length === 0")
        p.headline.font-weight-thin #[em No results found]

</template>

<script>
  const docs = require('../../static/data/search/documents.json')
  const lunr = require('lunr')
  const _ = require('lodash')

  import SearchResult from '~/components/cards/SearchResult.vue'
  import {mapActions, mapGetters} from 'vuex'


  export default {
    components: {SearchResult},
    data () {
      return {
        searching: false,
        filters: [],
        results: []
      }
    },
    computed: {
      ...mapGetters(['phbSearch', 'searchFilters']),
      search: {
        get () {
          return this.phbSearch
        },
        set (value) {
          this.setPhbSearch(value)
        }
      },
    },
    watch: {
      search () {
        this.results = []
        this.debouncedGetResults()
        this.searching = true
      },
    },
    created () {
      this.debouncedGetResults = _.debounce(this.getResults, 500)
      if (this.search !== ''){
        this.debouncedGetResults()
        this.searching = true
      }
    },
    methods: {
      ...mapActions(['setPhbSearch']),
      setFilter (id) {
        if (this.filters.includes(id)) {
          this.filters.splice(this.filters.indexOf(id),1)
        } else {
          this.filters.push(id)
        }
      },
      getResults () {
        if (this.search === '' || this.search === null || typeof(this.search) === 'undefined'){
          this.results = []
        } else {
          const idx = lunr(function () {
            this.ref('id')
            this.field('title', {boost: 3})
            this.field('type')
            this.field('subType')
            this.field('qualifiers')
            this.field('body')
            this.metadataWhitelist = ['position']

            docs.forEach(function (doc) {
              this.add(doc)
            }, this)
          })
          this.results = idx.search(this.search)
        }
        this.searching = false
      },
      getDoc (ref) {
        return docs.find(d => d.id === ref)
      },
      show (ref) {
        if (this.filters.length > 0) {
          return this.filters.includes(this.getDoc(ref).type)
        }
        return true
      }
    },
    head () {
      return {
        title: 'Search Player\'s Manual | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Search Mass Effect 5e rules, spells, class features, etc.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
