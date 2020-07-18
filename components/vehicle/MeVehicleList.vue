<template lang="pug">
  div
    p.headline Transports
    v-expansion-panels
      v-expansion-panel(v-for="item in transports" v-bind:key="item.id")
        v-expansion-panel-header {{ item.name }}
        v-expansion-panel-content.text-body-2
          me-vehicle-info(:item="item").mt-2
          me-bookmark(type="vehicle" :item="item")
    p.headline.mt-5 Starships
    v-expansion-panels
      v-expansion-panel(v-for="item in starships" v-bind:key="item.id")
        v-expansion-panel-header {{ item.name }}
        v-expansion-panel-content.text-body-2
          me-vehicle-info(:item="item").mt-2
          me-bookmark(type="vehicle" :item="item")
</template>

<script>
export default {
  name: 'MeVehicleList',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
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
