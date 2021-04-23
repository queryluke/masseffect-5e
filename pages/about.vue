<template lang="pug">
  div
    section
      v-row(justify="center")
        v-col(cols="12" sm="10" md="8" lg="6" xl="4").black--text.text-center.mt-10
          v-img(
            :src="require('~/assets/images/me5e_logo_1200w.png')"
            alt="Mass Effect 5e logo"
          ).mt-10
          h1.sr-only {{ $t('title') }}
    section
      v-container
        v-row(justify="center").mt-5
          v-col(cols="12" sm="10" md="8").my-3
            div.text-center
              h2.text-h4 {{ $t('buttons.join_community') }}
        v-row(justify="space-around").mt-5
          v-col(v-for="community in communities" :key="community.name" cols="12" sm="6" md="4" lg="3")
            v-card(:href="community.link" target="_blank" dark).text-center
              v-card-text
                v-img(:src="require(`~/assets/images/misc/${community.image}`)" v-bind:alt="community.alt" height="80" contain)
        v-row(justify="space-around").mt-5
          v-col(cols="12" md="8" lg="6" xl="4")
            v-alert(type="info" prominent)
              v-row(align="center")
                v-col(class="grow") {{ $t('aboutpage.bug_text') }}
                v-col(class="shrink")
                  v-btn(href="https://forms.gle/JtGQqS9KxVFQGtAq7" target="_blank") {{ $t('buttons.bug') }}
        v-row(justify="center").mt-15
          v-col(cols="12" sm="10" md="8").my-3
            div.text-center
              h2.text-h4 {{ $t('aboutpage.about_me5e_title') }}
              p {{ $t('aboutpage.about_text') }}

        v-row(justify="center")
          v-col(cols="12")
            p.text-h5 {{ $t('aboutpage.contributors_title') }}
            p {{ $t('aboutpage.contributors_text') }}

        v-row(justify="center")
          v-col(v-for="person in current" :key="person.name" cols="12" sm="6" md="4" lg="3")
            v-card.elevation-0.transparent.text-center
              v-card-text
                v-avatar(size="92")
                  v-img(:src="person.image" v-bind:alt="person.name")
                p.text-center.text-h6.mb-1 {{ person.name }}
                p.text-subtitle-1 {{ $t(`aboutpage.roles.${person.roles}`) }}
        v-row(justify="center")
          v-col(cols="12")
            p.text-h5 {{ $t('aboutpage.former_contributors_title') }}
        v-row(justify="center")
          v-col(v-for="person in former" :key="person.name" cols="12" sm="6" md="4" lg="3")
            v-card.elevation-0.transparent.text-center
              v-card-text
                v-avatar(size="92")
                  v-img(:src="person.image" v-bind:alt="person.name")
                p.text-center.text-h6.mb-1 {{ person.name }}
                p.text-subtitle-1 {{ $t(`aboutpage.roles.${person.roles}`) }}
        v-row(justify="center")
            v-col(cols="12")
              p.text-h5 {{ $t('aboutpage.shoutouts_title') }}
              p {{ $t('aboutpage.shoutouts_text') }}
              p {{ shoutouts.join(', ') }}, {{ $t('aboutpage.all_others') }}
    section
      v-container
        v-row(justify="center").mt-15
          v-col(cols="12")
            p.text-h4 {{ $t('aboutpage.image_attributions_title') }}
            p {{ $t('aboutpage.image_attributions_text') }} #[a(href="http://masseffect.wikia.com/wiki/Mass_Effect_Wiki" target="_blank") #[v-icon open-in-new]]
        v-row
          v-col(v-for="att in attributions" v-bind:key="att.attribution" cols="12" sm="6" md="4" lg="3")
            v-card(:href="att.source" v-bind:alt="att.title" target="_blank" hover)
              v-img(:src="att.path" height="200px" contain).blue-grey.lighten-5
              v-card-title(color="grey darken-3" v-html="att.attribution")
</template>

<script>
export default {
  async asyncData ({ store, i18n }) {
    store.dispatch('SET_META', {
      title: i18n.tc('about_title', 2),
      description: i18n.t('meta.about')
    })
    await store.dispatch('FETCH_LOTS', ['about', 'attributions'])
  },
  data () {
    return {
      communities: [
        {
          name: 'Discord',
          image: 'discord.svg',
          alt: 'Discord Logo',
          link: 'https://discord.gg/c2UnqkH'
        },
        {
          name: 'Reddit',
          image: 'Reddit_Lockup_OnDark.svg',
          alt: 'Reddit Logo',
          link: 'https://www.reddit.com/r/masseffect5e/'
        }
      ]
    }
  },
  computed: {
    shoutouts () {
      return this.$store.getters.getData('about').shoutouts
    },
    current () {
      return this.$store.getters.getData('about').current
    },
    former () {
      return this.$store.getters.getData('about').former
    },
    attributions () {
      return this.$store.getters.getData('attributions')
    }
  }
}
</script>
