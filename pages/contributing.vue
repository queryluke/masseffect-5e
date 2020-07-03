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
                    v-avatar(size="64" color="transparent" tile)
                      img(src="/images/misc/Discord-Logo-Color.svg" alt="Discord Logo")
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    div.headline #[a(href="https://discord.gg/c2UnqkH" target="_blank").blue--text.text--lighten-3 Discord]
              v-flex(xs12 md4 d-flex)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center.pb-0.mb-0
                    v-avatar(size="64")
                      img(src="/images/misc/Reddit_Mark_OnDark.png" alt="Reddit Logo")
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    div.headline #[a(href="https://www.reddit.com/r/masseffect5e/" target="_blank").blue--text.text--lighten-3 /r/masseffect5e]
              v-flex(xs12 md4 d-flex)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center.pb-0.mb-0
                    v-avatar(size="64").blue
                      v-icon email
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    div.headline #[a(mailto="info@n7.world").blue--text.text--lighten-3 info@n7.world]
    section
      v-layout(row wrap justify-center).mt-5
        v-flex(xs12 sm10 md8).my-3
          div.text-xs-center
            h2.display-2 Feedback & Ideas Welcome!
            p Discord is by far the most active community. But reddit is available as well. Finally, email is available if you want to start a dialog with the creator.
</template>

<script>
export default {
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
