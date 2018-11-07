<template lang="pug">
  v-container
    div.my-5.text-xs-center
      img(src="/images/me5e_logo_notm.png" id="phbLogo").mb-4
      h3.display-3.hidden-sm-and-down Player's Manual - Introduction
      p.title v{{ version }}
      v-btn(to="/changelog" nuxt).primary Changelog
      v-btn(to="/contributing" nuxt).primary.ml-2 Feedback
    div(v-for="(rule, index) in rules" v-bind:key="index")
      rule-card(:id="rule.id")
</template>

<script>
  import RuleCard from '~/components/RuleCard.vue'
  import rules from '~/static/data/rules'
  import {mapGetters} from 'vuex'

  export default {
    components: {RuleCard},
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
        title: 'Mass Effect 5e | Player\'s Manual',
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