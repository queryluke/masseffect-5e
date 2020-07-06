<template lang="pug">
    v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions)
      template(slot="items" slot-scope="props")
        td {{ props.item.name }}
        td {{ props.item.cost }}
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Lifestyle', value: 'lifestyle', align: 'left', sortable: false },
        { text: 'Credits/Day', value: 'credits', sortable: false, align: 'left' }
      ],
      items: [
        {
          name: 'Wretched',
          cost: '-'
        },
        {
          name: 'Squalid',
          cost: '25 credits'
        },
        {
          name: 'Poor',
          cost: '75 credits'
        },
        {
          name: 'Modest',
          cost: '150 credits'
        },
        {
          name: 'Comfortable',
          cost: '250 credits'
        },
        {
          name: 'Wealthy',
          cost: '500 credits'
        },
        {
          name: 'Aristocratic',
          cost: '1,000 credits minimum'
        }
      ]
    }
  }
}
</script>
