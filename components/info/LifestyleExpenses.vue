<template lang="pug">
    v-data-table(:headers="headers" :items="items" hide-default-footer :items-per-page="-1")
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Lifestyle', value: 'name', align: 'left', sortable: false },
        { text: 'Credits/Day', value: 'cost', sortable: false, align: 'left' }
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
