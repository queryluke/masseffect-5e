<template lang="pug">
  v-content
    section
      v-parallax(src="/images/parallax/illusive.jpg" alt="Illusive Man")
        v-layout(column align-center justify-center).white--text
          me-header-logo
          h1.sr-only Missions
    section
      v-layout(row wrap justify-center).mt-5
        v-flex(xs12 sm10 md8).my-3
          div.text-xs-center
            h2.display-2 Missions
        v-flex(xs12)
          div.text-xs-center.mt-4
            h3.headline Submit your own!
            p.
              If you've written your own mission or adventure for Mass Effect 5e, email it to us at #[a(mailto="info@n7.world" subject="Mission Submission").blue--text.text--lighten-3 info@n7.world] and
              we'll post it here!
    section
      v-container(grid-list-xl)
        v-layout(row wrap justify-space-around)
          v-flex(xs12 md3 d-flex v-for="m in missions" v-bind:key="m.name" )
            v-card
              v-container(grid-list-sm)
                v-layout
                  v-flex(xs4).pa-0
                    v-img(:src="m.img" height="125px" contain)
                  v-flex(xs8).pa-0
                    v-card-title(primary-title).pt-2
                      div
                        div.headline {{ m.name }}
                        div.subheading #[em by {{ m.author }}]
                        div For Operatives: {{ m.levels }}
              v-divider
              v-card-actions
                v-btn(flat dark :href="m.href" target="_blank") View
                v-btn(v-if="m.feedback" v-bind:href="m.feedback" target="_blank") Feedback
</template>

<script>
export default {
  data () {
    return {
      missions: [
        {
          name: 'Raid of the Basking Fish',
          levels: '1st Level',
          author: 'Mike Towle',
          href: 'https://drive.google.com/open?id=0BxLeDaHVwlDzWUNJb29zMkpiZS1LazItQ3l0aEozWWJWSnBn',
          feedback: '',
          img: '/images/missions/raid_of_the_basking_fish.jpg'
        },
        {
          name: 'Getting Down to Business',
          levels: '1st Level',
          author: 'Ryan Clinch',
          href: 'https://drive.google.com/open?id=14eOWfAq6htG-16vQQrFUvDX-pfoYPONP',
          feedback: '',
          img: '/images/missions/getting_down_to_business.png'
        },
        {
          name: 'Osiris Station',
          levels: '4th to 5th level',
          author: 'Hugh Thompson',
          href: 'https://drive.google.com/open?id=1YGOeTyLIuAyh9it6SVwWMXKXlyYnAW-TkITcHbkqebc',
          feedback: '',
          img: '/images/missions/osiris_station.jpg'
        }
      ]
    }
  },
  head () {
    return {
      title: 'Missions | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Pre-written adventures and missions for Mass Effect 5e.' }
      ]
    }
  },
  layout: 'dark'
}
</script>
