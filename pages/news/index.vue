<template lang="pug">
  v-content
    section
      v-parallax(src="/images/parallax/illusive.png")
        v-layout(column align-center justify-center)
          h1.parallax-title News
    section
      v-container(grid-list-xl).mt-5
        v-layout(row wrap)
          v-flex(v-for="post in posts" v-bind:key="post.slug" xs12 sm6 lg4 d-flex)
            post-card(:post="post" height="185px")
</template>

<script>
  import {mapGetters} from 'vuex'
  import PostCard from '~/components/misc/PostCard.vue'

  export default {
    components: { PostCard },
    computed: {
      ...mapGetters(['getPosts'])
    },
    created () {
      this.posts = this.getPosts()
    },
    data () {
      return {
        posts: []
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | News',
        meta: [
          { hid: 'description', name: 'description', content: 'News...' }
        ]
      }
    },
    layout: 'dark'
  }
</script>
