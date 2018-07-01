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
        v-layout(row wrap justify-center).mt-5
          v-flex(xs12 sm10 md8).my-3
            div.text-xs-center
              h3.headline Begin your journey
              p.
                Mass Effect 5e lets you take the immersive and cooperative story-telling gameplay of Dungeons & Dragons 5th edition
                and experience new adventures in the Mass Effect universe. Go exploring in the Outer Terminus. Stop a political assassination
                on Thessia. Battle the Reaper invasion on Earth, Palavan, or Sur'Kesh. Solve crimes as a C-SEC officer on the Citadel.
                With Mass Effect 5e, the adventure is in your hands. You can play anywhere in the Mass Effect time line, create
                new worlds, or revisit old ones. So, gear up and start making your own journey.
        v-layout(column wrap align-center)
          v-flex(xs12)
            v-container(grid-list-xl)
              v-layout(row wrap)
                // Races and classes
                v-flex(xs12 md4 d-flex)
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
                      Mass Effect 5e lets you mix and match a variety of classic alien races with your favorite Mass Effect class.
                      Wreak havoc on the front lines as a Krogan Shocktrooper. Crush your enemies like a biotic god as a
                      Volus Commando. With 12 races 6 classes, and 18 specializations, Mass Effect 5e has options to fit any
                      play style.
                // Weapons and armor
                v-flex(xs12 md4 d-flex)
                  v-card.elevation-0.transparent
                    v-card-text.text-xs-center
                      v-avatar(size="60px" tile).primary
                        img(:src="`/images/weapons/assault_rifle.svg`" alt="Assault Rifle SVG")
                    v-card-title(primary-title).layout.justify-center
                      div.headline.text-xs-center Weapons & Armor
                    v-card-text.
                      Magic is just science we don't understand yet, so we've replaced the plethora of magical items
                      found in D&D 5th edition with unique weapons and armor. You'll also find a full modification system for upgrading
                      and customizing your gear.
                // Enemies
                v-flex(xs12 md4 d-flex)
                  v-card.elevation-0.transparent
                    v-card-text.text-xs-center
                      v-avatar(size="60px").primary
                        img(src="/images/misc/reaper_avatar.jpg" alt="Reaper swarm")
                    v-card-title(primary-title).layout.justify-center
                      div.headline.text-xs-center Unique Enemies
                    v-card-text.
                      Our bestiary is filled with iconic Mass Effect enemies custom-made using D&D's Dungeon Master Guide
                      to ensure balanced combat. From Reaper forces to Blue Sun grunts, we've got enough monsters to keep your
                      players engaged and challenged.
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
                Our player's handbook is more than a PDF. It's a fully navigable web app that allows you to browse rules, search for items and spells,
                and create bookmarks for frequently used information.
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
                Creating NPCs can be a pain, but our Grunt generator is here to help. With the click of a button, you can create unique
                NPCs (or 'grunts') that are fully compatible with the monster creation guidelines of the Dungeon Master's Guide. The generator
                applies the correct Challenge Rating, unique class and racial traits, weapons, and spells.
              v-card-actions
                v-spacer
                v-btn(to="/for-gms/grunts" flat) Generate #[v-icon chevron_right]
          // Printables
          v-flex(xs12 md7)
            v-card.elevation-0.transparent
              v-card-title(primary-title)
                div.headline Tabletop Assets
              v-card-text.
                We've also got a host of tabletop rpg assets: a custom-made character sheet and printable spell cards. In addition,
                we're working on VTT maps, tokens, and plenty of other goodies.
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
    layout: 'dark'
  }
</script>