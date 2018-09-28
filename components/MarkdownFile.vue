<template lang="pug">
  div.markdown-content
    markdown-content(:component="item.vue")
</template>

<script>
  import MarkdownContent from '~/components/MarkdownContent.vue'

  export default {
    components: {MarkdownContent},
    computed: {
      item () {
        if (this.id) {
          return require(`~/static/data/${this.itemType}/${this.id}.md`)
        }
      }
    },
    props: {
      id: String,
      itemType: String
    }
  }
</script>
