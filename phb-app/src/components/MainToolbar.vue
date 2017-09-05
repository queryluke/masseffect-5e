<template>
  <v-toolbar fixed dark>
    <v-toolbar-side-icon v-on:click="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>
      <img :src="`../assets/images/me5e.svg`" class="nav-brand">
      Mass Effect 5e - Players Handbook
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat href="../"><v-icon>home</v-icon></v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'MainToolbar',
    props: ['drawer'],
    methods: {
      toggleDrawer () {
        this.$emit('toggleDrawer');
      }
    },
  };
</script>

<style lang="stylus">
  .nav-brand
    width: 30px;
    vertical-align: middle;
</style>
