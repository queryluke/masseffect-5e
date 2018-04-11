<template lang="pug">
  v-content
    // Main Parallax
    section
      v-parallax(src="/images/parallax/citadel.png")
        v-layout(column align-center justify-center).black--text
          img(src="/images/me5e_logo_notm.png" alt="mass effect 5e").mt-5.me-title-logo
          h1.sr-only Mass Effect 5e
          h2.headline.mt-4 Mass Effect + D&D 5th Edition
          p.subheading An Unofficial D&D 5th Edition homebrew for Mass Effect
          v-btn(to="/phb/intro" dark large).primary.my-3 Get Started
    // Intro Section
    section
      v-container
        v-layout(column wrap align-center).my-5
          v-flex(xs12 sm10 md8).my-3
            div.text-xs-center
              h3.headline Begin your journey
              p.
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
          v-flex(xs12)
            v-container(grid-list-xl)
              v-layout(row wrap align-center)
                // Races and classes
                v-flex(xs12 md4)
                  v-card.elevation-0.transparent
                    v-card-text.text-xs-center
                      v-avatar(size="60px")
                        img(src="/images/races/human.png" alt="Systems Alliance Symbol by Engorn on DeviantArt")
                      span.mx-2.headline +
                      v-avatar(size="60px" tile)
                        img(src="/images/classes/vanguard.png" alt="Vanguard Symbol")
                    v-card-title(primary-title).layout.justify-center
                      div.headline.text-xs-center Mix & Match
                    v-card-text.
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                // Weapons and armor
                v-flex(xs12 md4)
                  v-card.elevation-0.transparent
                    v-card-text.text-xs-center
                      v-avatar(size="60px" tile).primary
                        img(:src="`/images/weapons/assault_rifle.svg`" alt="Assault Rifle SVG")
                    v-card-title(primary-title).layout.justify-center
                      div.headline.text-xs-center Weapons & Armor
                    v-card-text.
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                // Enemies
                v-flex(xs12 md4)
                  v-card.elevation-0.transparent
                    v-card-text.text-xs-center
                      v-avatar(size="60px").primary
                        img(src="/images/misc/reaper_avatar.jpg" alt="Reaper swarm")
                    v-card-title(primary-title).layout.justify-center
                      div.headline.text-xs-center Unique Enemies
                    v-card-text.
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
    section
      v-parallax(src="/images/parallax/joker.png")
        v-layout(column align-center justify-center).white--text
          h2.parallax-title Play with the best tech
    section
      v-container(grid-list-xl).mt-5
        v-layout(row align-center wrap)
          // Interactive Handbook
          v-flex(xs12 md7)
            v-card.elevation-0.transparent
              v-card-title(primary-title)
                div.headline Interactive Handbook
              v-card-text.
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
              v-card-actions
                v-btn(to="/phb/intro" flat) Get Started #[v-icon chevron_right]
          v-flex(md5).hidden-sm-and-down.text-xs-center
            img(src="/images/misc/datapad.png" height="300" alt="data pad").px-5
          // Grunt Generator
          v-flex(md5).hidden-sm-and-down
            img(src="/images/misc/grunts.png" height="300" alt="").px-5
          v-flex(xs12 md7)
            v-card.elevation-0.transparent
              v-card-title(primary-title)
                div.headline NPC Generator
              v-card-text.
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
              v-card-actions
                v-spacer
                v-btn(to="/tools/grunts" flat) Generate #[v-icon chevron_right]
          // Printables
          v-flex(xs12 md7)
            v-card.elevation-0.transparent
              v-card-title(primary-title)
                div.headline Tabletop Assets
              v-card-text.
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
              v-card-actions
                v-btn(to="/assets" flat) Print #[v-icon chevron_right]
          v-flex(md5).hidden-sm-and-down.text-xs-center
            img(src="/images/misc/tt_assets.png" height="300").px-5
    section
      v-parallax(src="/images/parallax/illusive.png")
        v-layout(column align-center justify-center)
          h2.parallax-title Latest News
    section
      v-container(grid-list-md).my-5
        v-layout(row wrap)
          v-flex(d-flex xs12 md7)
            post-card(:post="recentPosts[0]" height="450px")
          v-flex(d-flex xs12 md5)
            v-layout(row wrap)
              v-flex(d-flex xs12)
                post-card(:post="recentPosts[1]" height="150px")
              v-flex(d-flex xs12)
                post-card(:post="recentPosts[2]" height="150px")
        v-layout(row wrap)
          v-flex(d-flex xs12 md4)
            post-card(:post="recentPosts[3]" height="200px")
          v-flex(d-flex xs12 md4)
            post-card(:post="recentPosts[4]" height="200px")
          v-flex(d-flex xs12 md4)
            post-card(:post="recentPosts[5]" height="200px")

</template>

<script>
  import {mapGetters} from 'vuex'
  import PostCard from '~/components/misc/PostCard.vue'

  export default {
    components: { PostCard },
    computed: {
      ...mapGetters(['getPosts']),
      recentPosts () {
        return this.getPosts(6)
      }
    },
    head () {
      return {
        title: `Mass Effect 5e`,
        meta: [
          { hid: 'description', name: 'description', content: 'Ever wanted to play D&D in the Mass Effect Universe? Mass Effect 5e has you covered.' }
        ]
      }
    },
  }
</script>