<template lang="pug">
  v-toolbar(dark fixed app clipped-left :prominent="prominent" v-bind:extended="prominent")
    v-toolbar-side-icon(v-on:click="toggleSidebar").hidden-lg-and-up
    v-toolbar-title
      slot(name="toolbarTitle")
    v-spacer
    v-toolbar-items(id="phbToolbarItems").hidden-md-and-up
      slot(name="toolbarItems")
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        items: [
          {
            route: '/phb/intro',
            title: 'Player\'s Handbook'
          },
          {
            route: '/assets',
            title: 'Assets'
          },
          {
            route: '/news',
            title: 'News'
          },
          {
            route: '/about',
            title: 'About'
          },
          {
            route: '/contributing',
            title: 'Feedback'
          }
        ]
      }
    },
    methods: {
      ...mapActions(['toggleSidebar'])
    },
    props: {
      prominent: Boolean
    }
  }
</script>