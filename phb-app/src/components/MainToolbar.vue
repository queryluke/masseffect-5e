<template lang="jade">
  v-toolbar(fixed dark)
    v-toolbar-side-icon(@click.stop="toggleSidebar")
    v-toolbar-title
      img(:src="`../assets/images/me5e.svg`" class="nav-brand")
      span Mass Effect 5e - Players Handbook
    v-spacer
    v-toolbar-items.hidden-sm-and-down
      v-btn(flat href="../")
        v-icon home
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
    width: 30px;
    vertical-align: middle;
</style>
