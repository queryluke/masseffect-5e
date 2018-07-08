<template lang="pug">
  v-toolbar(dark fixed app)
    v-toolbar-title
      nuxt-link(to="/").nav-brand
        img(src="/images/me5e.svg")
        span Mass Effect 5e
    v-spacer
    v-toolbar-items.hidden-sm-and-down
      v-btn(v-for="(item, index) in primaryNavigation" v-bind:key="index" v-bind:to="item.route" flat)
        span {{ item.title }}
    v-menu(bottom left).hidden-md-and-up
      v-btn(slot="activator" icon dark) #[v-icon more_vert]
      v-list
        v-list-tile(v-for="(item, index) in primaryNavigation" v-bind:key="index" v-bind:to="item.route")
          v-list-tile-title {{ item.title }}
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters(['primaryNavigation'])
    }
  }
</script>