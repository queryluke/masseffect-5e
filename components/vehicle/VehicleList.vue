<template lang="pug">
  div
    p.headline Transports
    v-expansion-panel.my-2
      v-expansion-panel-content(v-for="item in transports" v-bind:key="item.id")
        div(slot="header") {{ item.name }}
        v-card.grey.lighten-3
          v-card-text
            vehicle-info(:item="item").mt-2
          v-card-actions
            bookmark-button(:card="item" type="vehicle" v-bind:props="{flat: true}")
    p.headline.mt-5 Starships
    v-expansion-panel.my-2
      v-expansion-panel-content(v-for="item in starships" v-bind:key="item.id")
        div(slot="header") {{ item.name }}
        v-card.grey.lighten-3
          v-card-text
            vehicle-info(:item="item").mt-2
          v-card-actions
            bookmark-button(:card="item" type="vehicle" v-bind:props="{flat: true}")
</template>

<script>
import BookmarkButton from '~/components/BookmarkButton.vue'
import VehicleInfo from '~/components/vehicle/VehicleInfo.vue'
import items from '~/static/data/vehicles'

export default {
  components: {
    BookmarkButton,
    VehicleInfo
  },
  data () {
    return {
      items
    }
  },
  computed: {
    transports () {
      return this.items.filter(v => v.vehicle.type === 'transport')
    },
    starships () {
      return this.items.filter(v => v.vehicle.type === 'starship')
    }
  }
}
</script>
