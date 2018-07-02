<template lang="pug">
  v-toolbar(dark fixed app clipped-left :prominent="prominent" v-bind:extended="prominent")
    v-toolbar-side-icon(v-on:click="toggleSidebar").hidden-lg-and-up
    v-toolbar-title
      router-link(to="/" v-if="navBrand").nav-brand
        img(src="/images/me5e.svg")
        span Mass Effect 5e
      slot(name="toolbarTitle" v-else)
    v-spacer
    v-toolbar-items(v-if="primaryNavigation").hidden-sm-and-down
      v-btn(v-for="(item, index) in items" v-bind:key="index" v-bind:to="item.route" flat)
        span {{ item.title }}
      v-menu(bottom left).hidden-md-and-up
        v-btn(slot="activator" icon dark) #[v-icon more_vert]
        v-list
          v-list-tile(v-for="(item, index) in items" v-bind:key="index" v-bind:to="item.route")
            v-list-tile-title {{ item.title }}
    slot(name="toolbarItems" v-else)


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
      toggle: {
        type: Boolean,
        default: false
      },
      prominent: Boolean,
      primaryNavigation: {
        type: Boolean,
        default: false
      },
      navBrand: {
        type: Boolean,
        default: false
      }
    }
  }
</script>