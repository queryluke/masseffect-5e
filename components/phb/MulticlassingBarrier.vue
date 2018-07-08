<template lang="pug">
  rule-card(id="multiclassing-barrier")
    span(slot="header") Barrier
    template(slot="text")
      p.
        Your barrier capacity depends partly on your combined levels in all your spellcasting classes and partly
        on your individual levels in those classes.
      p.
        #[strong Barrier]. You determine your barrier capacity by adding together all your levels in the vanguard class
        and half your levels (rounded down) in the adept and sentinel classes. Use this total to determine your
        barrier capacity by consulting the Multiclass Barrier table.
      p.title.mt-3 Multiclass Barrier Table
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
  import RuleCard from '~/components/cards/RuleCard.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: { RuleCard },
    computed: {
      ...mapGetters(['getDataItem'])
    },
    created () {
      this.vanguard = this.getDataItem('classes', 'vanguard')
    },
    data () {
      return {
        vanguard: {}
      }
    }
  }
</script>
