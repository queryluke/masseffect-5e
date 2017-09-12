<template lang="jade">
  div(id="home")
    v-layout(row justify-space-around)
      v-flex.xs12
        img(:src="`../assets/images/me5e_logo_notm.png`" alt="mass effect 5e logo")
        p Player's Handbook
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
      font-size: 3em;
      text-align: center;
      margin-top 1em;
</style>
