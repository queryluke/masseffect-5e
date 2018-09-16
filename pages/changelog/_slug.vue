<template lang="pug">
  v-content.blue-grey.lighten-4
    v-container
      div.news-post
        h1.display-3 {{ post.title }}
        h2.subheading #[em {{ post.date | formatDate('DDDD, MMMM DD, YYYY') }}]
        div(v-html="postFile").my-3
      v-btn(to="/changelog" nuxt).primary
        v-icon keyboard_arrow_left
        span Back to changelog
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['getSingleVersion']),
      post () {
        return this.getSingleVersion(this.$route.params.slug)
      },
      postFile () {
        if (this.post.slug) {
          return require(`~/data/changelog/${this.post.slug}.md`)
        } else {
          this.$nuxt.error({statusCode: 404})
        }
      }
    },
    head () {
      return {
        title: `Mass Effect 5e | Changelog - ${this.post.title}`,
        meta: [
          { hid: 'description', name: 'description', content: this.post.description }
        ]
      }
    }
  }
</script>