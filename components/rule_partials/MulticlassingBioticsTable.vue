<template lang="pug">
  table.table
    thead
      tr
        th Level
        th 1st
        th 2nd
        th 3rd
        th 4th
        th 5th
    tbody
      tr(v-for="level in adept.progression" v-bind:key="level.level")
        td(data-table-key="Level") {{ level.level | ordinal }}
        td(v-for="(amt, key) in level.spellSlots" v-bind:key="key" v-bind:data-table-key="`${ $options.filters.ordinal(key) }`") {{ amt ? amt : '-' }}
</template>

<script>
import adept from '~/static/data/classes/adept.json'

export default {
  data () {
    return {
      adept
    }
  }
}
</script>
