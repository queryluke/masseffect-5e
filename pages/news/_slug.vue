<template lang="pug">
  v-content.blue-grey.lighten-4
    v-container
      div.news-post
        h1.display-3 {{ post.title }}
        h2.subheading #[em {{ post.created | formatDate('DDDD, MMMM DD, YYYY') }}]
        div(v-html="postFile").my-3
      v-btn(to="/news" nuxt).primary
        v-icon keyboard_arrow_left
        span Back to news
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['getPost']),
      post () {
        return this.getPost(this.$route.params.slug)
      },
      postFile () {
        if (this.post.filename) {
          return require(`~/data/posts/${this.post.filename}`)
        } else {
          this.$nuxt.error({statusCode: 404})
        }
      }
    },
    head () {
      return {
        title: `Mass Effect 5e | News - ${this.post.title}`,
        meta: [
          { hid: 'description', name: 'description', content: this.post.description }
        ]
      }
    },
    layout: 'default-light'
  }
</script>

<style>
  ul, ol {
    margin-left: 2em;
  }
</style>