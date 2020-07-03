<template lang="pug">
  v-card(:id="hash").elevation-0.transparent
    v-card-title.headline {{ title }}
      v-chip(v-if="newRule" color="secondary" text-color="white" small) new
      v-chip(v-if="changeRule" color="orange accent-2" text-color="black" small) change
    v-card-text
      markdown-content(:component="item.vue")
</template>

<script>
import MarkdownContent from '~/components/MarkdownContent.vue'

export default {
  components: { MarkdownContent },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
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
    changeRule () {
      return this.item.attributes.change
    },
    hash () {
      return this.id.split('-').splice(2).join('-')
    }
  }
}
</script>
