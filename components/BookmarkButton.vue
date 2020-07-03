<template lang="pug">
  span
    v-btn(@click="removeBookmark({card, type})" v-bind="props" color="grey darken-3" v-if="isBookmarked(card)")
      v-icon(left) delete
      span Remove Bookmark
    v-btn(@click="addBookmark({card, type})" v-bind="props" color="primary" v-else)
      v-icon(left) bookmark
      span Bookmark
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    card: {
      type: Object,
      default: () => { return {} }
    },
    type: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    ...mapGetters(['isBookmarked'])
  },
  methods: {
    ...mapActions(['addBookmark', 'removeBookmark'])
  }
}
</script>
