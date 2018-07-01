<template lang="pug">
  v-content
    section
      v-parallax(src="/images/parallax/edi.jpg")
        v-layout(column align-center justify-center).white--text
          img(src="/images/me5e_logo_notm.png" alt="mass effect 5e").mt-5.me-title-logo
          h1.display-1.mt-5 Feedback & Contributing #[span.sr-only for Mass Effect 5e]
    section
      v-layout(column wrap align-center).my-5
        v-flex(xs12 sm8).my-3
          div.text-xs-center
            h2.headline Getting Involved
            p.
              We welcome feedback, criticism, and questions! Whether you're a playtester with a mile-long list of class balance
              issues or simply a passer-by with a fun idea, please let us know.
        v-flex(xs12)
          v-container(grid-list-xl)
            v-layout(row wrap)
              v-flex(xs12 md4 d-flex)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-avatar.primary
                      v-icon feedback
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    v-flex.pb-0
                      div.headline #[a(href="https://goo.gl/forms/3wZj8QhlsLv3XOJw1" target="_blank").blue--text.text--lighten-3 Feedback form]
                    v-flex.pt-1
                      div Casual
                  v-card-text.pt-0
                    p.
                      Our feedback form can be used for pretty much anything: questions, ideas, clarifications, etc.
                      It also gives you the option to leave feedback anonymously (but we won't be able to respond). Additionally, we only check the form a few times a week, so it might be a few days before we get back to you.
              v-flex(xs12 md4 d-flex)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-avatar.blue
                      v-icon email
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    v-flex.pb-0
                      div.headline #[a(mailto="info@n7.world").blue--text.text--lighten-3 info@n7.world]
                    v-flex.pt-1
                      div Normal
                  v-card-text.pt-0
                    p.
                      You can also email us directly. We'll be a bit more responsive and can have an ongoing thread of discussion.
              v-flex(xs12 md4 d-flex)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-avatar
                      img(src="/images/misc/GitHub-Mark-Light-64px.png" alt="GitHub Logo")
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    v-flex.pb-0
                      div.headline #[a(href="https://github.com/queryluke/masseffect-5e" target="_blank").blue--text.text--lighten-3 Github]
                    v-flex.pt-1
                      div Veteran
                  v-card-text.pt-0
                    p.
                      If you'd like to be involved in ongoing discussions and follow updates more closely, you can jump into the fray
                      via GitHub. The site has an issues section where we track everything from site bugs to theorycrafting.
                    ol.pl-3
                      li #[a(href="https://github.com/join" target="_blank").blue--text.text--lighten-3 Sign Up for a GitHub Account]
                      li #[a(href="https://github.com/queryluke/masseffect-5e/blob/master/CONTRIBUTING.md" target="_blank").blue--text.text--lighten-3 Read the contributing guidelines]
                      li #[a(href="https://github.com/queryluke/masseffect-5e/issues" target="_blank").blue--text.text--lighten-3 Review and comment on our current issues]
                      li Open new issues
</template>

<script>
  import AboutCard from '~/components/misc/AboutCard.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {AboutCard},
    computed: {
      ...mapGetters(['getData']),
      attributions () {
        return this.getData('attributions')
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Feedback',
        meta: [
          { hid: 'description', name: 'description', content: 'Learn how to contribute and provide feedback.' }
        ]
      }
    },
    layout: 'dark'
  }
</script>