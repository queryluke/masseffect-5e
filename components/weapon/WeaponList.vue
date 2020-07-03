<template lang="pug">
  div
    sort-options(:headers="headers" defaultSort="0")
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="item in items" v-bind:key="item.id")
        div(slot="header")
          v-layout
            v-flex(:class="headers[0].classes")
              div(:class="rarityTextColors[item.rarity]" style="margin-bottom: -8px") #[strong {{ item.name }}]
                v-chip(v-if="item.andromeda" color="secondary" dark flat).ml-2.v-chip--x-small Andromeda
              small {{ item.type }}
            v-flex(:class="headers[1].classes").mt-1 {{ item.damage }}
            v-flex(:class="headers[2].classes").mt-1 {{ item.heat }}
            v-flex(:class="headers[3].classes").mt-1 {{ item | weaponRange }}
            v-flex(:class="headers[4].classes").mt-1 {{ item.weight }}
            v-flex(:class="headers[5].classes").mt-1 {{ item.cost | groupDigits(',') }}
        v-card.grey.lighten-3
          v-card-text
            weapon-info(:item="item").mt-2
          v-card-actions
            bookmark-button(:card="item" type="weapon" v-bind:props="{flat: true}")
</template>

<script>
import { mapGetters } from 'vuex'
import WeaponInfo from '~/components/weapon/WeaponInfo.vue'
import BookmarkButton from '~/components/BookmarkButton.vue'
import SortOptions from '~/components/list/Sort.vue'

export default {
  components: {
    WeaponInfo, BookmarkButton, SortOptions
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
        { key: 'name', label: 'Name', classes: 'xs8 sm9 lg4', sortable: true },
        { key: 'damage', label: 'Damage', classes: 'xs4 sm3 lg2', sortable: true },
        { key: 'heat', label: 'Heat', classes: 'hidden-md-and-down lg2', sortable: true },
        { key: 'range', label: 'Range', classes: 'hidden-md-and-down lg2', sortable: true },
        { key: 'weight', label: 'Weight', classes: 'hidden-md-and-down lg2', sortable: true },
        { key: 'cost', label: 'Cost', classes: 'hidden-md-and-down lg2', sortable: true }
      ]
    }
  },
  computed: {
    ...mapGetters('itemList', ['rarityTextColors'])
  }
}
</script>
