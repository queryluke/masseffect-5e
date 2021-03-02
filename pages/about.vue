<template lang="pug">
  div
    section
      v-row(justify="center")
        v-col(cols="12" sm="10" md="8" lg="6" xl="4").black--text.text-center.mt-10
          v-img(
            srcset="/images/me5e_logo_450w.png 450w, /images/me5e_logo_600w.png 600w, /images/me5e_logo_720w.png 720w, /images/me5e_logo_900w.png 900w, /images/me5e_logo_1200w.png 1200w"
            sizes="(max-width: 320px) 320px, (max-width: 480px) 480px, (max-width: 600px) 600px, (max-width: 720px) 600px, (max-width: 900px) 720px, (max-width: 1200px) 900px, 1200px"
            src="/images/me5e_logo_1200w.png"
            alt="Mass Effect 5e logo"
          ).mt-10
          h1.sr-only Mass Effect 5e
    section
      v-container
        v-row(justify="center").mt-5
          v-col(cols="12" sm="10" md="8").my-3
            div.text-center
              h2.text-h4 Join the Community
        v-row(justify="space-around").mt-5
          v-col(v-for="community in communities" :key="community.name" cols="12" sm="6" md="4" lg="3")
            v-card(to="community.link" target="_blank" dark).text-center
              v-card-text
                v-img(:src="community.image" v-bind:alt="community.alt" height="80" contain)
        v-row(justify="space-around").mt-5
          v-col(cols="12" md="8" lg="6" xl="4")
            v-alert(type="info" prominent)
              v-row(align="center")
                v-col(class="grow") Found a bug or error on the website, please report it!
                v-col(class="shrink")
                  v-btn(href="https://forms.gle/JtGQqS9KxVFQGtAq7" target="_blank") Report bug
        v-row(justify="center").mt-15
          v-col(cols="12" sm="10" md="8").my-3
            div.text-center
              h2.text-h4 About Mass Effect 5e
              p.
                Mass Effect 5e is a fan-made, D&D 5th Edition, homebrew project that started in early 2016. The core
                ruleset and website were created by Luke A with guidance from Hugh T. Luke continues to maintain the
                website, actively develops new features and changes, and filters community-made content.
        v-row(justify="center")
          v-col(cols="12")
            p.text-h5 Contributors
            p.
              Mass Effect 5e has had dozens of people who've contributed in a variety of ways, both large and small.
              The following list represents the people who've contributed to the project in a major way, be it helping
              moderate the discord server or subreddit, site and character sheet design, or being actively involved in the
              development of the game. Not everyone on this list is still actively involved and these people are presented in
              no particular order.
        v-row(justify="center")
          v-col(v-for="person in people" :key="person.name" cols="12" sm="6" md="4" lg="3")
            v-card.elevation-0.transparent.text-center
              v-card-text
                v-avatar(size="92")
                  v-img(:src="person.image" v-bind:alt="person.name")
                p.text-center.text-h6.mb-1 {{ person.name }}
                p.text-subtitle-1 {{ person.roles }}
        v-row(justify="center")
            v-col(cols="12")
              p.text-h5 Shout Outs
              p.
                In addition to the above, the system has had many contributors who've added invaluable feedback, shared ideas,
                created assets, playtested, and much more. If we've missed anyone, it was not on purpose!
              p.
                {{ shoutouts.join(', ') }}
    section
      v-container
        v-row(justify="center").mt-15
          v-col(cols="12")
            p.text-h4 Image Attributions
            p.
              Any images not listed were either created by Mass Effect 5e contributors or come from the the
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
      shoutouts: [],
      communities: [
        {
          name: 'Discord',
          image: '/images/misc/discord.svg',
          alt: 'Discord Logo',
          link: 'https://discord.gg/c2UnqkH'
        },
        {
          name: 'Reddit',
          image: '/images/misc/Reddit_Lockup_OnDark.svg',
          alt: 'Reddit Logo',
          link: 'https://www.reddit.com/r/masseffect5e/'
        }
      ]
    }
  },
  head () {
    return {
      title: 'About | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Learn more about the Mass Effect 5e creators and contributors.' }
      ]
    }
  }
}
</script>
