<template lang="pug">
  table.table
    thead
      tr
        th
        th(colspan="3")
        th
      tr
        th(v-for="header in headers" v-bind:key="header") {{ header }}
    tbody
      tr(v-for="(item, index) in items" v-bind:key="item.pace")
        td(data-table-key="headers[index].text") {{ item.pace }}
        td(data-table-key="headers[index].text") {{ item.perMinute }}
        td(data-table-key="headers[index].text") {{ item.perHour }}
        td(data-table-key="headers[index].text") {{ item.perDay }}
        td(data-table-key="headers[index].text") {{ item.effect }}
</template>

<script>
  export default {
    data () {
      return {
        headers: ['Pace', 'per Minute', 'per Hour', 'per Day', 'Effect'],
        items: [
          {
            pace: 'fast',
            perMinute: '120m (~400 ft)',
            perHour: '7km (~4 miles)',
            perDay: '50km (~30 miles)',
            effect: '-5 penalty to passive Wisdom (Perception) scores'
          },
          {
            pace: 'medium',
            perMinute: '90m (~300 ft)',
            perHour: '5km (~3 miles)',
            perDay: '40km (~24 miles)',
            effect: '-'
          },
          {
            pace: 'slow',
            perMinute: '60m (~200 ft)',
            perHour: '3km (~2 miles)',
            perDay: '30km (~18 miles)',
            effect: 'Able to use stealth'
          }
        ]
      }
    }
  }
</script>

