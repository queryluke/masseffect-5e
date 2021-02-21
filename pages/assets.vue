<template>
  <v-container>
    <me-page-title />
    <v-alert :value="true" type="info" class="mt-8">
      Please note that you have view-only access to these documents. If you would like to edit a document (such as using a character sheet for your
      own character), you will need to make a copy of the document: <strong> File > Make a copy</strong>. If that option is greyed out, you need to sign
      into your google account to make a copy in your personal Google Drive.
    </v-alert>
    <v-row class="mt-8">
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        md="6"
        lg="4"
        xl="3"
      >
        <v-card
          hover
          :to="item.to ? item.to : undefined"
          :nuxt="typeof item.to !== 'undefined'"
          :href="item.link ? item.link : undefined"
          :target="item.link ? '_blank' : undefined"
        >
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>
            {{ item.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              :to="item.to ? item.to : undefined"
              :nuxt="typeof item.to !== 'undefined'"
              :href="item.link ? item.link : undefined"
              :target="item.link ? '_blank' : undefined"
            >
              View
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      items: [
        {
          title: 'Player\'s Manual PDF',
          description: 'Using Homebrewery, we\'ve converted this homebrew into a printable PDF. You can download the whole thing, and even make your own spin-offs.',
          to: '/print/pdf'
        },
        {
          title: 'Power Cards',
          description: 'Need power cards at your table? This page lets you customize the size and printing method to fix your needs.',
          to: '/print/power-cards'
        },
        {
          title: 'Character Sheets',
          description: 'A variety of character sheet options are available, many created and maintained by the community.',
          link: 'https://drive.google.com/drive/folders/1RsYfHzmvv-md8_dIrQU65LpWzTr0kpCR?usp=sharing'
        },
        {
          title: 'Pre-written Missions',
          description: 'Only a few are available to date. We welcome additional submissions from the community on Reddit or Discord.',
          link: 'https://drive.google.com/drive/u/0/folders/1B6KHBiOIWvtOzhqdxXryzZ3WMVAjpWMt'
        },
        {
          title: 'Everything Else',
          description: 'The community is actively creating a lot of other great assets, like power card boxes, pre-made character sheets, and additional homebrew ideas. You can view the whole lot here.',
          link: 'https://drive.google.com/drive/u/0/folders/10S3R_Tfi4bJ9X2b6-4OI65m9F8fx6i0P'
        }
      ]
    }
  },
  created () {
    this.$store.commit('pageTitle', 'Assets')
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
