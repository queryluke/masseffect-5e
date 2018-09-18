<template lang="pug">
  v-card(:id="hash").elevation-0.transparent
    v-card-title.headline {{ title }}
      v-chip(v-if="newRule" color="secondary" text-color="white" small) new
    v-card-text.rule-text
      rule-text(:component="item.vue")
</template>

<script>
  import {EnhanceMarkdown} from '~/mixins/enhanceMarkdown.js'
  import RuleText from '~/components/RuleText.vue'

  export default {
    components: {RuleText},
    computed: {
      item () {
        return require(`~/static/data/rules/${this.id}.md`)
      },
      title () {
        return this.item.attributes.title
      },
      newRule () {
        return this.item.attributes.new
      },
      hash () {
        return this.id.split('-').splice(2).join('-')
      }
    },
    mixins: [EnhanceMarkdown],
    props: {
      id: String
    }
  }
</script>

<style lang="scss">
  .rule-text {
  }
</style>