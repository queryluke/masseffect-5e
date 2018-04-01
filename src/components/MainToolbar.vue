<template lang="pug">
  v-toolbar(dark app fixed clipped-left style="z-index: 10;")
    v-toolbar-side-icon(v-if="showHamburger" v-on:click="toggleSidebar").hidden-lg-and-up
    v-toolbar-title
      router-link(to="/").nav-brand
        img(:src="`../assets/images/me5e.svg`")
        span.hidden-xs-only Mass Effect 5e
    v-spacer
    v-toolbar-items.hidden-sm-and-down
      v-btn(v-for="(item, index) in items" v-bind:key="index" v-bind:to="item.route" flat)
        span {{ item.title }}
      v-btn(href="https://goo.gl/forms/3wZj8QhlsLv3XOJw1" target="_blank" flat)
        span.hidden-sm-and-down Feedback
    span.hidden-md-and-up
      v-btn(v-for="(item, index) in items" v-bind:key="index" v-bind:to="item.route" flat)
        v-icon.hidden-md-and-up {{ item.icon }}
      v-btn(href="https://goo.gl/forms/3wZj8QhlsLv3XOJw1" target="_blank" icon)
        v-icon.hidden-md-and-up feedback

</template>

<script>
  export default {
    computed: {
      showHamburger() {
        return !['home','about','printables','news'].includes(this.$route.name);
      }
    },
    data() {
      return {
        items: [
          {
            route: '/phb',
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
    name: 'MainToolbar',
    methods: {
      toggleSidebar () {
        this.$store.commit('toggleSidebar', !this.$store.state.sidebar)
      }
    },
  };
</script>

<style lang="stylus">
  .nav-brand
    text-decoration: none;

    img
      width: 30px;
      vertical-align: middle;

    span
      margin-left: 15px;
      color: white;
</style>
