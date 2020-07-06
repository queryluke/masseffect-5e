<template lang="pug">
  div
    // Main Parallax
    section
      v-parallax(src="/images/parallax/citadel.jpg" alt="Mass Effect // The Citadel by grndayfrk14")
        v-row(justify="center")
          v-col(cols="12" sm="10" md="8" lg="6" xl="4").black--text.text-center.mt-10
            v-img(
              srcset="/images/me5e_logo_450w.png 450w, /images/me5e_logo_600w.png 600w, /images/me5e_logo_720w.png 720w, /images/me5e_logo_900w.png 900w, /images/me5e_logo_1200w.png 1200w"
              sizes="(max-width: 320px) 320px, (max-width: 480px) 480px, (max-width: 600px) 600px, (max-width: 720px) 600px, (max-width: 900px) 720px, (max-width: 1200px) 900px, 1200px"
              src="/images/me5e_logo_1200w.png"
              alt="Mass Effect 5e logo"
            ).mt-10
            h1.sr-only Mass Effect 5e
            h2.headline.mt-10 Mass Effect + D&D 5th Edition
            p.subheading An Unofficial D&D 5th Edition homebrew for Mass Effect
            v-btn(to="/phb/intro" large color="secondary").my-3 Get Started
    // Intro Section
    section
      v-container
        v-row(justify="center").mt-5
          v-col(cols="12" sm="10" md="8").my-3
            div.text-center
              h3.headline Begin your journey
              p.
                Mass Effect 5e lets you take the immersive and cooperative story-telling gameplay of Dungeons & Dragons 5th edition
                and experience new adventures in the Mass Effect universe. Go exploring in the Outer Terminus. Stop a political assassination
                on Thessia. Battle the Reaper invasion on Earth, Palavan, or Sur'Kesh. Solve crimes as a C-SEC officer on the Citadel.
                With Mass Effect 5e, the adventure is in your hands. You can play anywhere in the Mass Effect timeline, create
                new worlds, or revisit old ones. So, gear up and start making your own journey.
        v-row(justify="center")
          v-col(cols="12")
            v-row(justify="center")
              // Races and classes
              v-col(cols="12" md="4")
                v-card.elevation-0.transparent
                  v-card-text.text-center
                    v-avatar(size="60px")
                      v-img(src="/images/races/human.png" alt="Systems Alliance Symbol by Engorn on DeviantArt")
                    span.mx-2.headline +
                    v-avatar(size="60px" tile)
                      v-img(src="/images/classes/vanguard.svg" alt="Vanguard Symbol")
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-center Mix & Match
                  v-card-text.
                    Mass Effect 5e lets you mix and match a variety of classic alien races with your favorite Mass Effect class.
                    Wreak havoc on the front lines as a Krogan Shocktrooper. Crush your enemies like a biotic god as a
                    Volus Commando. With 12 races, 6 classes, and 18 specializations, Mass Effect 5e has options to fit any
                    play style.
              // Weapons and armor
              v-col(cols="12" md="4")
                v-card.elevation-0.transparent
                  v-card-text.text-center
                    v-avatar(size="60px" tile).primary
                      v-img(src="/images/weapons/assault_rifle.svg" alt="Assault Rifle SVG")
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-center Weapons & Armor
                  v-card-text.
                    Magic is just science we don't understand yet, so we've replaced the plethora of magical items
                    found in D&D 5th edition with unique weapons and armor. You'll also find a full modification system for upgrading
                    and customizing your gear.
              // Enemies
              v-col(cols="12" md="4")
                v-card.elevation-0.transparent
                  v-card-text.text-center
                    v-avatar(size="60px").primary
                      v-img(src="/images/misc/reaper_avatar.jpg" alt="Reaper swarm")
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-center Unique Enemies
                  v-card-text.
                    Our bestiary is filled with iconic Mass Effect enemies custom-made using D&D's Dungeon Master Guide
                    to ensure balanced combat. From Reaper forces to Blue Sun grunts, we've got enough monsters to keep your
                    players engaged and challenged.
    section
      v-parallax(src="/images/parallax/joker.jpg" alt="mass effect 2 by libbabink")
        v-layout(column align-center justify-center).white--text
          h2.display-3.font-weight-bold.text--shadow Play with the best tech
    section
      v-container(grid-list-xl).mt-5
        v-layout(row align-center wrap)
          v-flex(xs12 md7)
            v-card.elevation-0.transparent
              v-card-title(primary-title)
                div.headline Interactive Manual
              v-card-text.
                Our player's manual is more than a PDF. It's a fully navigable web app that allows you to browse rules, search for items and spells,
                and create bookmarks for frequently used information.
              v-card-actions
                v-btn(to="/phb/intro" text) Get Started #[v-icon mdi-chevron-right]
          v-flex(md5).hidden-sm-and-down.text-center
            v-img(src="/images/misc/datapad.png" height="300" contain alt="data pad").px-5
          // Printables
          v-flex(md5).hidden-sm-and-down
            v-img(src="/images/misc/tt_assets.png" height="300" contain alt="grunt").px-5
          v-flex(xs12 md7)
            v-card.elevation-0.transparent
              v-card-title(primary-title)
                div.headline At-the-table Assets
              v-card-text.
                We offer a few at-the-table assets like custom-made character sheets, printable spell cards, and Roll20 tokens.
              v-card-actions
                v-spacer
                v-btn(to="/assets" text) View #[v-icon mdi-chevron-right]
          // Collaborate
          v-flex(xs12 md7)
            v-card.elevation-0.transparent
              v-card-title(primary-title)
                div.headline Contributors Welcome!
              v-card-text.
                Want to get involved? We're always open to content suggestions, feedback, and ideas from the community.
                Come join the conversation!
              v-card-actions
                v-btn(to="/feedback" text) Contribute #[v-icon mdi-chevron-right]
          v-flex(md5).hidden-sm-and-down.text-center
            v-img(src="/images/misc/grunts.png" contain height="300").px-5
    section
      v-parallax(src="/images/parallax/illusive.jpg" alt="The Illusive Man by libbabink")
        v-layout(column align-center justify-center)
          h2.parallax-title Latest News
    section
      v-container(grid-list-md).my-5
        v-row
          v-col(cols="12" md="7")
            me-news-card(:news="recentPosts[0]" height="450px")
          v-col(cols="12" md="5")
            v-row
              v-col(cols="12")
                me-news-card(:news="recentPosts[1]" height="150px")
              v-col(cols="12")
                me-news-card(:news="recentPosts[2]" height="150px")
        v-row
          v-col(cols="12" md="4")
            me-news-card(:news="recentPosts[3]" height="200px")
          v-col(cols="12" md="4")
            me-news-card(:news="recentPosts[4]" height="200px")
          v-col(cols="12" md="4")
            me-news-card(:news="recentPosts[5]" height="200px")

</template>

<script>

export default {
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'changelog')
    this.recentPosts = [...this.$store.getters.getData('changelog')].reverse().slice(0, 6)
  },
  data () {
    return {
      alert: true,
      recentPosts: []
    }
  },
  head () {
    return {
      title: 'Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Ever wanted to play D&D in the Mass Effect Universe? Mass Effect 5e has you covered.' }
      ]
    }
  },
  layout: 'info'
}
</script>
