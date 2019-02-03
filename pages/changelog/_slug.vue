<template lang="pug">
  v-content.blue-grey.lighten-4
    v-container
      div.news-post
        h1.display-3 {{ post.attributes.title }}
        h2.subheading #[em {{ post.attributes.date | formatDate('DDDD, MMMM DD, YYYY') }}]
        div.markdown-content
          markdown-content(:component="post.vue")
      v-btn(to="/changelog" nuxt).primary
        v-icon keyboard_arrow_left
        span Back to changelog
</template>

<script>
  export default {
    data () {
      return {
        id: this.$route.params.slug
      }
    },
    computed: {
      post () {
        if (this.id) {
          return require(`~/static/data/changelog/${this.id}.md`)
        }
      }
    },
    head () {
      return {
        title: `${this.post.attributes.title} - Changelog | Mass Effect 5e`,
        meta: [
          { hid: 'description', name: 'description', content: this.post.attributes.description }
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
