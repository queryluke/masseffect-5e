<template lang="pug">
  div
    // Mobile Sort
    div.text-xs-right.mb-2.hidden-lg-and-up
      v-menu(bottom left)
        span(slot="activator").subheading Sort by: {{ sortBy.label }}
        v-list
          v-list-tile(v-for="header in headers" v-bind:key="header.key" v-on:click="sortBy = header" v-if="header.sortable")
            v-list-tile-title {{ header.label }} #[v-icon(v-if="header.key === sortBy.key") check]
      v-btn(@click="order = order * -1" icon small)
        v-icon {{ order > 0 ? 'arrow_downward' : 'arrow_upward' }}

    // Desktop Sort
    v-layout(row).pl-4.pr-5.my-2.hidden-md-and-down
      v-flex(v-for="header in headers" v-bind:key="header.key" v-bind:class="header.classes")
        button(@click="sort(header)" v-if="header.sortable").body-2 {{ header.label }}
          v-icon(v-if="sortBy.key === header.key" size="16").ml-2 {{ order > 0 ? 'arrow_downward' : 'arrow_upward' }}
        span(v-else).body-1 {{ header.label }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    headers: {
      type: Array,
      default: () => { return [] }
    },
    defaultSort: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('itemList', {
      getOrder: 'order',
      getSortBy: 'sortBy'
    }),
    order: {
      get () {
        return this.getOrder
      },
      set (value) {
        this.updateList({ key: 'order', value })
      }
    },
    sortBy: {
      get () {
        return this.getSortBy
      },
      set (value) {
        this.updateList({ key: 'sortBy', value })
      }
    }
  },
  created () {
    if (!this.headers.includes(this.sortBy)) {
      this.sortBy = this.headers[this.defaultSort]
    }
  },
  methods: {
    ...mapActions('itemList', ['updateList']),
    sort (header) {
      if (this.sortBy === header) {
        this.order = this.order * -1
      } else {
        this.sortBy = header
      }
    }
  }
}
</script>
