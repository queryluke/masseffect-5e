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
        title: `Mass Effect 5e | Changelog - ${this.post.attributes.title}`,
        meta: [
          { hid: 'description', name: 'description', content: this.post.attributes.description }
        ]
      }
    }
  }
</script>
