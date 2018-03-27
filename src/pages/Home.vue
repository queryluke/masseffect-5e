<template lang="pug">
  v-content
    section
      v-parallax(src="/assets/images/parallax/citadel.png")
        v-layout(column align-center justify-center).white--text
          img(:src="`/assets/images/me5e_logo_notm.png`" alt="mass effect 5e" height="200").mt-5
          h1.sr-only Mass Effect 5e
          h2.headline.black--text.mt-4 Mass Effect + D&D 5th Edition
          p.subheading.black--text An Unofficial D&D 5th Edition homebrew for Mass Effect
          v-btn(to="/phb" dark large).primary.my-3 Get Started
    section
      v-layout(column wrap align-center).my-5
        v-flex(xs12 sm8).my-3
          div.text-xs-center
            h3.headline Begin your journey
            p.
              Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
        v-flex(xs12)
          v-container(grid-list-xl)
            v-layout(row wrap align-center)
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
              v-flex(xs12 md4)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-avatar(size="60px").primary
                      img(:src="`/assets/images/weapons/assault_rifle.svg`" alt="")
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-xs-center Weapon & Armor
                  v-card-text.
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
              v-flex(xs12 md4)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-avatar(size="60px").primary
                      img(src="/assets/images/misc/reaper_avatar.jpg" alt="")
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-xs-center Unique Enemies
                  v-card-text.
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
    section
      v-parallax(src="/assets/images/parallax/n7.jpg")
    section
      v-layout(column wrap align-center).my-5
        v-flex(xs12 sm8).my-3
          div.text-xs-center
            h2.headline Mass Effect + D&D 5th Edition
            span.subheading An Unofficial D&D 5th Edition homebrew for Mass Effect
        v-flex(xs12)
          v-container(grid-list-xl)
            v-layout(row wrap align-center)
              v-flex(xs12 md4)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-icon(x-large).blue--text.text--lighten-2 color_lens
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-xs-center Material Design
                  v-card-text.
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
              v-flex(xs12 md4)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-icon(x-large).blue--text.text--lighten-2 color_lens
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-xs-center Material Design
                  v-card-text.
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
              v-flex(xs12 md4)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-icon(x-large).blue--text.text--lighten-2 color_lens
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-xs-center Material Design
                  v-card-text.
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.

</template>

<script>

export default {
  name: 'Home',
};
</script>
