<template lang="pug">
  v-layout.row.wrap
    v-flex(v-for="score in scores" v-bind:key="score.name").mt-3
      div.title {{ score.name }}
      dl
        dt Measures
        dd {{ score.measures }}
        dt Important For
        dd {{ score.important }}
</template>

<script>
export default {
  data () {
    return {
      scores: [
        { name: 'Strength', measures: 'Natural athleticism, bodily power', important: 'soldiers, vanguards' },
        { name: 'Dexterity', measures: 'Physical agility, reflexes, balance, poise', important: 'soldiers, infiltrators, engineers' },
        { name: 'Constitution', measures: 'Health, stamina, vital force', important: 'everyone' },
        { name: 'Intelligence', measures: 'Mental acuity, information recall, analytical skill', important: 'engineer, infiltrator, sentinel' },
        { name: 'Wisdom', measures: 'Awareness, intuition, insight, biotic capabilities', important: 'adept, vanguard, sentinel' },
        { name: 'Charisma', measures: 'Confidence, eloquence, leadership', important: 'asari, performers, politicians' }
      ]
    }
  }
}
</script>
