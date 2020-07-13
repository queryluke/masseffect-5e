<template lang="pug">
  div
    div(v-for="(things, type) in items" :key="type").mb-3
      p.title.mt-5 {{ type }}
      v-data-table(:headers="headers" :items="things" hide-default-footer :items-per-page="-1").mt-0
</template>

<script>
import groupBy from 'lodash/groupBy'
export default {
  data () {
    return {
      headers: [
        { text: 'Item', value: 'name', align: 'left', sortable: false },
        { text: 'Credits', value: 'cost', sortable: false, align: 'left' }
      ],
      items: []
    }
  },
  async created () {
    const data = await this.$store.dispatch('FETCH_DATA', 'commonplace-items')
    this.items = groupBy(data, 'type')
  }
}
</script>
