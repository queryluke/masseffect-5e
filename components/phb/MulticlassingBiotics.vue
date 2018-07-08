<template lang="pug">
  rule-card(id="multiclassing-biotics")
    span(slot="header") Biotics
    template(slot="text")
      p.
        Your capacity for biotics depends partly on your combined levels in all your biotic classes and partly
        on your individual levels in those classes.
      p.
        #[strong Spell Slots & Cantrips]. You determine your available spell slots and cantrips by adding together all
        your levels in the adept class and half your levels (rounded down) in the sentinel and vanguard classes. Use this
        total to determine your spell slots and cantrips by consulting the Multiclass Biotic Table.
      p.title.mt-3 Multiclass Biotic Table
      table.table
        thead
          tr
            th Level
            th Cantrips
            th 1st
            th 2nd
            th 3rd
            th 4th
            th 5th
        tbody
          tr(v-for="level in adept.progression" v-bind:key="level.level")
            td(data-table-key="Level") {{ level.level | ordinal }}
            td(data-table-key="Cantrips") {{ level.cantrips }}
            td(v-for="(amt, key) in level.spellSlots" v-bind:key="key" v-bind:data-table-key="`${ $options.filters.ordinal(key) }`") {{ amt ? amt : '-' }}
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
      this.adept = this.getDataItem('classes', 'adept')
    },
    data () {
      return {
        adept: {}
      }
    }
  }
</script>
