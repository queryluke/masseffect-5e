<template lang="pug">
  table.table
    thead
      tr
        th Level
        th Barrier Ticks
    tbody
      tr(v-for="level in vanguard.progression" v-bind:key="level.level")
        td(data-table-key="Level") {{ level.level | ordinal }}
        td(data-table-key="Barrier Ticks") {{ level.barrierTicks }}
</template>

<script>
import vanguard from '~/static/data/classes/vanguard.json'

export default {
  data () {
    return {
      vanguard
    }
  }
}
</script>
