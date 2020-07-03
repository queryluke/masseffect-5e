<template lang="pug">
  div.markdown-content
    p.title {{ item.attributes.name }}
    markdown-content(:component="item.vue" v-bind:context="featureLevel")
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    featureLevel: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      item: {}
    }
  },
  created () {
    this.item = require(`~/static/data/class_features/${this.id}.md`)
  }
}
</script>
