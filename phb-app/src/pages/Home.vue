<template lang="pug">
  div(id="home")
    v-layout(row justify-space-around)
      v-flex.xs12
        img(:src="`../assets/images/me5e_logo_notm.png`" alt="mass effect 5e logo")
        p.subtitle Player's Handbook
        div.ma-5.text-xs-center
          v-btn(href="http://n7.world/") About, News, & Printables
          v-btn(href="https://github.com/queryluke/masseffect-5e/blob/master/CHANGELOG.md") Changelog
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

    p.subtitle
      font-size: 3em;
      text-align: center;
      margin-top 1em;
</style>
