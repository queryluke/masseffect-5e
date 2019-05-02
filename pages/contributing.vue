<template lang="pug">
  v-content
    section
      v-parallax(src="/images/parallax/edi.jpg" alt="Edi")
        v-layout(column align-center justify-center).white--text
          me-header-logo
          h1.sr-only Feedback & Contributing for Mass Effect 5e
    section
      v-layout(row wrap justify-center).mt-5
        v-flex(xs12)
          v-container(grid-list-xl)
            v-layout(row wrap)
              v-flex(xs12 md4 d-flex)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center.pb-0.mb-0
                    v-avatar(size="64").primary
                      v-icon feedback
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    div.headline #[a(href="https://goo.gl/forms/3wZj8QhlsLv3XOJw1" target="_blank").blue--text.text--lighten-3 Feedback form]
              v-flex(xs12 md4 d-flex)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center.pb-0.mb-0
                    v-avatar(size="64").blue
                      v-icon email
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    div.headline #[a(mailto="info@n7.world").blue--text.text--lighten-3 info@n7.world]
              v-flex(xs12 md4 d-flex)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center.pb-0.mb-0
                    v-avatar(size="64")
                      img(src="/images/misc/Reddit_Mark_OnDark.png" alt="Reddit Logo")
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    div.headline #[a(href="https://www.reddit.com/r/masseffect5e/" target="_blank").blue--text.text--lighten-3 /r/masseffect5e]
    section
      v-layout(row wrap justify-center).mt-5
        v-flex(xs12 sm10 md8).my-3
          div.text-xs-center
            h2.display-2 Collaborators wanted!
        v-flex(xs12)
          div.text-xs-center.mt-4
            h3.headline Content Submission
            p.
              With the release of v1.0.0, we're looking to the community more than ever for content creation! We've created a number
              of content submission forms.
            v-layout(row wrap justify-center)
              v-flex(xs12 sm6 md4)
                v-menu
                  v-btn(slot="activator" color="primary")
                    span Submission Forms
                    v-icon arrow_drop_down
                  v-list
                    v-list-tile(v-for="item in forms" v-bind:key="item.name" v-bind:href="item.href" target="_blank")
                      v-list-tile-title {{ item.name }}

        v-flex(xs12).mt-5
          div.text-xs-center.mt-4
            h3.headline Additional Projects
            p.
              In addition to content additions, we're always seeking collaborates for non-content projects as well. If any
              of the following projects look interesting to you and you want to work with us, please let us know!

      v-container(grid-list-xl)
        v-layout(row wrap justify-center)
          v-flex(xs12 md4 d-flex)
            v-card(dark)
              v-card-title(primary-title).title Class specific character sheets
              v-card-text.pt-0
                p.
                  With only 6 classes, it makes sense to adjust the character sheets with class specific information
                  and boxes. If you'd like to work on this, we can send you the original InDesign files so you can
                  work off the original character sheet.
          v-flex(xs12 md4 d-flex)
            v-card(dark)
              v-card-title(primary-title).title Roll20 Character Sheet
              v-card-text.pt-0
                p.
                  Roll20 has had a few updates, and we've not had time to update the Roll 20 character sheet.
          v-flex(xs12 md4 d-flex)
            v-card(dark)
              v-card-title(primary-title).title Icon design
              v-card-text.pt-0
                p.
                  The site uses Material Design Icons, icons from the Noun Project, and originally created icons.
                  We'd love for someone to create a new set of icons for us, one that reflects the Mass Effect universe.
                  Let us know if you're interested and we can provide a list icon needs.
          v-flex(xs12 md4 d-flex)
            v-card(dark)
              v-card-title(primary-title).title PDF of rules
              v-card-text.pt-0
                p.
                  We've been waiting on a more stable version of the ruleset to ask for this one. But as we slowly approach
                  v1.0.0, it makes sense to go ahead an look for contributors.
          v-flex(xs12 md4 d-flex)
            v-card(dark)
              v-card-title(primary-title).title Adventures and scenarios
              v-card-text.pt-0
                p.
                  After v1.0.0, we hope to start publishing unique adventures. We have a couple small scenarios
                  we're going to pusblish soon, but would love for community members to contribute thier creations!
</template>

<script>
  export default {
    data () {
      return {
        forms: [
          {name: 'Armor Mods', href: 'https://docs.google.com/forms/d/e/1FAIpQLSfCroP8SyHjiwgVSIbfXohT3BdfGQ_Ga9-BTUiUJtoQfyWBYA/viewform?usp=sf_link'},
          {name: 'Armor Sets', href: 'https://docs.google.com/forms/d/e/1FAIpQLSf9s8R78NInfJ66ePXWJhqajiPWYAHKEmZtzW6IjRkvHtEGwA/viewform?usp=sf_link'},
          {name: 'Backgrounds', href: 'https://docs.google.com/forms/d/e/1FAIpQLScmYO1qBEldpT9nwOcQMEcuiXGKLIUhzEozjaEA_Ja8qg5H4w/viewform?usp=sf_link'},
          {name: 'Feats', href: 'https://docs.google.com/forms/d/e/1FAIpQLSe4_gBwyqIBZVdV1Lzxfc9QSSrQ-Z2o2fs_Jjz5b0Vnt7aNJw/viewform?usp=sf_link'},
          {name: 'Grenades', href: 'https://docs.google.com/forms/d/e/1FAIpQLSdRpmAxbmY6u5ug4VpJPXW79CPaVqQ6l9jWJ8jz-wwSR1sHGA/viewform?usp=sf_link'},
          {name: 'Omni-Tool Programs', href: 'https://docs.google.com/forms/d/e/1FAIpQLScAaoh5S4C4pGgKsp-JizWguCwZT5jNzYBS9VgC4InCd5hDwg/viewform?usp=sf_link'},
          {name: 'Spells', href: 'https://docs.google.com/forms/d/e/1FAIpQLSd-zIA31mbvveON91vEg-G-YAtsp3G2kAD5Ag_rpCla9zJkXQ/viewform?usp=sf_link'},
          {name: 'Tools & Kits', href: 'https://docs.google.com/forms/d/e/1FAIpQLSd2VxyasTnUudl9jeoaLPpU01FoNnCgRNFTnKNaKcoMYRsiWw/viewform?usp=sf_link'},
          {name: 'Vehicles', href: 'https://docs.google.com/forms/d/e/1FAIpQLSczhcQ-Ww4rol9KzDUtyzDdiG8nluIm8yMp6Iz3dzZ2BGWH8A/viewform?usp=sf_link'},
          {name: 'Weapon Mods', href: 'https://docs.google.com/forms/d/e/1FAIpQLSfJe9l5YLlI9zP_gII26RMJORB_QRrcIm-XV3MjG3PwT7Nf6A/viewform?usp=sf_link'},
          {name: 'Weapons', href: 'https://docs.google.com/forms/d/e/1FAIpQLSfbs7y0_3dsAjLoJYQW5Wj23uqVlMdvqOsaa9Jl5yhDBn3krw/viewform?usp=sf_link'}

        ]
      }
    },
    head () {
      return {
        title: 'Feedback | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Learn how to contribute and provide feedback.' }
        ]
      }
    },
    layout: 'dark'
  }
</script>
