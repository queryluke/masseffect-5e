<template lang="pug">
  div
    p
      strong
        em {{ grenade.attributes.name }} ({{ profBonus }}/day).
      span(v-html="text").ml-1
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
      text () {
        return this.grenade.body.replace('As an Action, t', 'T')
      },
      grenade () {
        return require(`~/static/data/grenades/${this.id}.md`)
      }
    }
  }
</script>

