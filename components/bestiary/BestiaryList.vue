<template lang="pug">
  div
    sort-options(:headers="headers" defaultSort="0")
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="item in items" v-bind:key="item.id")
        div(slot="header")
          v-layout
            v-flex(:class="headers[0].classes") #[strong {{ item.name }}]
            v-flex(:class="headers[1].classes") {{ item.unit }}
            v-flex(:class="headers[2].classes") {{ item.cr }}
        v-card.grey.lighten-3
          v-card-text
            stat-block(v-bind:stats="item").mt-2
          v-card-actions
            bookmark-button(:card="item" type="npc" v-bind:props="{flat: true}")
</template>

<script>
import BookmarkButton from '~/components/BookmarkButton.vue'
import StatBlock from '~/components/npc/StatBlock.vue'
import SortOptions from '~/components/list/Sort.vue'

export default {
  components: {
    StatBlock,
    BookmarkButton,
    SortOptions
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
        { label: 'Name', key: 'name', classes: 'xs6', sortable: true },
        { label: 'Faction', key: 'unit', classes: 'xs4', sortable: true },
        { label: 'CR', key: 'cr', classes: 'xs2', sortable: true }
      ]
    }
  }
}
</script>
