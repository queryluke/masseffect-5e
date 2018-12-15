<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down {{ title }}
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
      },
      title () {
        return this.pages[this.$route.name].name
      }
    },
    head () {
      return {
        title: `${this.title} | Mass Effect 5e`,
        meta: [
          { hid: 'description', name: 'description', content: 'Using Monsters from ME5e' }
        ]
      }
    },
    layout: 'phb'
  }
</script>