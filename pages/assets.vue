<template lang="pug">
  v-content
    // Character Sheets
    v-container(grid-list-xl)
      v-layout(row wrap).my-5
        v-flex(xs12).my-3
          div.text-xs-center
            h2.headline Character Sheets
        v-flex(xs12 sm6).text-xs-center
          object(data="/me5e_cs_front.pdf" type="application/pdf" width="100%" height="600px")
            p #[a(href="/assets/me5e_cs_front.pdf") Mass Effect 5e - Character Sheet (Front)]
        v-flex(xs12 sm6).text-xs-center
          object(data="/me5e_cs_back.pdf" type="application/pdf" width="100%" height="600px")
            p #[a(href="/assets/me5e_cs_back.pdf") Mass Effect 5e - Character Sheet (Back)]
        v-flex(xs12)
          v-btn(block href="/me5e_cs_front_back.pdf" download="Mass_Effect_5e_Character_Sheet.pdf").primary Download Front & Back
      v-layout(row wrap).my-5
        v-flex(xs12).my-3
          div.text-xs-center
            h2.headline Spell Cards
        v-flex(v-for="item in classes" v-bind:key="item.id").xs12.sm6.md4
          v-card(hover v-bind:to="`/print/spell-cards/${item.id}`").ma-2
            v-card-media(:src="`/images/classes/${item.id}.svg`" height="100px" contain)
              v-container(fill-height fluid)
                v-layout(fill-height)
                  v-flex(xs12 align-end flexbox)
                    h3.title {{ item.name }} #[span.sr-only Spell Cards]
        v-flex(xs12)
          v-btn(block to="/print/spell-cards" ).primary All Spell Cards

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getData'])
  },
  created () {
    this.classes = this.getData('classes')
  },
  data () {
    return {
      classes: []
    }
  },
  head () {
    return {
      title: 'Mass Effect 5e | Assets',
      meta: [
        { hid: 'description', name: 'description', content: 'Mass Effect 5e is more that a rule set. We have also created character sheets, spell cards, and other great tabletop assets.' }
      ]
    }
  }
}
</script>
