<template lang="pug">
  v-toolbar(dark app clipped-left)
    v-toolbar-side-icon(v-on:click="toggleSidebar").hidden-lg-and-up
    v-toolbar-title
      router-link(to="/").nav-brand
        img(src="/images/me5e.svg")
        span Mass Effect 5e
    v-spacer
    v-toolbar-items.hidden-sm-and-down
      v-btn(v-for="(item, index) in items" v-bind:key="index" v-bind:to="item.route" flat)
        span {{ item.title }}
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
    }
  }
</script>