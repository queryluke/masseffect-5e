<template lang="pug">
  div
    sort-options(:headers="headers" defaultSort="1")
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="item in items" v-bind:key="item.id")
        div(slot="header")
          v-layout
            v-flex(:class="headers[0].classes")
              spell-type(:spell="item")
            v-flex(:class="headers[1].classes") #[strong {{ item.name }}]
            v-flex(:class="headers[2].classes")
              spell-duration(:spell="item")
            v-flex(:class="headers[3].classes")
              spell-range-area(:spell="item")
            v-flex(:class="headers[4].classes")
              span {{ item.attackType[0] }}
              span(v-if="item.attackType.length > 1") (...)
            v-flex(:class="headers[5].classes")
              spell-damage-effect(:spell="item")
        v-card.grey.lighten-3
          v-card-text
            spell-info(:item="item").mt-2
          v-card-actions
            bookmark-button(:card="item" type="spell" v-bind:props="{flat: true}")
</template>

<script>
import SpellType from '~/components/spell/SpellType.vue'
import SpellDuration from '~/components/spell/SpellDuration.vue'
import SpellRangeArea from '~/components/spell/SpellRangeArea.vue'
import SpellDamageEffect from '~/components/spell/SpellDamageEffect.vue'
import SpellInfo from '~/components/spell/SpellInfo.vue'
import BookmarkButton from '~/components/BookmarkButton.vue'
import SortOptions from '~/components/list/Sort.vue'

export default {
  components: {
    SpellType, SpellDuration, SpellRangeArea, SpellDamageEffect, SpellInfo, BookmarkButton, SortOptions
  },
  props: {
    items: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      headers: [
        { label: 'Type/Level', key: 'type', classes: 'xs4 sm3 lg2', sortable: true },
        { label: 'Name', key: 'name', classes: 'xs8 sm9 lg2', sortable: true },
        { label: 'Duration', key: 'duration', classes: 'hidden-md-and-down lg2' },
        { label: 'Range (Area)', key: 'range', classes: 'hidden-md-and-down lg2' },
        { label: 'Attack', key: 'attack', classes: 'hidden-md-and-down lg2' },
        { label: 'Damage/Effect', key: 'damage', classes: 'hidden-md-and-down lg2' }
      ]
    }
  }
}
</script>
