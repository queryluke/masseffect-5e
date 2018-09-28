<template lang="pug">
  table.table
    thead
      tr
        th Level
        th Tech Points
        th Max TP
    tbody
      tr(v-for="level in engineer.progression" v-bind:key="level.level")
        td(data-table-key="Level") {{ level.level | ordinal }}
        td(data-table-key="Tech Points") {{ level.techPoints }}
        td(data-table-key="Max TP") {{ level.maxTechPoints }}
</template>

<script>
  import engineer from '~/static/data/classes/engineer.json'

  export default {
    data () {
      return {
        engineer
      }
    }
  }
</script>
