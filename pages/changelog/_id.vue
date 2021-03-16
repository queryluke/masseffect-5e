<template>
  <v-container>
    <div class="news-post mb-5">
      <h1 class="text-h2">
        {{ post.title }}
      </h1>
      <p class="text-subtitle-1">
        <em>
          {{ parsedDate }}
        </em>
      </p>
      <me-html v-if="!$fetchState.pending" :content="post.html" />
    </div>
    <v-btn to="/changelog" nuxt color="secondary">
      <v-icon>
        mdi-arrow-left
      </v-icon>
      Back to changelog
    </v-btn>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.post = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'changelog', id: this.$route.params.id })
    this.$store.commit('pageTitle', this.post.title)
  },
  data () {
    return {
      post: {
        title: '',
        date: '',
        description: '',
        html: ''
      }
    }
  },
  computed: {
    parsedDate () {
      return new Date(this.post.date)
    }
  },
  head () {
    return {
      title: `${this.post.title} - Changelog | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: this.post.description }
      ]
    }
  }
}
</script>

<style lang="scss">
  .news-post .markdown-content {
    h2 {
      border-bottom: 1px solid gray;
      margin-top: 2em;
    }

    ul {
      margin-top: 0;
    }
  }
</style>
