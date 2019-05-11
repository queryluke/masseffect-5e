<template lang="pug">
  v-container
    div.mb-5
      h2.display-1.hidden-sm-and-down Search the Player's Manual
      div.hr.mb-0
      v-card(elevation="0")
        v-card-text
          v-layout(row wrap)
            v-flex(md12).px-1
              v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
            // v-flex(md8).px-1
              spell-filters(:itemKey="itemKey")
    div(v-if="results.length > 0")
      search-result(v-for="result in results" v-bind:key="result.ref" v-bind:doc="getDoc(result.ref)" v-bind:result="result").mb-3
    div(v-if="searching")
      p searching

</template>

<script>
  const docs = require('../../static/data/search/documents.json')
  const lunr = require('lunr')
  const _ = require('lodash')

  import SearchResult from '~/components/cards/SearchResult.vue'

  export default {
    components: {SearchResult},
    data () {
      return {
        search: '',
        searching: false,
        results: []
      }
    },
    watch: {
      search () {
        this.results = []
        this.searching = true
        this.debouncedGetResults()

      }
    },
    created () {
      this.debouncedGetResults = _.debounce(this.getResults, 500)
    },
    methods: {
      getResults () {
        if (this.search === ''){
          this.results = []
        } else {
          const idx = lunr(function () {
            this.ref('id')
            this.field('title')
            this.field('type')
            this.field('subType')
            this.field('qualifiers')
            this.field('body')
            // this.metadataWhitelist = ['position']

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
