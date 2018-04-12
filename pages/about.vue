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
    section
      v-layout(row wrap justify-center)
        v-flex(xs12 sm8).my-3
          div.text-xs-center
            h2.headline Contributors
            p.
              Since we're currently a team of two, we have to give major credit to the list of people who've contributed
              in a variety of ways.
        v-flex(xs12 sm8).mb-2
          v-list(three-line)
            template(v-for="item in contributors")
              v-list-tile(avatar v-bind:key="item.name")
                v-list-tile-avatar(size="48")
                  img(:src="item.image")
                v-list-tile-content
                  v-list-tile-title {{ item.name }}
                  v-list-tile-sub-title(v-html="item.desc")
              v-divider(inset)
        v-flex(xs12 sm8)
          v-card.elevation-0.transparent
            v-alert(type="info" v-bind:value="true" outline).
              If, we've missed anyone it was merely an oversight on our part and not intentional.
              Feel free to contact us and we'll be happy to give you a shout out. Or if you're on the list and want to be
              removed, have your name changed, or update your picture. Contact us as well.
    section.mt-5.pt-5
      v-layout(row wrap justify-center).mt-5
        v-flex(xs12 sm8).my-2
          div.text-xs-center
            h2.headline Image Attributuions
            p.px-5.
              Finally, there are a host of Creative Commons images that I've used, so I'd like to attribute and thank
              these indirect contributors. Any images not listed were either created by Luke Aeschleman or come from the the
              #[a(href="http://masseffect.wikia.com/wiki/Mass_Effect_Wiki" target="_blank").blue--text.text--lighten-3  Mass Effect Wiki].
      v-container(grid-list-md)
        v-layout(row wrap)
          v-flex(v-for="att in attributions" v-bind:key="att.attribution" xs12 sm6 md4 lg3 d-flex)
            v-card(:href="att.source" v-bind:alt="att.title" target="_blank" hover)
              v-card-media(:src="att.path" height="200px" contain).blue-grey.lighten-5
              v-card-title(color="grey darken-3") {{ att.attribution }}
</template>

<script>
  import AboutCard from '~/components/misc/AboutCard.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {AboutCard},
    computed: {
      ...mapGetters(['getData']),
      attributions () {
        return this.getData('attributions')
      }
    },
    data () {
      return {
        luke: {
          games: {
            me1: ['vanguard', 'sentinel'],
            me2: ['sentinel', 'engineer', 'vanguard', 'adept', 'soldier'],
            me3: ['sentinel', 'engineer', 'vanguard', 'infiltrator']
          }
        },
        contributors: [
          {
            name: 'SleightxHope',
            image: 'https://avatars3.githubusercontent.com/u/31451010?s=460&v=4',
            desc: 'test'
          },
          {
            name: 'Alex N',
            image: '/images/spells/tech.svg',
            desc: 'test'
          },
          {
            name: 'TheMarmotKing',
            image: 'https://avatars3.githubusercontent.com/u/37369223?s=460&v=4',
            desc: 'test'
          }
        ]
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