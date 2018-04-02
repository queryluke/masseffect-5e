<template lang="pug">
  v-expansion-panel(popout).mb-2
    v-expansion-panel-content(v-for="spell in spells" v-bind:spell="spell" v-bind:key="spell.id" hide-actions)
      div(slot="header")
        v-layout.spell-header
          v-flex.xs4.sm3.lg2
            spell-type(:spell="spell")
          v-flex.xs8.sm9.lg2
            strong {{ spell.name }}
          v-flex.hidden-md-and-down.lg2
            spell-duration(:spell="spell")
          v-flex.hidden-md-and-down.lg2
            spell-range-area(:spell="spell")
          v-flex.hidden-md-and-down.lg2 {{ spell.attack_type[0] }}
            span(v-if="spell.attack_type.length > 1") (...)
          v-flex.hidden-md-and-down.lg2
            spell-damage-effect(:spell="spell")
      v-card.grey.lighten-3
        v-card-text
          spell-info(:spell="spell").mt-2
        v-card-actions
          bookmark-button(:card="spell" type="spell" v-bind:props="{flat: true}")
</template>

<script>
  import SpellType from '~/components/shared/SpellType.vue'
  import SpellDuration from '~/components/shared/SpellDuration.vue'
  import SpellRangeArea from '~/components/shared/SpellRangeArea.vue'
  import SpellDamageEffect from '~/components/shared/SpellDamageEffect.vue'
  import SpellInfo from '~/components/shared/SpellInfo.vue'
  import BookmarkButton from '~/components/shared/BookmarkButton.vue'

  export default {
    components: {
      SpellType, SpellDuration, SpellRangeArea, SpellDamageEffect, SpellInfo, BookmarkButton
    },
    props: ['spells']
  }
</script>

