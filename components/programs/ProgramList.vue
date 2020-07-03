
<template lang="pug">
  div
    sort-options(:headers="headers" defaultSort="0")
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="item in items" v-bind:key="item.id")
        div(slot="header")
          v-layout
            v-flex(:class="headers[0].classes")
              div(:class="rarityTextColors[rarityForColor(item.rarity)]") #[strong {{ item.name }}]
            v-flex(:class="headers[1].classes") {{ item.rarity | titlecase }}
            v-flex(:class="headers[2].classes") {{ item.installation ? 'Yes' : '--' }}
        v-card.grey.lighten-3
          v-card-text
            program-info(:item="item").mt-2
          v-card-actions
            bookmark-button(:card="item" type="program" v-bind:props="{flat: true}")
</template>

<script>
import { mapGetters } from 'vuex'
import SortOptions from '~/components/list/Sort.vue'
import ProgramInfo from '~/components/programs/ProgramInfo.vue'
import BookmarkButton from '~/components/BookmarkButton.vue'

export default {
  components: {
    SortOptions, ProgramInfo, BookmarkButton
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
        { label: 'Rarity', key: 'rarity', classes: 'xs3' },
        { label: 'Requires Installation', key: 'installation', classes: 'xs3' }
      ]
    }
  },
  computed: {
    ...mapGetters('itemList', ['rarityTextColors'])
  },
  methods: {
    rarityForColor (string) {
      return this.$options.filters.titlecase(string)
    }
  }
}
</script>
