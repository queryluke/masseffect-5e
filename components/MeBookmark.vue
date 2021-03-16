<template>
  <v-btn :color="color" dark @click="toggleBookmark">
    <v-icon left>
      {{ icon }}
    </v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    isBookmarked () {
      return this.$store.getters['user/isBookmarked'](this.type, this.item)
    },
    color () {
      return this.isBookmarked ? 'grey darken-3' : 'secondary'
    },
    text () {
      return this.isBookmarked ? 'Remove Bookmark' : 'Bookmark'
    },
    icon () {
      return this.isBookmarked ? 'mdi-delete' : 'mdi-bookmark'
    }
  },
  methods: {
    toggleBookmark () {
      this.$store.dispatch('user/TOGGLE_BOOKMARK', { type: this.type, item: this.item })
    }
  }
}
</script>
