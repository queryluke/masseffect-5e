<template lang="pug">
  v-content
    section
      v-parallax(src="/images/parallax/edi.jpg")
        v-layout(column align-center justify-center).white--text
          img(src="/images/me5e_logo_notm.png" alt="mass effect 5e").mt-5.me-title-logo
          h1.display-1.mt-5 Feedback & Contributing #[span.sr-only for Mass Effect 5e]
    section
      v-layout(row wrap justify-center).mt-5
        v-flex(xs12 sm10 md8).my-3
          div.text-xs-center
            h2.headline Feedback
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
                      It also gives you the option to leave feedback anonymously (but we won't be able to respond). Although,
                      we only check the form a few times a week, so it might be a few days before we get back to you.
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
    section
      v-layout(row wrap justify-center).mt-5
        v-flex(xs12 sm10 md8).my-3
          div.text-xs-center
            h2.headline Collaborators wanted!
            p.
              Over the past year, we've had tons of unsolicited assistance from community users. While we're extremely grateful
              for everyones hard work, this method often results in duplicate effots. Thus, we've created a list of ongoing and on-time
              needs that have been languishing in our backlog. If you'd like to contribute, please consult
              the list below and #[a(mailto="info@n7.world").blue--text.text--lighten-3 contact us] with what you'd like to work on.
        v-flex(xs12)
          div.text-xs-center.mt-4
            h3.title High Priority
          v-container(grid-list-xl)
            v-layout(row wrap justify-center)
              v-flex(xs12 md4 d-flex)
                v-card(dark)
                  v-card-title(primary-title).title Mass Effect monsters
                  v-card-text.pt-0
                    p.
                      We've filled out quite a few monsters in the bestiary, but there are still a lot to complete. If
                      you'd like to create an original monster stat block or revise a current one,
                      #[a(href="We can't offer much in recompense for your creative endeavors other than attributing the stat block to you on the website and adding to our list of contributors." target="_blank" class="light-blue--text text--lighten-1") this sheet]
                      has more information.
              v-flex(xs12 md4 d-flex)
                v-card(dark)
                  v-card-title(primary-title).title Fillable PDF character sheet
                  v-card-text.pt-0
                    p.
                      Thessiand Shadow, Szirach, and TheNamelessOne have all created great fillable PDFs (thanks!). But we've made a few changes
                      to our print version since then, so we're in need of some updates.
              v-flex(xs12 md4 d-flex)
                v-card(dark)
                  v-card-title(primary-title).title Google Sheets character sheet
                  v-card-text.pt-0
                    p.
                      Ben McPherson got pretty far with a Google Sheet version of the character sheet. If anyone is a guru
                      with GSheets and wants to take a stab at completing his work, it'd be a great help!
        v-flex(xs12)
          div.text-xs-center.mt-4
            h3.title Low(er) Priority
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
                  v-card-title(primary-title).title Spell card design
                  v-card-text.pt-0
                    p.
                      The spell cards are a year old and could use a designer's eye. The key challenge will be getting all
                      the spell text on the card.
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
        v-flex(xs12)
          div.text-xs-center.mt-4
            h3.title Ongoing
          v-container(grid-list-xl)
            v-layout(row wrap justify-center)
              v-flex(xs12 md4 d-flex)
                v-card(dark)
                  v-card-title(primary-title).title Adventures and scenarios
                  v-card-text.pt-0
                    p.
                      After v1.0.0, we hope to start publishing unique adventures. We have a couple small scenarios
                      we're going to pusblish soon, but would love for community members to contribute thier creations!
              v-flex(xs12 md4 d-flex)
                v-card(dark)
                  v-card-title(primary-title).title Original spells
                  v-card-text.pt-0
                    p.
                      If you have a great idea for an original spell, you can either use our
                      #[a(href="https://goo.gl/forms/IJnRgadhyWgefTd02" target="_blank" class="light-blue--text text--lighten-1") spell idea form], or open a
                      spell proposal issue on GitHub.
              v-flex(xs12 md4 d-flex)
                v-card(dark)
                  v-card-title(primary-title).title Re-skinned D&D 5th edition monsters
                  v-card-text.pt-0
                    p.
                      We're looking to expand the bestiary with a list of Mass Effect appropriate monsters from 5th
                      edition. If you spot a unique monster in one of the many 5th edition books and think it would make
                      an interesting alien send us your idea via any of the feedback methods
              v-flex(xs12 md4 d-flex)
                v-card(dark)
                  v-card-title(primary-title).title Re-skinned D&D 5th edition spells
                  v-card-text.pt-0
                    p.
                      Any spells you see in 5th edition that you think would make an interesting addition, let us know!
</template>

<script>
  export default {
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