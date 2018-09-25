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
  import RuleCard from '~/components/cards/RuleCard.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: { RuleCard },
    computed: {
      ...mapGetters(['getDataItem'])
    },
    created () {
      this.engineer = this.getDataItem('classes', 'engineer')
    },
    data () {
      return {
        engineer: {}
      }
    }
  }
</script>
