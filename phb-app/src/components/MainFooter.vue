<template>
  <v-footer class="pa-3 primary">
    <v-spacer></v-spacer>
    <div id="copyrightYear">© {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script>
  export default {
    name: 'MainFooter',
  };
</script>

<style>
  #copyrightYear {
    color: white;
  }
</style>
