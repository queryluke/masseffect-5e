<template lang="pug">
  div.news-post
    h1.display-3 {{ post.attributes.title }}
    h2.subheading #[em {{ post.created | formatDate('DDDD, MMMM DD, YYYY') }}]
    div(v-html="postFile").my-3
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
          return require(`~/posts/${this.post.filename}`)
        } else {
          this.$nuxt.error({statusCode: 404})
        }
      }
    },
    head () {
      return {
        title: `Mass Effect 5e | News - ${this.post.attributes.title}`,
        meta: [
          { hid: 'description', name: 'description', content: this.post.attributes.description }
        ]
      }
    },
    layout: 'post'
  }
</script>

<style>
  ul, ol {
    margin-left: 2em;
  }
</style>