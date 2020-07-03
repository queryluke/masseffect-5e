<template lang="pug">
  div
    sort-options(:headers="headers" defaultSort="0")
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="item in items" v-bind:key="item.id")
        div(slot="header")
          v-layout
            v-flex(:class="headers[0].classes")
              div(:class="rarityTextColors[item.rarity]") #[strong {{ item.name }}]
            v-flex(:class="headers[1].classes") {{ item.cost | groupDigits(',') }}
            v-flex(:class="headers[2].classes") {{ item.type }}
            v-flex(:class="headers[3].classes") {{ item.notes }}
        v-card.grey.lighten-3
          v-card-text
            armor-mod-info(:item="item").mt-2
          v-card-actions
            bookmark-button(:card="item" type="armorMod" v-bind:props="{flat: true}")
</template>

<script>
import { mapGetters } from 'vuex'
import SortOptions from '~/components/list/Sort.vue'
import ArmorModInfo from '~/components/armor_mod/ArmorModInfo.vue'
import BookmarkButton from '~/components/BookmarkButton.vue'

export default {
  components: {
    SortOptions, ArmorModInfo, BookmarkButton
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
        { label: 'Name', key: 'name', classes: 'xs6 md4', sortable: true },
        { label: 'Cost', key: 'cost', classes: 'xs3 md2', sortable: true },
        { label: 'Type', key: 'type', classes: 'xs3 md2' },
        { label: 'Notes', key: 'notes', classes: 'hidden-sm-and-down md4' }
      ]
    }
  },
  computed: {
    ...mapGetters('itemList', ['rarityTextColors'])
  }
}
</script>
