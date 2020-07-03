<template lang="pug">
  div.markdown-content.npc-grenade
    p
      strong
        em.mr-1 {{ grenade.attributes.name }} ({{ profBonus }}/day).
      markdown-content(:component="grenade.vue")
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    profBonus: {
      type: Number,
      default: 2
    }
  },
  computed: {
    grenade () {
      return require(`~/static/data/grenades/${this.id}.md`)
    }
  }
}
</script>

<style lang="scss">
  .npc-grenade > p {
    div.frontmatter-markdown, p {
      display: inline;
    }
  }
</style>
