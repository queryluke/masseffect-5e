<template lang="pug">
  div
    h1.sr-only Mass Effect 5e - Player's Handbook
    // Main toolbar
    main-toolbar.hidden-sm-and-down
    phb-toolbar.hidden-md-and-up
      h2(slot="toolbarTitle").title Player's Handbook - Intro

    // Content
    v-content.blue-grey.lighten-4
      v-container
        div.my-5.text-xs-center
          img(src="/images/me5e_logo_notm.png" id="phbLogo").mb-4
          h3.display-3.hidden-sm-and-down Player's Handbook Introduction
          p.title v{{ version }}
          v-btn(to="/changelog" nuxt).primary Changelog
        div
          basics
          changes-and-additions
          character-creation-and-leveling
          starting-your-campaign
          web-app-tools
          questions-and-feedback
</template>

<script>
  import Basics from '~/components/phb/Basics.vue'
  import ChangesAndAdditions from '~/components/phb/ChangesAndAdditions.vue'
  import CharacterCreationAndLeveling from '~/components/phb/CharacterCreationAndLeveling.vue'
  import MainToolbar from '~/components/MainToolbar.vue'
  import PhbToolbar from '~/components/PhbToolbar.vue'
  import QuestionsAndFeedback from '~/components/phb/QuestionsAndFeedback.vue'
  import StartingYourCampaign from '~/components/phb/StartingYourCampaign.vue'
  import WebAppTools from '~/components/phb/WebAppTools.vue'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      Basics,
      ChangesAndAdditions,
      CharacterCreationAndLeveling,
      MainToolbar,
      PhbToolbar,
      QuestionsAndFeedback,
      StartingYourCampaign,
      WebAppTools
    },
    computed: {
      ...mapGetters(['getVersion']),
      version () {
        return this.getVersion
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Player\'s Handbook',
        meta: [
          { hid: 'description', name: 'description', content: 'Want to play D&D in the Mass Effect Universe? Learn how to get started.' }
        ]
      }
    },
    layout: 'cyo'
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