<template lang="pug">
  v-content
    section
      v-parallax(src="/assets/images/milky_way.jpg")
        v-layout(column align-center justify-center).white--text
          img(:src="`/assets/images/me5e_logo_notm.png`" alt="mass effect 5e" height="200")
          h1.sr-only Mass Effect 5e
          v-btn(to="/phb" dark large).primary.mt-5 Player's Handbook
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
                    div.headline.text-xs-center Some feature
                  v-card-text.
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
              v-flex(xs12 md4)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-icon(x-large).blue--text.text--lighten-2 color_lens
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-xs-center Some feature
                  v-card-text.
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
              v-flex(xs12 md4)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-icon(x-large).blue--text.text--lighten-2 color_lens
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-xs-center Some feature
                  v-card-text.
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
    section
      v-parallax(src="/assets/images/n7.jpg")
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
