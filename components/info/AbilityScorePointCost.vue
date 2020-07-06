<template lang="pug">
  v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions)
    template(slot="items" slot-scope="props")
      td {{ props.item.score }}
      td {{ props.item.cost }}
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Score', value: 'score', sortable: false, align: 'left' },
        { text: 'Cost', value: 'cost', sortable: false, align: 'left' }
      ],
      items: [
        { score: 8, cost: 0 },
        { score: 9, cost: 1 },
        { score: 10, cost: 2 },
        { score: 11, cost: 3 },
        { score: 12, cost: 4 },
        { score: 13, cost: 5 },
        { score: 14, cost: 7 },
        { score: 15, cost: 9 }
      ]
    }
  }
}
</script>
