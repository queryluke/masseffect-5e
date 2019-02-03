<template lang="pug">
  v-container(fluid)
    h2.display-3.my-3 Races
    v-layout(row wrap)
      v-flex(v-for="race in items" v-bind:key="race.id" d-flex).xs12.sm6.md4.mb-4
        race-card(:data="race")
</template>

<script>
  import items from '~/static/data/races'
  import RaceCard from '~/components/race/Card.vue'

  export default {
    components: { RaceCard },
    data () {
      return {
        items
      }
    },
    head () {
      return {
        title: 'Races | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Every race you need for a deeply involved Mass Effect Campaign.' }
        ]
      }
    },
    layout: 'phb',
    methods: {

    }
  }
</script>
