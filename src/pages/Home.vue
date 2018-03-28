<template lang="pug">
  v-content
    // Main Parallax
    section
      v-parallax(src="/assets/images/parallax/citadel.png")
        v-layout(column align-center justify-center).black--text
          img(:src="`/assets/images/me5e_logo_notm.png`" alt="mass effect 5e").mt-5.me-logo
          h1.sr-only Mass Effect 5e
          h2.headline.mt-4 Mass Effect + D&D 5th Edition
          p.subheading An Unofficial D&D 5th Edition homebrew for Mass Effect
          v-btn(to="/phb" dark large).primary.my-3 Get Started
    // Intro Section
    section
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
                      img(src="/assets/images/races/human.png" alt="Systems Alliance Symbol by Engorn on DeviantArt")
                    span.mx-2.headline +
                    v-avatar(size="60px" tile)
                      img(src="/assets/images/classes/vanguard.png" alt="Vanguard Symbol")
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
                      img(:src="`/assets/images/weapons/assault_rifle.svg`" alt="Assault Rifle SVG")
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
                      img(src="/assets/images/misc/reaper_avatar.jpg" alt="Reaper swarm")
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-xs-center Unique Enemies
                  v-card-text.
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
    section
      v-parallax(src="/assets/images/parallax/joker.png")
        v-layout(column align-center justify-center).white--text
          h2.headline.mt-4 Play with the best tech
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
                v-btn(to="/phb" flat) Get Started #[v-icon chevron_right]
          v-flex(md5).hidden-sm-and-down.text-xs-center
            img(src="/assets/images/misc/datapad.png" height="300" alt="data pad").px-5
          // Grunt Generator
          v-flex(md5).hidden-sm-and-down
            img(src="/assets/images/misc/grunts.png" height="300" alt="").px-5
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
                v-btn(to="/phb" flat) Generate #[v-icon chevron_right]
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
                v-btn(to="/phb" flat) Print #[v-icon chevron_right]
          v-flex(md5).hidden-sm-and-down.text-xs-center
            img(src="/assets/images/misc/datapad.png" height="300").px-5
</template>

<script>

export default {
  name: 'Home',
};
</script>

<style lang="stylus">
  .me-logo
    width: 100%
    height: auto

  @media screen and (min-width: 960px)
    .me-logo
      width: auto
      height: 200px

</style>
