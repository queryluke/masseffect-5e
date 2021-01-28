<template>
  <div>
    <v-data-table
      :headers="headerArray"
      :items="progression"
      hide-default-footer
      :items-per-page="-1"
      class="text-center"
    >
      <template
        v-slot:header
      >
        <thead>
          <tr v-if="item.powercasting && $vuetify.breakpoint.mdAndUp">
            <th :colspan="powerCastingHeaderOffset">
            </th>
            <th :colspan="powerCastingColumnCount" class="text-center">
              Power Slots by Power Level
            </th>
          </tr>
        </thead>
      </template>

      <template
        v-slot:item.level="{ item: levelItem }"
      >
        <td
          :id="levelItem.id"
        >
          {{ levelItem.level }}
        </td>
      </template>

      <template
        v-slot:header.features="{ header: featureHeader }"
      >
        <th class="text-left">
          {{ featureHeader.text }}
        </th>
      </template>

      <template
        v-slot:item.features="{ item: featureItem }"
      >
        <td class="text-left">
          {{ featureItem.features }}
        </td>
      </template>

      <template
        v-slot:header.psByPl="{ header: psByPlHeader }"
      >
        <tr v-if="$vuetify.breakpoint.smAndDown">
          {{ psByPlHeader }}
        </tr>
      </template>

      <template
        v-slot:item.psByPl="{ item: psByPlItem }"
      >
        <td
          v-if="$vuetify.breakpoint.smAndDown"
          :id="`${psByPlItem.id}Intersect`"
          v-intersect="{ handler: onIntersect, threshold: [1] }"
        >
        </td>
      </template>
    </v-data-table>

    <v-footer
      v-if="$vuetify.breakpoint.smAndDown"
      padless
      fixed
    >
      <v-tabs
        v-model="levelTab"
        dark
        :background-color="mobileLevelTabsColor"
        color="grey grey-lighten-4"
        slider-color="white"
        active-class="white--text"
        center-active
        show-arrows
        centered
      >
        <v-tab
          v-for="level in progression"
          :key="level.id"
          @click="toLevel(level.id)"
        >
          {{ level.level }}
        </v-tab>
      </v-tabs>
    </v-footer>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialog: false,
      selectedLevel: null,
      levelTab: null,
      stringIds: [
        'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
        'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'
      ],
      goingTo: false
    }
  },
  computed: {
    item () {
      return this.$store.getters.getItem('classes', this.id)
    },
    characterProgression () {
      return this.$store.getters.getData('character-progression').slice().sort((a, b) => a.level > b.level ? 1 : -1)
    },
    classFeatures () {
      return this.$store.getters.getData('class-features')
    },
    subclasses () {
      return this.$store.getters.getData('subclasses').filter(i => i.class === this.item.id)
    },
    powerCastingColumnCount () {
      return this.item.progressionColumns.filter(p => p.ps).length
    },
    powerCastingHeaderOffset () {
      return this.headerArray.length - this.powerCastingColumnCount
    },
    headerArray () {
      const array = [
        {
          text: 'Level',
          value: 'level',
          sortable: false,
          class: 'text-center'
        },
        {
          text: 'Proficiency Bonus',
          value: 'proficiencyBonus',
          sortable: false,
          class: 'text-center'
        }
      ]
      for (const p of this.item.progressionColumns) {
        array.push({ text: p.name, value: p.key, sortable: false, class: 'text-center' })
      }
      // Inject powerslotheader
      if (this.powerCastingColumnCount > 0) {
        array.splice(array.length - this.powerCastingColumnCount, 0, { text: 'Power Slots by Power Level', value: 'psByPl', sortable: false, class: 'text-center' })
      }
      return array
    },
    progression () {
      const progression = []
      for (const row of this.characterProgression) {
        const output = {}
        output.id = `${this.stringIds[row.level - 1]}Level`
        output.level = `${row.level}${this.$options.filters.ordinal(row.level)}`
        output.proficiencyBonus = `+${row.bonus}`
        for (const p of this.item.progressionColumns) {
          let ps = false
          if (typeof p.values === 'undefined') {
            output[p.key] = this.getFeatureTextByLevel(row.level)
          } else {
            const text = p.values[row.level - 1]
            if (!p.ps) {
              ps = true
              output.psByPl = ps
            }
            output[p.key] = p.ps && text === 0 ? '-' : text
          }
        }
        progression.push(output)
      }
      return progression
    },
    mobileLevelTabsColor () {
      return this.$store.getters['config/classThemes'][this.item.id].light.tabColor
    },
    spellSlotArray () {
      return this.item.spellSlots ? [...Array(this.item.maxSpellSlot).keys()] : []
    }
  },
  methods: {
    featuresByLevel (level) {
      return this.classFeatures.filter(i => i.level === level)
    },
    getFeatureTextByLevel (level) {
      if (this.item.abiLevels.includes(level)) {
        return 'Ability Score Increase'
      }
      if (this.item.subclassProgression.level.includes(level)) {
        return this.item.subclassProgression.label
      }
      return this.featuresByLevel(level).map(i => i.name).join(', ')
    },
    onIntersect (entries) {
      if (this.goingTo) {
        return
      }
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      if (entries[0].isIntersecting && entries[0].intersectionRatio === 1) {
        const id = entries[0].target.id.replace('Intersect', '')
        this.levelTab = this.progression.findIndex(i => i.id === id)
      }
    },
    toLevel (target) {
      this.goingTo = true
      this.$vuetify.goTo(`#${target}`, { offset: 10, duration: 300 })
      setTimeout(() => {
        this.goingTo = false
      }, 300)
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
