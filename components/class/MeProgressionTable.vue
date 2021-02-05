<template>
  <div>
    <v-data-table
      :headers="headerArray"
      :items="progression"
      hide-default-footer
      :items-per-page="-1"
      dense
      disable-filtering
      disable-sort
      disable-pagination
      class="text-center"
      @click:row="showFeature"
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
        <span
          :id="levelItem.cssId"
        >
          {{ levelItem.level }}
        </span>
      </template>

      <template
        v-slot:header.features="{ header: featureHeader }"
      >
        <th class="text-left">
          {{ featureHeader.text }}
        </th>
      </template>

      <template
        v-slot:item.features="{ item: featureItem, isMobile }"
      >
        <td
          v-if="isMobile"
          class="px-0"
        >
          <v-btn
            v-if="featureItem.features !== '-'"
            :color="classFillDark"
            x-small
            :[textMode]="true"
            block
            @click="selectedRow = featureItem"
          >
            {{ featureItem.features }}
          </v-btn>
          <span
            v-else
          >
            -
          </span>
        </td>
        <td
          v-else
          class="text-left"
        >
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
          :id="`${psByPlItem.cssId}Intersect`"
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
        :[textMode]="true"
        :background-color="classFillDark"
        :slider-color="levelTabsSlider"
        :active-class="levelTabsActiveClass"
        center-active
        show-arrows
        centered
      >
        <v-tab
          v-for="level in progression"
          :key="level.id"
          @click="toLevel(level.cssId)"
        >
          {{ level.level }}
        </v-tab>
      </v-tabs>
    </v-footer>

    <v-dialog
      v-model="dialog"
      :max-width="1200"
    >
      <v-card
        v-if="selectedRow"
      >
        <v-toolbar
          :[textMode]="true"
          :color="classFillDark"
        >
          <v-toolbar-title>
            {{ selectedRow.level }} Level
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            :[textMode]="true"
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <me-class-feature-list
            :class-id="item.id"
            :level="selectedLevel"
            include-subclass
            show-subclass-header
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      selectedRow: null,
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
      return this.$store.getters.getData('class-features').filter(i => i.class === this.item.id)
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
          class: 'text-center'
        },
        {
          text: 'Proficiency Bonus',
          value: 'proficiencyBonus',
          class: 'text-center'
        }
      ]
      for (const p of this.item.progressionColumns) {
        array.push({ text: p.name, value: p.key, class: 'text-center' })
      }
      // Inject powerslotheader
      if (this.powerCastingColumnCount > 0) {
        array.splice(array.length - this.powerCastingColumnCount, 0, { text: 'Power Slots by Power Level', value: 'psByPl', class: 'text-center' })
      }
      return array
    },
    progression () {
      const progression = []
      for (const row of this.characterProgression) {
        const output = {}
        output.cssId = `${this.stringIds[row.level - 1]}Level`
        output.id = row.level
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
    selectedLevel () {
      return this.selectedRow ? this.selectedRow.id : false
    },
    classFillDark () {
      return this.$store.getters['config/classThemeDark'](this.item.id)
    },
    textMode () {
      return this.$store.getters['config/classThemeTextOnDark'](this.item.id)
    },
    levelTabsSlider () {
      return this.$store.getters['config/isDarkOnlyClassTheme'](this.item.id) ? 'grey darken-3' : 'white'
    },
    levelTabsActiveClass () {
      return this.$store.getters['config/isDarkOnlyClassTheme'](this.item.id) ? 'grey--text text--darken-3' : 'white--text'
    }
  },
  methods: {
    featuresByLevel (level) {
      const features = this.classFeatures.filter(i => i.level === level)
      if (this.item.abiLevels.includes(level)) {
        features.push({ name: 'Ability Score Increase', id: 'ability-score-increase' })
      }
      return features
    },
    getFeatureTextByLevel (level) {
      if (this.item.subclassProgression.level.includes(level)) {
        return this.item.subclassProgression.label
      }
      const features = this.featuresByLevel(level).map(i => i.name)
      return features.length === 0 ? '-' : features.join(', ')
    },
    onIntersect (entries) {
      if (this.goingTo) {
        return
      }
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      if (entries[0].isIntersecting && entries[0].intersectionRatio === 1) {
        const id = entries[0].target.id.replace('Intersect', '')
        this.levelTab = this.progression.findIndex(i => i.cssId === id)
      }
    },
    toLevel (target) {
      this.goingTo = true
      this.$vuetify.goTo(`#${target}`, { offset: 10, duration: 300 })
      setTimeout(() => {
        this.goingTo = false
      }, 300)
    },
    showFeature (row) {
      if (row.features !== '-') {
        this.dialog = true
        this.selectedRow = row
      } else {
        this.selectedRow = null
      }
    }
  }
}
</script>
