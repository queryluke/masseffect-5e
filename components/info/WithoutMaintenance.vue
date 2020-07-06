<template lang="pug">
  v-data-table(v-bind:headers="profs.headers" v-bind:items="profs.items" hide-actions)
    template(slot="items" slot-scope="props")
      td {{ props.item.months }}
      td {{ props.item.effect }}
</template>

<script>
export default {
  data () {
    return {
      profs: {
        headers: [
          { text: 'Months without maintenance', value: 'months', sortable: false, align: 'left' },
          { text: 'Effect', value: 'effect', sortable: false, align: 'left' }
        ],
        items: [
          {
            months: 1,
            effect: 'Any checks made at the system are made at disadvantage and any downtime activities completed with the system take twice as long.'
          },
          {
            months: 2,
            effect: 'Roll a d20. On a 5 or less, the system breaks and cannot be used in any way. It must be replaced.'
          },
          {
            months: 3,
            effect: 'Roll a d20. On a 10 or less, the system breaks and cannot be used in any way. It must be replaced.'
          },
          {
            months: 4,
            effect: 'Roll a d20. On a 15 or less, the system breaks and cannot be used in any way. It must be replaced.'
          },
          {
            months: 5,
            effect: 'The system breaks and cannot be used in any way. It must be replaced.'
          }
        ]
      }
    }
  }
}
</script>
