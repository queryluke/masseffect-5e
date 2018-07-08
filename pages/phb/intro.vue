<template lang="pug">
  v-container
    div.my-5.text-xs-center
      img(src="/images/me5e_logo_notm.png" id="phbLogo").mb-4
      h3.display-3.hidden-sm-and-down Player's Handbook Introduction
      p.title v{{ version }}
      v-btn(to="/changelog" nuxt).primary Changelog
    div(v-for="(rule, index) in pages[$route.name].rules" v-bind:key="index")
      component(v-bind:is="rule")
</template>

<script>
  // Rule Cards
  import {
    Basics,
    ChangesAndAdditions,
    CharacterCreationAndLeveling,
    QuestionsAndFeedback,
    StartingYourCampaign,
    WebAppTools
  } from '~/components/phb/'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      Basics,
      ChangesAndAdditions,
      CharacterCreationAndLeveling,
      QuestionsAndFeedback,
      StartingYourCampaign,
      WebAppTools
    },
    computed: {
      ...mapGetters('phb', {
        version: 'version',
        pages: 'pages'
      })
    },
    head () {
      return {
        title: 'Mass Effect 5e | Player\'s Handbook',
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