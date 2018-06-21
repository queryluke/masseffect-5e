<template lang="pug">
  div.markdown-file
    p.title {{ item.name }}
    div(v-html="markdownFile")
</template>

<script>
  import {mapGetters} from 'vuex'
  import {EnhanceMarkdown} from '~/mixins/enhanceMarkdown.js'

  export default {
    computed: {
      ...mapGetters(['getData']),
      item () {
        const item = this.getData('classFeatures').find(item => item.id === this.id)
        if (typeof item === 'undefined') {
          console.log(`Could not find ${this.id}`)
        }
        return item
      },
      markdownFile () {
        return this.enhanceMarkdown(require(`~/data/class_features/${this.item.id}.md`), this.level)
      }
    },
    mixins: [EnhanceMarkdown],
    props: {
      id: String,
      level: Object
    }
  }
</script>
