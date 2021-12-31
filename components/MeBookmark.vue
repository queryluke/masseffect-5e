<template>
  <v-btn :color="color" dark :loading="loading" @click="toggleBookmark">
    <v-icon left>
      {{ icon }}
    </v-icon>
    {{ $t(text) }}
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
  data () {
    return {
      loading: false
    }
  },
  computed: {
    isBookmarked () {
      return this.$store.getters['user/isBookmarked'](this.type, this.item.id)
    },
    color () {
      return this.isBookmarked ? 'grey darken-3' : 'secondary'
    },
    text () {
      return this.isBookmarked ? 'buttons.remove_bookmark' : 'buttons.add_bookmark'
    },
    icon () {
      return this.isBookmarked ? 'mdi-delete' : 'mdi-bookmark'
    }
  },
  methods: {
    async toggleBookmark () {
      this.loading = true
      await this.$store.dispatch('user/TOGGLE_BOOKMARK', { type: this.type, item: this.item })
      this.loading = false
    }
  }
}
</script>
