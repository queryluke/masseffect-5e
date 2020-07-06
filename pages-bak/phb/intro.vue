<template lang="pug">
  v-container
    div.my-5.text-xs-center
      img(
        srcset="/images/me5e_logo_450w.png 450w, /images/me5e_logo_600w.png 600w, /images/me5e_logo_720w.png 720w, /images/me5e_logo_900w.png 900w"
        sizes="(max-width: 320px) 320px, (max-width: 480px) 480px, (max-width: 600px) 600px, (max-width: 720px) 720px, (max-width: 900px) 900px, (max-width: 1200px) 450px, 450px"
        src="/images/me5e_logo_450w.png"
        alt="Mass Effect 5e logo"
        id="phbLogo"
      ).mb-4
      h3.display-3.hidden-sm-and-down Player's Manual - Introduction
      p.title v{{ version }}
      v-btn(to="/changelog" nuxt).primary Changelog
      v-btn(to="/contributing" nuxt).primary.ml-2 Feedback
    div(v-for="(rule, index) in rules" v-bind:key="index")
      rule-card(:id="rule.id")
</template>

<script>
import { mapGetters } from 'vuex'
import RuleCard from '~/components/RuleCard.vue'
import rules from '~/static/data/rules'

export default {
  components: { RuleCard },
  computed: {
    ...mapGetters('phb', {
      version: 'version',
      pages: 'pages'
    }),
    rules () {
      return rules.filter(rule => rule.section === this.pages[this.$route.name].rules)
    }
  },
  head () {
    return {
      title: 'Player\'s Manual | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Want to play D&D in the Mass Effect Universe? Learn how to get started.' }
      ]
    }
  },
  layout: 'phb'
}
</script>

<style lang="scss">
  #phbLogo {
    width: 100%;
    height: auto;
  }

  @media screen and (min-width: 960px) {
    #phbLogo {
      width: auto;
      height: 90px;
    }
  }
</style>
