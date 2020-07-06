<template lang="pug">
  table.table
    thead
      tr
        th Property
        th Mechanic
    tbody
      tr(v-for="property in weaponProperties" v-bind:key="property.name")
        td(data-table-key="Property") {{ property.name }}
        td(data-table-key="Mechanic") {{ property.description }}
</template>

<script>
export default {
  data () {
    return {
      weaponProperties: []
    }
  },
  async created () {
    this.weaponProperties = await this.$store.dispatch('FETCH_DATA', 'weapon-properties')
  }
}
</script>
