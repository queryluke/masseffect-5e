<template>
  <v-container>
    <h2>Player's Manual PDF</h2>
    <v-btn to="pdf">
      View
    </v-btn>
    <hr class="ma-3">
    <h2>Character Sheets, Roll20 Assets, and other things</h2>
    <p>
      The discord community has been busy collecting a lot of great assets. To make deliver of that content faster,
      everything can be found in a public Google Drive.
    </p>
    <v-alert :value="true" type="info">
      Please note that you have view-only access to these documents. If you would like to edit a document (such as using a character sheet for your
      own character), you will need to make a copy of the document: #[strong File > Make a copy]. If that option is greyed out, you need to sign
      into your google account to make a copy in your personal Google Drive.
    </v-alert>
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.link" target="_blank">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <hr class="ma-3">
    <h2>Printable Spell Cards</h2>
    <v-btn to="spell-cards">
      View
    </v-btn>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      items: [
        {
          title: 'Character Sheets',
          link: 'https://drive.google.com/drive/folders/1RsYfHzmvv-md8_dIrQU65LpWzTr0kpCR?usp=sharing'
        },
        {
          title: 'Pre-written Missions',
          link: 'https://drive.google.com/drive/u/0/folders/1B6KHBiOIWvtOzhqdxXryzZ3WMVAjpWMt'
        },
        {
          title: 'Roll20 Sheets & Tokens',
          link: 'https://drive.google.com/drive/folders/1IbS1Rgym6vUjA9ntYgYMmit7dzhANoaI?usp=sharing'
        },
        {
          title: 'Premade Characters',
          link: 'https://drive.google.com/drive/folders/1MJCLI665gTVni_swC2tMUd1cv8GILF0u?usp=sharing'
        },
        {
          title: 'Other items (spell card box, equipment sheets, etc.)',
          link: 'https://drive.google.com/drive/folders/1WpR2M9CpNKKRYTS_Gzi3Woq8NscRkxOY?usp=sharing'
        },
        {
          title: 'View All',
          link: 'https://drive.google.com/drive/u/0/folders/10S3R_Tfi4bJ9X2b6-4OI65m9F8fx6i0P'
        }
      ]
    }
  },
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
