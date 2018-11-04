<template lang="pug">
  div.markdown-content
    markdown-content(:component="item.vue")
</template>

<script>
  import MarkdownContent from '~/components/MarkdownContent.vue'

  export default {
    name: 'MarkdownFile',
    components: {MarkdownContent},
    props: {
      id: {
        type: String,
        default: ''
      },
      itemType: {
        type: String,
        default: ''
      },
      header: {
        type: Object,
        default: () => { return {} }
      }
    },
    computed: {
      item () {
        if (this.id) {
          return require(`~/static/data/${this.itemType}/${this.id}.md`)
        }
      }
    }
  }
</script>
