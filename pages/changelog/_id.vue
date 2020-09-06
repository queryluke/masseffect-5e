<template lang="pug">
  v-container
    div.news-post
      h1.display-3 {{ post.title }}
      h2.subheading #[em {{ parsedDate }}]
      me-html(:content="post.html" v-if="loading !== true")
    v-btn(to="/changelog" nuxt).primary
      v-icon arrow-left
      span Back to changelog
</template>

<script>
export default {
  async fetch () {
    this.post = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'changelog', id: this.$route.params.id })
    this.loading = false
    this.$store.commit('pageTitle', this.post.title)
  },
  data () {
    return {
      loading: true,
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
