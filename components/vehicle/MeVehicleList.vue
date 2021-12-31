<template lang="pug">
  v-expansion-panels
    v-expansion-panel(v-for="item in items" v-bind:key="item.id")
      v-expansion-panel-header {{ item.name }}
      v-expansion-panel-content.text-body-2
        me-vehicle-info(:item="item").mt-2
        me-bookmark(type="vehicles" :item="item")
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
  }
}
</script>
