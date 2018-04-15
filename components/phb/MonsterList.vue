<template lang="pug">
  v-expansion-panel(popout).mb-2
    v-expansion-panel-content(v-for="monster in monsters" v-bind:monster="monster" v-bind:key="monster.id")
      div(slot="header")
        v-layout.spell-header
          v-flex.xs9.lg5 #[strong {{ monster.name }}]
          v-flex.hidden-md-and-down.lg5 {{ monster.unit }}
          v-flex.xs3 {{ monster.cr }}
      v-card.grey.lighten-3
        v-card-text
          stat-block(v-bind:stats="monster").mt-2
        v-card-actions
          bookmark-button(:card="monster" type="npc" v-bind:props="{flat: true}")
</template>

<script>
  import BookmarkButton from '~/components/shared/BookmarkButton.vue'
  import StatBlock from '~/components/shared/StatBlock.vue'

  export default {
    components: {
      StatBlock,
      BookmarkButton
    },
    props: ['monsters']
  }
</script>

