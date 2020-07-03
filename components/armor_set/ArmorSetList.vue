<template lang="pug">
  div
    sort-options(:headers="headers" defaultSort="0")
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="(item, index) in items" v-bind:key="index")
        div(slot="header")
          v-layout
            v-flex(:class="headers[0].classes")
              div(:class="rarityTextColors[item.rarity]") #[strong {{ item.name }}]
                v-chip(v-if="item.andromeda" color="secondary" dark flat).ml-2.v-chip--x-small Andromeda
            v-flex(:class="headers[1].classes") {{ item.cost | groupDigits(',') }}
            v-flex(:class="headers[2].classes") {{ item.armorType }}
            v-flex(:class="headers[3].classes") {{ item.type }}
            v-flex(:class="headers[4].classes") {{ item.notes }}
        v-card.grey.lighten-3
          v-card-text
            armor-set-info(:item="item").mt-2
          v-card-actions
            bookmark-button(:card="item" type="armorSet" v-bind:props="{flat: true}")
</template>

<script>
import { mapGetters } from 'vuex'
import SortOptions from '~/components/list/Sort.vue'
import ArmorSetInfo from '~/components/armor_set/ArmorSetInfo.vue'
import BookmarkButton from '~/components/BookmarkButton.vue'

export default {
  components: {
    SortOptions, ArmorSetInfo, BookmarkButton
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
        { label: 'Name', key: 'name', classes: 'xs6 md4 lg3', sortable: true },
        { label: 'Cost', key: 'cost', classes: 'xs2 md1', sortable: true },
        { label: 'Armor Type', key: 'armorType', classes: 'xs2 md1' },
        { label: 'Type', key: 'placement', classes: 'xs2 md2' },
        { label: 'Notes', key: 'notes', classes: 'hidden-sm-and-down md4 lg5' }
      ]
    }
  },
  computed: {
    ...mapGetters('itemList', ['rarityTextColors'])
  }
}
</script>
