<template lang="pug">
  v-content
    section
      v-parallax(src="/images/parallax/milky_way.jpg" alt="The Milky Way")
        v-layout(column align-center justify-center).white--text
          me-header-logo
          h1.text-h3.mt-5 About #[span.sr-only Mass Effect 5e]
    section
      v-row(justify="center")
        v-col(cols="12" md="10" xl="8")
          p.
            Mass Effect 5e is a fan-made, D&D 5th Edition, homebrew project that started in early 2016. The core
            ruleset and website were created by Luke A with guidance from Hugh T. Luke continues to maintain the
            website, actively develops new features and changes, and filters community-made content.
    section
      p.text-h4 Contributors
      p.
        Mass Effect 5e has had dozens of people who've contributed in a variety of ways, both large and small.
        The following list is represents the people who've contributed to the project in a major way, be it helping
        moderate the discord server or subreddit, site and character sheet design, or being actively involved in the
        development of the game. Not everyone on this list is still actively involved and these people are presented in
        no particular order.
    // Pro Contributors
    section
      v-row(justify="center")
        v-col(v-for="person in people" :key="person.name" cols="12" sm="6" md="4" lg="3")
          v-card.elevation-0.transparent.text-xs-center
            v-card-text
              v-avatar(size="92")
                v-img(:src="person.image" v-bind:alt="person.name")
            v-card-title.text-center.text-h6 {{ person.name }}
            v-card-text
              p.text-overline {{ person.roles }}
    // Contributors
    section
      p.text-h4 Shout outs
      p.
        In addition to the above, the system has had many contributors who've added invaluabe feedback, shared ideas,
        created assets, playtested, and much more. If we've missed anyone, it was not on purpose!
      p.
        {{ shoutouts.join(', ') }}
    section
      p.text-h4 Image Attributions
      p.
        Finally, there are a host of Creative Commons images that I've used, so I'd like to attribute and thank
        these indirect contributors. Any images not listed were either created by Mass Effect 5e contributors or come from the the
        #[a(href="http://masseffect.wikia.com/wiki/Mass_Effect_Wiki" target="_blank") Mass Effect Wiki].
      v-row
        v-col(v-for="att in attributions" v-bind:key="att.attribution" cols="12" sm="6" md="4" lg="3")
          v-card(:href="att.source" v-bind:alt="att.title" target="_blank" hover)
            v-img(:src="att.path" height="200px" contain).blue-grey.lighten-5
            v-card-title(color="grey darken-3" v-html="att.attribution")
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', 'About')
    const data = await Promise.all([
      this.$store.dispatch('FETCH_DATA', 'about'),
      this.$store.dispatch('FETCH_DATA', 'attributions')
    ])
    this.shoutouts = data[0].shoutouts
    this.people = data[0].people
    this.attributions = data[1]
  },
  data () {
    return {
      attributions: [],
      people: [],
      shoutouts: []
    }
  },
  head () {
    return {
      title: 'About | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Learn more about the Mass Effect 5e creators and contributors.' }
      ]
    }
  },
  layout: 'info'
}
</script>
