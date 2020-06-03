<template lang="pug">
  v-content.blue-grey.lighten-4
    v-container
      // PDF of Rules
      h2.display-1.font-weight-thin Player's Manual PDF
      v-btn(to="/print/pdf") View

      hr.ma-3

      h2.display-1.font-weight-thin Character Sheets, Roll20 Assets, and other things
      p.
        The discord community has been busy collecting a lot of great assets. To make deliver of that content faster,
        everything can be found in a public Google Drive.

      ul
        li
          a(href="https://drive.google.com/drive/u/0/folders/10S3R_Tfi4bJ9X2b6-4OI65m9F8fx6i0P" target="_blank") All N7.World Assets
        li
          a(href="https://drive.google.com/drive/folders/1RsYfHzmvv-md8_dIrQU65LpWzTr0kpCR?usp=sharing" target="_blank") Character Sheets
        li
          a(href="https://drive.google.com/drive/folders/1IbS1Rgym6vUjA9ntYgYMmit7dzhANoaI?usp=sharing" target="_blank") Roll20 Sheets & Tokens
        li
          a(href="https://drive.google.com/drive/folders/1MJCLI665gTVni_swC2tMUd1cv8GILF0u?usp=sharing" target="_blank") Premade Characters
        li
          a(href="https://drive.google.com/drive/folders/1WpR2M9CpNKKRYTS_Gzi3Woq8NscRkxOY?usp=sharing" target="_blank") Other items (spell card box, equipment sheets, etc.)

      hr.ma-3

      // Spell Cards
      h2.display-1.font-weight-thin Spell Cards
      v-btn(to="/print/spell-cards") View

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
