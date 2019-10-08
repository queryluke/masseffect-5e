<template lang="pug">
  v-content.blue-grey.lighten-4
    v-container
      // PDF of Rules
      h2.display-1.font-weight-thin Player's Manual PDF
      v-btn(to="/print/pdf") View

      hr.ma-3

      // Character Sheets
      h2.display-1.font-weight-thin Character Sheets
      h3.title.mt-3 Printable

      h4 Version 2
      ul
        li
          a(href="https://drive.google.com/open?id=1wN7ALQLWtKoBmqOJtW10H7KpsYkjCM_A" target="_blank") Generic
      p created by Chris "OodSigma13" Dickson

      h4 Version 1
      ul
        li
          a(href="https://drive.google.com/open?id=1aBCbmwDgmChg6d6K0yegHTab-R6cQD28" target="_blank") Official
        li
          a(href="https://drive.google.com/open?id=1GLotuedjZ7AtLMhooBmhEFSU8TRuI4A7" target="_blank") Fillable by /u/rpk0714

      h3.title.mt-3 Google Sheets
      ul
        li
          a(href="https://drive.google.com/open?id=1mj7JDIerstCcQjowNsfasNr42CcKCFrOIf3RPYRC1DA" target="_blank") Official
        li
          a(href="https://drive.google.com/open?id=1NesskTT0bxRF2D4ImuyWUo1Mu389Q-KP3uo934mQF-w" target="_blank") by Ben McPherson
        li
          a(href="https://drive.google.com/open?id=1r-JCa_rqmKSp7-UKf1EP67w6Dl_Pm_JEdaZJMS-R22Y" target="_blank") by GameMasterPo

      // Roll20
      h3.title.mt-3 Roll20
      p.
        An official Roll20 Character Sheet has proved to be a very difficult task. There have been a number of attempts, which are
        linked below. Mileage may vary. If you do get a version working, please let us know.
      ul
        li
          a(href="https://www.reddit.com/r/masseffect5e/comments/cqwokr/updated_roll20_5e_ogl_sheet/" target="_blank") by u/Kiva126
        li
          a(href="https://www.reddit.com/r/masseffect5e/comments/c7h01l/updated_roll20_sheet/" target="_blank") by /u/Danrconway

      hr.ma-3

      // Spell Cards
      h2.display-1.font-weight-thin Spell Cards
      v-btn(to="/print/spell-cards") View

      hr.ma-3

      // Premade
      h2.display-1.font-weight-thin Premade Characters
      p If you'd like to contribute more pregens see #[a(href="https://www.reddit.com/r/masseffect5e/comments/ch190c/pregens/" target="_blank") this post].
      v-btn(href="https://drive.google.com/open?id=1XlaCFmUpouNIaQSa1w8SnFRNEQrDcfpX" target="_blank") View

      hr.ma-3

      h2.display-1.font-weight-thin Other
      ul
        li
          a(href="https://drive.google.com/open?id=1SfFEb6jgh2J2SXIiWVUB5XtrSSQ3GEi8" target="_blank") Roll20 Tokens by Andrew Ouellette
        li
          a(href="https://drive.google.com/file/d/0BxLeDaHVwlDzcjZtRFFjWUFQb0dGS0NEcV9nQm8xbkw5d0tV/view?usp=sharing" target="_blank") Printable Tabletop Tokens by B. Coar
        li
          a(href="https://drive.google.com/open?id=0BxLeDaHVwlDzczdTZlBNOERsR2Z4cVN2WVI2dG9LYlBFbFlv" target="_blank") Spell Card Box by B. Coar


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
  }
}
</script>
