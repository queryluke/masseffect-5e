<template lang="pug">
  div
    sort-options(:headers="headers" defaultSort="0")
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="item in items" v-bind:key="item.id")
        div(slot="header")
          v-layout
            v-flex(:class="headers[0].classes")
              div(:class="rarityTextColors[item.rarity]" style="margin-bottom: -8px") #[strong {{ item.name }}]
              small {{ availability(item) }}
            v-flex(:class="headers[1].classes").mt-1 {{ item.cost | groupDigits(',') }}
            v-flex(:class="headers[2].classes").mt-1 {{ item.placement }}
            v-flex(:class="headers[3].classes").mt-1 {{ item.notes }}
        v-card.grey.lighten-3
          v-card-text
            weapon-mod-info(:item="item").mt-2
          v-card-actions
            bookmark-button(:card="item" type="weaponMod" v-bind:props="{flat: true}")
</template>

<script>
import { mapGetters } from 'vuex'
import SortOptions from '~/components/list/Sort.vue'
import WeaponModInfo from '~/components/weapon_mod/WeaponModInfo.vue'
import BookmarkButton from '~/components/BookmarkButton.vue'

export default {
  components: {
    SortOptions, WeaponModInfo, BookmarkButton
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
        { label: 'Name', key: 'name', classes: 'xs6 md5 lg3', sortable: true },
        { label: 'Cost', key: 'cost', classes: 'xs3 md2 lg2', sortable: true },
        { label: 'Placement', key: 'placement', classes: 'xs3 md2 lg2' },
        { label: 'Notes', key: 'notes', classes: 'hidden-sm-and-down md3 lg5' }
      ]
    }
  },
  computed: {
    ...mapGetters('itemList', ['rarityTextColors'])
  },
  methods: {
    // TODO: This could be a mixin or model
    availability (item) {
      if (['Assault Rifle', 'Heavy Pistol', 'Shotgun', 'Sniper Rifle', 'SMG'].every(val => item.availability.includes(val))) {
        return 'Any ranged weapon'
      } else {
        return item.availability.join(', ')
      }
    }
  }
}
</script>
