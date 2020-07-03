<template lang="pug">
  div.table__overflow
    table.table
      thead
        tr(v-if="item.spellSlots" style="height: 24px; border-bottom: none;")
          th(:colspan="item.progressionHeaders.length" style="padding: 0;")
          th(:colspan="item.maxSpellSlot" style="padding: 0;") Spell Slots
        tr(style="border-bottom: 1px solid rgba(0, 0, 0, .12);")
          th(v-for="header in item.progressionHeaders" v-bind:key="header.title").text-xs-left {{ header.title }}
          th(v-for="level in spellSlotArray") {{ level + 1 | ordinal }}
      tbody
        tr(v-for="row in item.progression" v-bind:key="row.level" v-on:click="tableClick(row)").clickable
          td(v-for="header in item.progressionHeaders" v-bind:key="header.title" v-bind:data-table-key="header.title")
            span(v-if="header.title === 'Features'") {{ featureList(row) }}
            span(v-else) {{ row[headerKey(header)] }}
          td(v-for="level in spellSlotArray" v-bind:data-table-key="`Spell Slots, ${$options.filters.ordinal(level + 1)}`").
            {{ row.spellSlots[level + 1] ? row.spellSlots[level + 1] : '-' }}
          td.hidden-md-and-up.text-xs-center.full-width-td
            v-btn(@click="dialog = true; selectedLevel = row" v-bind:color="colors.primary" dark) View Features
    v-dialog(v-model="dialog" width="70vw" v-bind:fullscreen="$vuetify.breakpoint.xsOnly" scrollable)
      v-card(v-if="selectedLevel")
        v-toolbar(:class="colors.primary" flat).headline.white--text
          v-toolbar-title {{ selectedLevel.level | ordinal }} Level
        v-card-text
          div(v-for="feature in selectedLevel.features" v-bind:key="feature").mt-3
            subclass-feature(v-if="feature === 'subclass'" v-bind:item="item" v-bind:level="selectedLevel" v-bind:primaryColor="colors.primary")
            class-feature(v-else v-bind:id="feature" v-bind:featureLevel="selectedLevel")
        v-card-actions
          v-btn(@click="dialog=false" flat="flat") Close
</template>

<script>
import _ from 'lodash'
import ClassFeature from '~/components/class/ClassFeature.vue'
import features from '~/static/data/class_features'
import SubclassFeature from '~/components/class/SubclassFeature.vue'

export default {
  components: { ClassFeature, SubclassFeature },
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    colors: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      dialog: false,
      selectedLevel: null
    }
  },
  computed: {
    spellSlotArray () {
      return this.item.spellSlots ? [...Array(this.item.maxSpellSlot).keys()] : []
    }
  },
  methods: {
    featureList (level) {
      return features.filter(feature => level.features.includes(feature.id)).map((feature) => {
        switch (feature.id) {
          case 'extra_attack_2':
          case 'extra_attack_3':
          case 'brutal_critical_2':
          case 'brutal_critical_3':
          case 'adrenaline_rush_2':
          case 'indomitable_2':
          case 'indomitable_3':
            return `${feature.name}(${feature.id.split('_')[feature.id.split('_').length - 1]})`
          default:
            return feature.name
        }
      }).join(', ')
    },
    headerKey (header) {
      return header.key ? header.key : _.camelCase(header.title)
    },
    tableClick (row) {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.dialog = true
        this.selectedLevel = row
      }
    }
  }
}
</script>
