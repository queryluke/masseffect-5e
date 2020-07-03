<template lang="pug">
  table.my-2.table
    thead
      tr
        th(v-for="header in headers" v-bind:key="header.value") {{ header.text }}
    tbody
      tr(v-for="(item, index) in items" v-bind:key="index")
        td(:data-table-key="headers[0].text") {{ item.name }}
        td(:data-table-key="headers[1].text") {{ item.rarity }}
        td(:data-table-key="headers[2].text") {{ item.cost }}
        td(:data-table-key="headers[3].text") {{ item.hp }}
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          name: 'Standard',
          rarity: 'Common',
          cost: '~200 credits',
          hp: '2d4 + 2'
        },
        {
          name: 'Enhanced',
          rarity: 'Uncommon',
          cost: '~500 credits',
          hp: '4d4 + 4'
        },
        {
          name: 'Superior',
          rarity: 'Rare',
          cost: '~1,500 credits',
          hp: '8d4 + 8'
        },
        {
          name: 'Ultimate',
          rarity: 'Very Rare',
          cost: '?',
          hp: '10d4 + 20'
        }
      ],
      headers: [
        { text: 'Type', value: 'name', sortable: false, align: 'left' },
        { text: 'Rarity', value: 'rarity', sortable: false, align: 'left' },
        { text: 'Cost', value: 'cost', sortable: false, align: 'left' },
        { text: 'HP Regained', value: 'hp', sortable: false, align: 'left' }
      ]
    }
  }
}
</script>
