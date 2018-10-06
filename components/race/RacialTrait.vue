<template lang="pug">
  trait
    span(slot="header") {{ name }}
    template(slot="text").markdown-content
      markdown-content(:component="item.vue")
</template>

<script>
  import Trait from '~/components/race/Trait.vue'

  export default {
    components: {Trait},
    computed: {
      name () {
        return this.item.attributes.name
      },
      item () {
        if (this.id) {
          return require(`~/static/data/traits/${this.id}.md`)
        }
      }
    },
    props: ['id']
  }
</script>