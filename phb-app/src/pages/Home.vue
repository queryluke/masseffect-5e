<template>
  <div id="home">
    <v-container fluid>
      <v-layout row justify-space-around>
        <v-flex xs12>
          <h1 class="sr-only">Mass Effect 5e - Player's Handbook</h1>
          <img src="assets/me5e_logo_notm.png" alt="mass effect 5e logo">
          <p>
            The Unofficial D&D 5th Edition conversion for the Mass Effect Universe
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
};
</script>

<style lang="stylus">
  #home
    img
      width: 100%;

    p
      font-size: 2em;
      text-align: center;
      margin-top 1em;
</style>
