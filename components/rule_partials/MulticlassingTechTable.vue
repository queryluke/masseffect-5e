<template lang="pug">
  table.table
    thead
      tr
        th Level
        th Tech Points
        th Tech Point Limit
    tbody
      tr(v-for="level in engineer.progression" v-bind:key="level.level")
        td(data-table-key="Level") {{ level.level | ordinal }}
        td(data-table-key="Tech Points") {{ level.techPoints }}
        td(data-table-key="Max TP") {{ level.techPointLimit }}
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
