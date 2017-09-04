<template>
  <v-toolbar fixed dark>
    <v-toolbar-side-icon v-on:click="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>Mass Effect 5e - Players Handbook</v-toolbar-title>
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
