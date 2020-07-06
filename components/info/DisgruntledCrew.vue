<template lang="pug">
  v-data-table(v-bind:headers="profs.headers" v-bind:items="profs.items" hide-actions)
    template(slot="items" slot-scope="props")
      td {{ props.item.roll }}
      td {{ props.item.result }}
</template>

<script>
export default {
  data () {
    return {
      profs: {
        headers: [
          { text: 'd20 + number of disgruntled crew', value: 'roll', sortable: false, align: 'left' },
          { text: 'Result', value: 'result', sortable: false, align: 'left' }
        ],
        items: [
          {
            roll: '1 - 5',
            result: 'Nothing happens.'
          },
          {
            roll: '6 - 8',
            result: 'A fight breaks out between two crew members. Another member of your crew becomes disgruntled.'
          },
          {
            roll: '9 - 11',
            result: 'One of your disgruntled crew quits the next time you’re at port.'
          },
          {
            roll: '12 - 13',
            result: 'A crew member starts an private email chain that infuriates the other crew. Two additional crew become disgruntled.'
          },
          {
            roll: '14 - 15',
            result: 'All of your disgruntled crew quit the next time you’re at port.'
          },
          {
            roll: '16 - 17',
            result: 'A crew member forgets to service their system. You must pay 3,000 credits before you can use it again. (If this is the Drive, you ship cannot move between systems)'
          },
          {
            roll: '18 - 19',
            result: 'A crew member sabotages their system. You must pay 20,000 credits before you can use it again. (If this is the Drive, you ship cannot move between systems)'
          },
          {
            roll: '20 +',
            result: 'The crew mutinies. They all become hostile and attack your party.'
          }
        ]
      }
    }
  }
}
</script>
