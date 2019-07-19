<template lang="pug">
  v-content
    // Character Sheets
    h2.display-3.font-weight-thin.text-xs-center.mt-5 Character Sheets
    v-container(grid-list-xl)
      h3.text-xs-center.display-1 Printable
      h5.text-xs-center.title.mt-3 Version 2
      v-layout(row wrap justify-center)
        v-flex(xs12 sm6 md4)
          v-btn(block href="https://drive.google.com/open?id=1wN7ALQLWtKoBmqOJtW10H7KpsYkjCM_A" target="_blank").primary Generic
          div.text-xs-center created by Chris "OodSigma13" Dickson
      h5.text-xs-center.title.mt-3 Version 1
      v-layout(row wrap justify-center)
        v-flex(xs12 sm6 md4)
          v-btn(block href="https://drive.google.com/open?id=1aBCbmwDgmChg6d6K0yegHTab-R6cQD28" target="_blank").primary Official
        v-flex(xs12 sm4)
          v-btn(block href="https://drive.google.com/open?id=1GLotuedjZ7AtLMhooBmhEFSU8TRuI4A7" target="_blank").primary Fillable
          div.text-xs-center created by #[a(href="https://www.reddit.com/user/rpk0714" target="_blank" class="blue--text text--lighten-3") /u/rpk0714]
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
          h3.text-xs-center.display-1 Character Sheets (Beta)
          v-layout(row wrap justify-center)
            v-flex(xs12)
              v-card
                v-card-text
                  p.
                    Thanks #[a(href="https://www.reddit.com/u/Danrconway/" target="_blank" class="blue--text text--lighten-3") /u/Danrconway]
                    and #[a(href="https://www.reddit.com/u/Smeeg699/" target="_blank" class="blue--text text--lighten-3") u/Smeeg699] for working
                    on some updated Roll20 Character Sheets.
                v-card-actions
                  v-btn(flat href="https://drive.google.com/drive/folders/1kBZKPVFHqtHK-vfxwQbK3rmUagS9lhAc" target="_blank").primary Files
                  v-btn(flat href="https://www.reddit.com/r/masseffect5e/comments/c7h01l/updated_roll20_sheet/" target="_blank").primary Follow Progress

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
