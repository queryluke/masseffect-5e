<template lang="pug">
  v-content
    section
      v-parallax(src="/images/parallax/milky_way.jpg")
        v-layout(column align-center justify-center).white--text
          img(src="/images/me5e_logo_notm.png" alt="mass effect 5e").mt-5.me-title-logo
          h1.display-1.mt-5 About #[span.sr-only Mass Effect 5e]
    section
      v-layout(column wrap align-center).my-5
        v-flex(xs12 sm8).my-3
          div.text-xs-center
            h2.headline Creators
        v-flex(xs12)
          v-container(grid-list-xl)
            v-layout(row wrap align-center)
              v-flex(xs12 md6)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-avatar(size="128")
                      img(src="https://avatars0.githubusercontent.com/u/12414786?s=460&v=4" alt="Luke A")
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    v-flex.pb-0
                      div.headline Luke Aeschleman
                    v-flex.pt-1
                      div Creator, Site Developer
                  v-card-text.pt-0
                    p.
                      Luke fell in love with the Mass Effect Universe after playing Mass Effect 2. He's since amassed a number
                      of playthroughs of all the games, DLC, and spent WAY too much time playing ME3 Multiplayer. By
                      day, Luke is a Web Developer and Librarian at NC State University. By night, he DMs, codes, watches
                      baseball and practices Si Lum Kung-Fu
              v-flex(xs12 md6)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-avatar(size="128")
                      img(src="https://avatars0.githubusercontent.com/u/679172?s=460&v=4" alt="Hugh T")
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    v-flex.pb-0
                      div.headline Hugh Thompson
                    v-flex.pt-1
                      div Editor-in-Chief
                  v-card-text.pt-0
                    p.
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
        v-flex(xs12 sm8).my-3
          div.text-xs-center
            h2.headline Contributors

</template>

<script>
  import AboutCard from '~/components/misc/AboutCard.vue'

  export default {
    components: {AboutCard},
    data () {
      return {
        luke: {
          games: {
            me1: ['vanguard', 'sentinel'],
            me2: ['sentinel', 'engineer', 'vanguard', 'adept', 'soldier'],
            me3: ['sentinel', 'engineer', 'vanguard', 'infiltrator']
          }
        }
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | About',
        meta: [
          { hid: 'description', name: 'description', content: 'Learn more about the Mass Effect 5e creators and contributors.' }
        ]
      }
    }
  }
</script>