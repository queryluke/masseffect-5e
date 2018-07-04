<template lang="pug">
  v-toolbar(dark fixed app clipped-left :clipped-right="clippedRight" v-bind:prominent="prominent" v-bind:extended="prominent")
    v-toolbar-side-icon(v-on:click="toggleSidebar").hidden-lg-and-up
    v-toolbar-title
      nuxt-link(to="/").nav-brand.hidden-sm-and-down
        img(src="/images/me5e.svg")
        span Mass Effect 5e
      span.hidden-md-and-up {{ pageTitle }}
    v-spacer
    v-toolbar-items.hidden-sm-and-down
      v-btn(v-for="(item, index) in primaryNavigation" v-bind:key="index" v-bind:to="item.route" flat)
        span {{ item.title }}
    span.hidden-md-and-up
      slot(name="toolbarItems")
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters(['pageTitle', 'primaryNavigation'])
    },
    methods: {
      ...mapActions(['toggleSidebar'])
    },
    props: {
      prominent: {
        type: Boolean,
        default: false
      },
      clippedRight: {
        type: Boolean,
        default: false
      }
    }
  }
</script>