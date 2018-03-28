<template lang="pug">
  v-content
    // Character Sheets
    v-container(grid-list-xl)
      v-layout(row wrap).my-5
        v-flex(xs12).my-3
          div.text-xs-center
            h2.headline Character Sheets
        v-flex(xs12 sm6).text-xs-center
          object(data="/assets/me5e_cs_front.pdf" type="application/pdf" width="100%" height="600px")
            p #[a(href="/assets/me5e_cs_front.pdf") Mass Effect 5e - Character Sheet (Front)]
        v-flex(xs12 sm6).text-xs-center
          object(data="/assets/me5e_cs_back.pdf" type="application/pdf" width="100%" height="600px")
            p #[a(href="/assets/me5e_cs_back.pdf") Mass Effect 5e - Character Sheet (Back)]
        v-flex(xs12)
          v-btn(block href="/assets/me5e_cs_front_back.pdf" download="Mass_Effect_5e_Character_Sheet.pdf").primary Download Front & Back
      v-layout(row wrap).my-5
        v-flex(xs12).my-3
          div.text-xs-center
            h2.headline Spell Cards
</template>

<script>

export default {
  name: 'Assets',
};
</script>

<style lang="stylus">

</style>
