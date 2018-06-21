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
        tr(v-for="row in item.progression" v-bind:key="row.level" v-on:click="dialog=true; selectedLevel=row").clickable
          td(v-for="key in progressionHeaderKeys" v-bind:key="key")
            span(v-if="key === 'features'") {{ featureList(row) }}
            span(v-else) {{ row[key] }}
          td(v-for="level in spellSlotArray") {{ row.spellSlots[level + 1] ? row.spellSlots[level + 1] : '-' }}
    v-dialog(v-model="dialog" width="70vw")
      v-card(v-if="selectedLevel")
        v-card-title(:class="colors.primary").headline.white--text {{ selectedLevel.level | ordinal }} Level
        v-card-text
          div(v-for="feature in selectedLevel.features" v-bind:key="feature").mt-3
            subclass-feature(v-if="feature === 'subclass'" v-bind:item="item" v-bind:level="selectedLevel" v-bind:primaryColor="colors.primary")
            class-feature(v-else v-bind:id="feature" v-bind:level="selectedLevel")
        v-card-actions
          v-spacer
          v-btn(@click="dialog=false" flat="flat") Close
</template>

<script>
  import _ from 'lodash'
  import {mapGetters} from 'vuex'
  import ClassFeature from '~/components/class/ClassFeature.vue'
  import SubclassFeature from '~/components/class/SubclassFeature.vue'

  export default {
    components: { ClassFeature, SubclassFeature },
    computed: {
      ...mapGetters(['getData']),
      progressionHeaderKeys () {
        return this.item.progressionHeaders.map((header) => header.key ? header.key : _.camelCase(header.title))
      },
      spellSlotArray () {
        return this.item.spellSlots ? [...Array(this.item.maxSpellSlot).keys()] : []
      }
    },
    data () {
      return {
        dialog: false,
        selectedLevel: null
      }
    },
    methods: {
      featureList (level) {
        return this.getData('classFeatures').filter(feature => level.features.includes(feature.id)).map(feature => {
          switch (feature.id) {
            case 'biotic_powers':
              return `${feature.name}(${level.newBioticSpellCount}:${level.newSpellLevelMax})`
            case 'tech_power':
              return `${feature.name}(${level.newTechSpellCount})`
            case 'techcombat_power':
              return `${feature.name}(${level.newTechSpellCount})`
            case 'extra_attack_2':
            case 'extra_attack_3':
            case 'brutal_critical_2':
            case 'brutal_critical_3':
            case 'zero-sum_2':
            case 'zero-sum_3':
            case 'adrenaline_rush_2':
              return `${feature.name}(${feature.id.split('_')[feature.id.split('_').length - 1]})`
            default:
              return feature.name
          }
        }).join(', ')
      }
    },
    props: ['item', 'colors']
  }
</script>

