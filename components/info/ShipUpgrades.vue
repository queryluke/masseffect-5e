<template lang="pug">
  v-data-table(v-bind:headers="headers" v-bind:items="items" hide-default-footer :items-per-page="-1").mt-0
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name', align: 'left', sortable: true },
        { text: 'System', value: 'system', sortable: true, align: 'left' },
        { text: 'Cost', value: 'cost', sortable: true, align: 'left' },
        { text: 'Prerequisite', value: 'prerequisite', sortable: false, align: 'left' },
        { text: 'Effect', value: 'effect', sortable: false, align: 'left' }
      ],
      items: []
    }
  },
  async created () {
    this.items = await this.$store.dispatch('FETCH_DATA', 'ship-upgrades')
  }
}
</script>
