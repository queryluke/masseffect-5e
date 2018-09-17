<template lang="pug">
  v-card(:id="id").elevation-0
    v-card-title.headline.primary.white--text {{ title }}
    v-card-text
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
      }
    },
    mixins: [EnhanceMarkdown],
    props: {
      id: String
    }
  }
</script>
