<template lang="pug">
  v-content
    v-container(grid-list-xl).mt-5
      div.text-xs-center
        h1.display-2 Changelog
      v-layout(row wrap).mt-5
        v-flex(v-for="version in versions" v-bind:key="version.slug" xs12 sm6 lg4 d-flex)
          post-card(:post="version" height="185px")
</template>

<script>
  import {mapGetters} from 'vuex'
  import PostCard from '~/components/cards/PostCard.vue'

  export default {
    components: { PostCard },
    computed: {
      ...mapGetters(['getVersions'])
    },
    created () {
      this.versions = this.getVersions()
    },
    data () {
      return {
        versions: []
      }
    },
    head () {
      return {
        title: `Mass Effect 5e | Changelog`,
        meta: [
          { hid: 'description', name: 'description', content: 'Keep up-to-date with all the Mass Effect 5e system rule additions and updates.' }
        ]
      }
    },
    layout: 'dark'
  }
</script>
