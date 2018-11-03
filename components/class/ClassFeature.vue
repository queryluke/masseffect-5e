<template lang="pug">
  div.markdown-content
    p.title {{ item.attributes.name }}
    markdown-content(:component="item.vue" v-bind:context="featureLevel")
</template>

<script>
  export default {
    created () {
      this.item = require(`~/static/data/class_features/${this.id}.md`)
    },
    data () {
      return {
        item: {}
      }
    },
    props: {
      id: String,
      featureLevel: Object
    }
  }
</script>
