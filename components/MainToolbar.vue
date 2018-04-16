<template lang="pug">
  v-toolbar(dark app fixed clipped-left style="z-index: 10;")
    v-toolbar-side-icon(v-if="showHamburger" v-on:click="toggleSidebar").hidden-lg-and-up
    v-toolbar-title
      router-link(to="/").nav-brand
        img(src="/images/me5e.svg")
        span.hidden-xs-only Mass Effect 5e
    v-spacer
    v-toolbar-items.hidden-sm-and-down
      v-btn(v-for="(item, index) in items" v-bind:key="index" v-bind:to="item.route" flat)
        span {{ item.title }}
      v-btn(href="https://goo.gl/forms/3wZj8QhlsLv3XOJw1" target="_blank" flat)
        span.hidden-sm-and-down Feedback
    span(id="mobileToolbar").hidden-md-and-up
      v-btn(v-for="(item, index) in items" v-bind:key="index" v-bind:to="item.route" icon)
        v-icon.hidden-md-and-up {{ item.icon }}
      v-btn(href="https://goo.gl/forms/3wZj8QhlsLv3XOJw1" target="_blank" icon)
        v-icon.hidden-md-and-up feedback
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    computed: {
      showHamburger () {
        return !['index', 'about', 'printables', 'news'].includes(this.$route.name)
      }
    },
    data () {
      return {
        items: [
          {
            route: '/phb/intro',
            title: 'Player\'s Handbook',
            icon: 'library_books'
          },
          {
            route: '/assets',
            title: 'Assets',
            icon: 'print'
          },
          {
            route: '/news',
            title: 'News',
            icon: 'new_releases'
          },
          {
            route: '/about',
            title: 'About',
            icon: 'help'
          }
        ]
      }
    },
    methods: {
      ...mapActions(['toggleSidebar'])
    }
  }
</script>

<style lang="scss">
  @media(max-width: 420px) {
    .toolbar__title {
      margin-left: 2px;
    }
  }
  @media(max-width: 350px){
    .toolbar .toolbar__content > .btn:first-child, .toolbar .toolbar__extension > .btn:first-child {
      margin-left: 5px;
    }
  }

  #mobileToolbar a.btn--icon {
    margin: 6px 2px;
  }
  .nav-brand {
    text-decoration: none;
  }
  .nav-brand img {
    width: 30px;
    vertical-align: middle;
  }
  .nav-brand span {
    margin-left: 15px;
    color: white;
  }


</style>
