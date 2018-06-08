<template lang="pug">
  div.markdown-file
    p.title {{ item.name }}
    div(v-html="markdownFile")
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['getData']),
      item () {
        return this.getData(this.itemType).find(item => item.id === this.id)
      },
      markdownFile () {
        return require(`~/data/${this.itemType}/${this.item.id}.md`)
          .replace(/<table>/gi, '<table class="table">')
          .replace(/<th>/gi, '<th class="text-xs-left">')
          .replace(/<ul>/gi, '<ul class="list">')
      }
    },
    props: ['itemType', 'id']
  }
</script>
