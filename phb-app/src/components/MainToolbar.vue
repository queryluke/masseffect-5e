<template lang="pug">
  v-toolbar(fixed dark)
    v-toolbar-side-icon(@click.stop="toggleSidebar")
    v-toolbar-title
      router-link(to="/").nav-brand
        img(:src="`../assets/images/me5e.svg`")
        span Mass Effect 5e - Player's Handbook
</template>

<script>
  export default {
    name: 'MainToolbar',
    methods: {
      toggleSidebar () {
        this.$store.commit('toggleSidebar', !this.$store.state.sidebar)
      }
    }
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
