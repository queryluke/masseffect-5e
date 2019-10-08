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
              With the release of v1.1.2, we've moved our submission workflow to reddit.
            v-btn(slot="activator" color="primary" href="https://www.reddit.com/r/masseffect5e/wiki/submissions/guidelines" target="_blank") Submission Guidelines

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
