<template lang="pug">
  v-content
    // Character Sheets
    h2.display-2.text-xs-center.mt-5 Character Sheets
    v-container(grid-list-xl)
      h3.text-xs-center.title Printable
      v-layout(row wrap justify-center)
        v-flex(xs12 sm6 md4)
          v-btn(block href="https://drive.google.com/open?id=1aBCbmwDgmChg6d6K0yegHTab-R6cQD28" target="_blank").primary Standard
      h3.text-xs-center.title.mt-4 Fillable
      v-layout(row wrap justify-center)
        v-flex(xs12 sm4)
          v-btn(block href="https://drive.google.com/open?id=1gF1Y2KPgICj3rTJx6EYlJ__inGRSKMGX" target="_blank").primary by Szirach
        v-flex(xs12 sm4)
          v-btn(block href="https://drive.google.com/open?id=1eXwjbZQH5z7ACZw60WJ2AMKla94quGAD" target="_blank").primary by Thessian Shadow
        v-flex(xs12 sm4)
          v-btn(block href="https://drive.google.com/open?id=1SPghERVzFgEva4C11xRbnuc8i1RYKBbu" target="_blank").primary by theNamelessOne
    // Tokens
    h2.display-2.text-xs-center.mt-5 NPC Tokens
    v-container(grid-list-xl)
      v-layout(row wrap justify-center)
        v-flex(xs12 sm6 md4)
          v-btn(block href="https://drive.google.com/open?id=1SfFEb6jgh2J2SXIiWVUB5XtrSSQ3GEi8" target="_blank").primary by Andrew Ouellette
    // Spell Cards
    h2.display-2.text-xs-center.mt-5 Spell Cards
    v-container(grid-list-xl)
      v-layout(row wrap).mb-5
        v-flex(v-for="item in classes" v-bind:key="item.id").xs12.sm6.md4
          v-card(hover v-bind:to="`/print/spell-cards/${item.id}`").ma-2
            v-card-media(:src="`/images/classes/${item.id}.svg`" height="100px" contain)
              v-container(fill-height fluid)
                v-layout(fill-height)
                  v-flex(xs12 align-end flexbox)
                    h3.title {{ item.name }} #[span.sr-only Spell Cards]
        v-flex(xs12 sm6 offset-sm3 md4 offset-md4)
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
        { hid: 'description', name: 'description', content: 'Mass Effect 5e is more than a rule set. We have also created character sheets, spell cards, and other great tabletop assets.' }
      ]
    }
  },
  layout: 'dark'
}
</script>
