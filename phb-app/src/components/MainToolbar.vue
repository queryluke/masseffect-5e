<template lang="pug">
  v-toolbar(dark app fixed clipped-left)
    v-toolbar-side-icon(@click.stop="toggleSidebar").hidden-md-and-up
    v-toolbar-title
      router-link(to="/").nav-brand
        img(:src="`../assets/images/me5e.svg`")
        span Mass Effect 5e - Player's Handbook
    v-spacer
    v-toolbar-items.hidden-sm-and-down
      v-btn(href="/masseffect-5e/about/" flat) About
      v-btn(href="/masseffect-5e/printables/" flat) Printables
      v-btn(href="/masseffect-5e/news/" flat) News
      v-btn(href="https://goo.gl/forms/3wZj8QhlsLv3XOJw1" target="_blank" flat) Feedback
</template>

<script>
  export default {
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
