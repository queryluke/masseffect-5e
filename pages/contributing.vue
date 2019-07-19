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
                p.light-blue--text.title #[v-icon(color="light-blue") warning] In Progress
                p.
                  With only 6 classes, it makes sense to adjust the character sheets with class specific information
                  and boxes. If you'd like to work on this, we can send you the original InDesign files so you can
                  work off the original character sheet.
          v-flex(xs12 md4 d-flex)
            v-card(dark)
              v-card-title(primary-title).title Roll20 Character Sheet
              v-card-text.pt-0
                p.light-blue--text.title #[v-icon(color="light-blue") warning] In Progress
                p.
                  Roll20 has had a few updates, and we've not had time to update the Roll 20 character sheet.
          v-flex(xs12 md4 d-flex)
            v-card(dark)
              v-card-title(primary-title).title Icon design
              v-card-text.pt-0
                p.light-blue--text.title #[v-icon(color="light-blue") warning] In Progress
                p.
                  The site uses Material Design Icons, icons from the Noun Project, and originally created icons.
                  We'd love for someone to create a new set of icons for us, one that reflects the Mass Effect universe.
                  Let us know if you're interested and we can provide a list icon needs.
          v-flex(xs12 md4 d-flex)
            v-card(dark)
              v-card-title(primary-title).title PDF of rules
              v-card-text.pt-0
                p.light-blue--text.title #[v-icon(color="light-blue") warning] In Progress
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
