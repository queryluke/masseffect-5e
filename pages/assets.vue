<template lang="pug">
  v-content
    // Character Sheets
    h2.display-3.font-weight-thin.text-xs-center.mt-5 Character Sheets
    v-container(grid-list-xl)
      h3.text-xs-center.display-1 Printable
      v-layout(row wrap justify-center)
        v-flex(xs12 sm6 md4)
          v-btn(block href="https://drive.google.com/open?id=1aBCbmwDgmChg6d6K0yegHTab-R6cQD28" target="_blank").primary Official
      h3.text-xs-center.display-1.mt-4 Fillable
      v-layout(row wrap justify-center)
        v-flex(xs12 sm4)
          v-btn(block href="https://drive.google.com/open?id=1gF1Y2KPgICj3rTJx6EYlJ__inGRSKMGX" target="_blank").primary by Szirach
        v-flex(xs12 sm4)
          v-btn(block href="https://drive.google.com/open?id=1eXwjbZQH5z7ACZw60WJ2AMKla94quGAD" target="_blank").primary by Thessian Shadow
        v-flex(xs12 sm4)
          v-btn(block href="https://drive.google.com/open?id=1SPghERVzFgEva4C11xRbnuc8i1RYKBbu" target="_blank").primary by theNamelessOne
      h3.text-xs-center.display-1.mt-4 Google Sheets
      v-layout(row wrap justify-center)
        v-flex(xs12 sm4)
          v-btn(block href="https://docs.google.com/spreadsheets/d/1eEbLhu-w016G2AhjVvO2x_p3AGQrqUj_aVc8om4SKZs/edit?usp=sharing" target="_blank").primary by Ben McPherson
        v-flex(xs12 sm4)
          v-btn(block href="https://docs.google.com/spreadsheets/d/1r-JCa_rqmKSp7-UKf1EP67w6Dl_Pm_JEdaZJMS-R22Y/edit?usp=sharing" target="_blank").primary by GameMasterPo

    // Roll20
    h2.display-3.font-weight-thin.text-xs-center.mt-5 Roll20
    v-container(grid-list-xl)
      // Character sheets
      h3.text-xs-center.display-1 Character Sheets
      v-layout(row wrap justify-center)
        v-flex(xs12 sm6 md4)
          v-card
            v-card-title
              p.title by John G.
            v-card-text
              p.
                When you create a new game in Roll20, search for #[em Mass Effect] in the character sheet select dropdown.
                Choose the one under the #[strong Dungeons and Dragons] header.
        v-flex(xs12 sm6 md4)
          v-card
            v-card-title
              p.title by EnricoDandolo1
            v-card-text
              p.mb-0.
                An alternate take by EnricoDandolo1. You can upload the files to Roll20.
              v-btn(flat href="https://drive.google.com/drive/folders/18-rNxocsUeByAI9dF8Qv5IzJD6rMn77Y?usp=sharing" target="_blank").primary Files
      // Tokens
      h3.text-xs-center.display-1 Tokens
      v-layout(row wrap justify-center)
        v-flex(xs12 sm6 md4)
          v-btn(block href="https://drive.google.com/open?id=1SfFEb6jgh2J2SXIiWVUB5XtrSSQ3GEi8" target="_blank").primary by Andrew Ouellette

    // PDF of Rules
    h2.display-3.font-weight-thin.text-xs-center.mt-5 Player's Manual
    v-container(grid-list-xl)
      v-layout(row wrap justify-center)
        v-flex(xs12 sm6 md4)
          v-alert(:value="true" type="warning").black--text.
            The PDF is auto-generated from compoents on the website, therefore is very barebones and aesthetically limited. We
            will work on an official PDF version of the rules after our v1.0.0 release.
      v-layout(row wrap justify-center)
        v-flex(xs12 sm6 md4)
          v-btn(block href="https://drive.google.com/open?id=1DutYdSFORN7-jLi2r9-bpCK763je-k9h" target="_blank").primary v0.8.4
        v-flex(xs12 sm6 md4)
          v-btn(block href="https://drive.google.com/open?id=1H6ywGQ80GPqoIYh0cvHnqs5UdEV5QZib" target="_blank").primary v0.9.0

    // Spell Cards
    h2.display-3.font-weight-thin.text-xs-center.mt-5 Spell Cards
    v-container(grid-list-xl)
      v-layout(row wrap).mb-5
        v-flex(v-for="item in classes" v-bind:key="item.id").xs12.sm6.md4
          v-card(hover v-bind:to="`/print/spell-cards/${item.id}`").ma-2
            v-img(:src="`/images/classes/${item.id}.svg`" height="100px" contain)
              v-container(fill-height fluid)
                v-layout(fill-height)
                  v-flex(xs12 align-end flexbox)
                    h3.title {{ item.name }} #[span.sr-only Spell Cards]
        v-flex(xs12 sm6 offset-sm3 md4 offset-md4)
          v-btn(block to="/print/spell-cards" ).primary All Spell Cards

</template>

<script>
import classes from '~/static/data/classes'

export default {
  data () {
    return {
      classes
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
