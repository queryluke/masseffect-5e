<template lang="pug">
  v-content
    // Character Sheets
    h2.display-3.font-weight-thin.text-xs-center.mt-5 Character Sheets
    v-container(grid-list-xl)
      h3.text-xs-center.display-1 Printable
      v-layout(row wrap justify-center)
        v-flex(xs12 sm6 md4)
          v-btn(block href="https://drive.google.com/open?id=1aBCbmwDgmChg6d6K0yegHTab-R6cQD28" target="_blank").primary Official
        v-flex(xs12 sm4)
          v-btn(block href="https://drive.google.com/open?id=10oQ1UTmimRmKe-XXajEpeERhfRQAL-ro" target="_blank").primary Fillable
          div.text-xs-center created by #[a(href="https://www.reddit.com/user/wretchedcrows" target="_blank" class="blue--text text--lighten-3") /u/wretchedcrows]
      h3.text-xs-center.display-1.mt-4 Google Sheets
      v-layout(row wrap justify-center)
        v-flex(xs12 sm4)
          v-btn(block href="https://drive.google.com/open?id=1tpYcan_DbAzfqfszz_2GHYEX6UrliiqewNiEieIPy5Y" target="_blank").primary Official
        v-flex(xs12 sm4)
          v-btn(block href="https://drive.google.com/open?id=1NesskTT0bxRF2D4ImuyWUo1Mu389Q-KP3uo934mQF-w" target="_blank").primary by Ben McPherson
        v-flex(xs12 sm4)
          v-btn(block href="https://drive.google.com/open?id=1r-JCa_rqmKSp7-UKf1EP67w6Dl_Pm_JEdaZJMS-R22Y" target="_blank").primary by GameMasterPo

    // Premade
    h2.display-3.font-weight-thin.text-xs-center.mt-5 Premade Characters
    v-container(grid-list-xl)
      v-layout(row wrap justify-center)
        v-flex(xs12 sm4)
          v-btn(block href="https://drive.google.com/open?id=1XlaCFmUpouNIaQSa1w8SnFRNEQrDcfpX" target="_blank").primary Official
          p More coming soon!


    // Roll20
    h2.display-3.font-weight-thin.text-xs-center.mt-5 Roll20
    v-container(grid-list-xl)
      v-layout(row wrap)
        v-flex(xs12 md6)
          // Character sheets
          h3.text-xs-center.display-1 Character Sheets
          v-layout(row wrap justify-center)
            v-flex(xs12)
              v-card
                v-card-text
                  p.
                    Sadly, a change in the Roll20 interface has broken the Roll20 character sheets by John G. and EnricoDandolo1.
                    If you're savvy with Roll20 code and can help out, please let us know!
            //v-flex(xs12 sm6 md4)
              v-card
                v-card-title
                  p.title by John G.
                v-card-text
                  p.
                    When you create a new game in Roll20, search for #[em Mass Effect] in the character sheet select dropdown.
                    Choose the one under the #[strong Dungeons and Dragons] header.
            // v-flex(xs12 sm6 md4)
              v-card
                v-card-title
                  p.title by EnricoDandolo1
                v-card-text
                  p.mb-0.
                    An alternate take by EnricoDandolo1. You can upload the files to Roll20.
                  v-btn(flat href="https://drive.google.com/drive/folders/18-rNxocsUeByAI9dF8Qv5IzJD6rMn77Y?usp=sharing" target="_blank").primary Files
        v-flex(xs12 sm6)
          // Tokens
          h3.text-xs-center.display-1 Tokens
          v-layout(row wrap justify-center)
            v-flex(xs12 sm6 md4)
              v-btn(block href="https://drive.google.com/open?id=1SfFEb6jgh2J2SXIiWVUB5XtrSSQ3GEi8" target="_blank").primary by Andrew Ouellette

    // PDF of Rules
    h2.display-3.font-weight-thin.text-xs-center.mt-5 Player's Manual
    v-container(grid-list-xl)
      v-layout(row wrap justify-center)
        v-flex(xs12 sm6)
          v-alert(:value="true" type="warning").black--text.
            The PDF is auto-generated from components on the website, therefore is very barebones and aesthetically limited. We
            will work on an official PDF version of the rules after our v1.0.0 release. The link below will take you
            to a Google Drive folder that has all of the past version PDFs (since we started doing that)
      v-layout(row wrap justify-center)
        v-flex(xs12 sm6 md4)
          v-btn(block href="https://drive.google.com/open?id=1eDfgpG3JplKUjrIdySJKmyC4qxTi2MUT" target="_blank").primary PDF Player's Manual

    // Spell Cards
    h2.display-3.font-weight-thin.text-xs-center.mt-5 Spell Cards
    v-container(grid-list-xl)
      v-layout(row wrap).mb-5
        v-flex(xs12 sm6 offset-sm3 md4 offset-md4)
          v-btn(block to="/print/spell-cards" ).primary Spell Cards

</template>

<script>

export default {
  head () {
    return {
      title: 'Assets | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Mass Effect 5e is more than a rule set. We have also created character sheets, spell cards, and other great tabletop assets.' }
      ]
    }
  },
  layout: 'dark'
}
</script>
