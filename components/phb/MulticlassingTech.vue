<template lang="pug">
  rule-card(id="multiclassing-tech")
    span(slot="header") Tech
    template(slot="text")
      p.
        Your capacity for techcasting depends partly on your combined levels in all your techcasting classes and partly
        on your individual levels in those classes.
      p.
        #[strong Tech Points & Max TP]. You determine your tech points and max tp to spend on tech powers by adding together all
        your levels in the engineer class and half your levels (rounded down) in the infiltrator and sentinel classes. Use this
        total to determine your tech points and max tp to spend on tech powers by consulting the Multiclass Tech Table.
      p.title.mt-3 Multiclass Tech Table
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
