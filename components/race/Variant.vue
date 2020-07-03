<template lang="pug">
  div
    p.headline {{ name }}
    div.markdown-content
      markdown-content(:component="item.vue")
</template>

<script>

export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    name () {
      return this.item.attributes.name
    },
    item () {
      if (this.id) {
        return require(`~/static/data/subraces/${this.id}.md`)
      }
      return ''
    }
  }
}
</script>
