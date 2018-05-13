<template lang="pug">
  v-container
    h2.display-3 Random Loot Generator
    v-card.mt-3
      v-card-text
        v-layout(row wrap)
          v-flex(xs12)
            p.display-1 Options
          v-flex(xs12).px-2.mb-2
            v-select(
              v-bind:items="crOptions"
              v-model="options.cr"
              label="Challenge Rating"
              single-line
              bottom
              hint="Challenge Rating"
              persistent-hint
            )
          v-flex(xs12).px-2
            v-checkbox(label="Hoard?" color="primary" v-model="options.hoard")
          v-flex(xs8 offset-xs2).mt-3
            v-btn(@click="getLoot()" block color="primary") Get Loot
    v-container
      v-layout
        v-flex(xs12 sm10 offset-sm1 lg8 offset-lg2)
          v-card(v-if="loot")
            v-card-text
                p result
</template>

<script>
  import {mapGetters} from 'vuex'

  // On getLoot click, save to store
  // results display all loot in store
  // Have a clear button to remove all stored loot
  // Have a collapse button to total all stored loot (into a single store, removing all others)
  // Have individual deletes

  export default {
    components: {},
    created () {},
    computed: {
      ...mapGetters(['getData', 'getMutableData'])
    },
    data () {
      return {
        options: {
          hoard: false,
          cr: 0
        },
        crOptions: [
          { text: '0-4', value: 0 },
          { text: '5-10', value: 1 },
          { text: '11-17', value: 2 },
          { text: '17+', value: 3 }
        ],
        loot: {},
        individualRewards: [
          [10, 50, 200, 350, 500],
          [500, 600, 700, 800, 900, 1000],
          [1000, 1500, 2000, 3000],
          [3000, 4500, 6000]
        ],
        hoardRewards: [
          {
            credits: 3000,
            additionalCredits: []
          }
        ]

      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | GM Tools - Loot Generator',
        meta: [
          { hid: 'description', name: 'description', content: 'A quick and easy way to decide loot.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
