<template lang="pug">
  div.markdown-content
    p.title {{ item.attributes.name }}
    markdown-content(:component="item.vue" v-bind:context="featureLevel")
</template>

<script>
  export default {
    computed: {
      item () {
        if (this.id) {
          return require(`~/static/data/class_features/${this.id}.md`)
        }
      },
      level () {
        return '10'
      }
    },
    props: {
      id: String,
      featureLevel: Object
    }
  }
</script>
