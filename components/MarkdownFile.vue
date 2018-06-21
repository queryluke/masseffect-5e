<template lang="pug">
  div.markdown-file
    div(v-html="markdownFile")
</template>

<script>
  import {mapGetters} from 'vuex'
  import {EnhanceMarkdown} from '~/mixins/enhanceMarkdown.js'

  export default {
    computed: {
      ...mapGetters(['getData']),
      item () {
        return this.getData(this.itemType).find(item => item.id === this.id)
      },
      markdownFile () {
        return this.enhanceMarkdown(require(`~/data/${this.itemType}/${this.item.id}.md`))
      }
    },
    mixins: [EnhanceMarkdown],
    props: {
      itemType: String,
      id: String
    }
  }
</script>
