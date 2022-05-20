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
      mobile-breakpoint="960"
      @click:row="showFeature"
    >
      <template
        #header
      >
        <thead>
          <tr v-if="powerCastingColumnCount > 0 && $vuetify.breakpoint.mdAndUp">
            <th :colspan="powerCastingHeaderOffset" />
            <th :colspan="powerCastingColumnCount" class="text-center">
              {{ $t('class_feature_columns.power_slots_by_power_level') }}
            </th>
          </tr>
        </thead>
      </template>

      <template
        #[`item.level`]="{ item: levelItem }"
      >
        <span
          :id="levelItem.cssId"
        >
          {{ levelItem.level }}
        </span>
      </template>

      <template
        #[`header.features`]="{ header: featureHeader }"
      >
        <th class="text-left">
          {{ featureHeader.text }}
        </th>
      </template>

      <template
        #[`item.features`]="{ item: featureItem }"
      >
        <td
          class="text-left"
        >
          {{ featureItem.features }}
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
          flat
          :[textMode]="true"
          :color="classFillDark"
        >
          <v-toolbar-title>
            {{ $t('level_nth', { nth: selectedRow.level }) }}
          </v-toolbar-title>
          <v-spacer />
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
            :klass-id="item.id"
            :level="selectedLevel"
          />
          <me-subclass-feature-list v-if="isSubclassLevel" :klass-id="item.id" :level="selectedLevel" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      selectedRow: null,
      levelTab: null,
      goingTo: false
    }
  },
  computed: {
    characterProgression () {
      return this.$store.getters.getData('character-progression')
    },
    classFeatures () {
      return this.$store.getters.getData('class-features').filter(i => i.klass === this.item.id)
    },
    cfMechanics () {
      return this.classFeatures.reduce((acc, curr) => acc.concat(curr.mechanics || []), [])
    },
    pcLevelAndProfBonus () {
      return [
        {
          header: {
            text: 'Level',
            value: 'level',
            align: 'center'
          },
          values: this.characterProgression.map(i => this.$t(`ordinal_numbers[${i.level}]`))
        },
        {
          header: {
            text: 'Prof Bonus',
            value: 'profBonus',
            align: 'center'
          },
          values: this.characterProgression.map(i => `+${i.profBonus}`)
        }
      ]
    },
    pcFeatures () {
      return [
        {
          header: { text: 'Features', value: 'features', align: 'start' },
          values: this.characterProgression.map(i => this.getFeatureTextByLevel(i.level))
        }
      ]
    },
    pcFromMechanics () {
      return this.cfMechanics
        .filter(i => !!i.progressionColumn)
        .sort((a, b) => a.progressionColumn.order - b.progressionColumn.order)
        .map((i) => {
          return {
            order: i.progressionColumn.order,
            header: {
              text: i.progressionColumn.label,
              value: i.progressionColumn.label.toLowerCase().replaceAll(' ', '-'),
              align: 'center'
            },
            values: i.progressionColumn.values
          }
        })
    },
    pcCantrips () {
      const cantrips = this.cfMechanics.find(i => i.type === 'cantrips')
      if (!cantrips) {
        return false
      }
      return [
        {
          header: { text: cantrips.columnName || 'Cantrips', value: 'cantrips', align: 'center' },
          values: cantrips.known.map(i => i || '-')
        }
      ]
    },
    pcPowersKnown () {
      const known = this.cfMechanics.find(i => i.type.startsWith('powercasting') && !!i.known)
      if (!known) {
        return false
      }
      return [
        {
          header: { text: 'Powers Known', value: 'powersKnown', align: 'center' },
          values: known.known
        }
      ]
    },
    pcPact () {
      const pcPact = this.cfMechanics.find(i => i.type === 'powercasting-pact')
      if (!pcPact) {
        return false
      }
      return [
        {
          header: {
            text: 'Power Slots',
            value: 'powerNumSlots',
            align: 'center'
          },
          values: pcPact.numSlots
        },
        {
          header: {
            text: 'Power Level',
            value: 'powerSlotLevel',
            align: 'center'
          },
          values: pcPact.slotLevel
        }
      ]
    },
    pcSlots () {
      const pcSlots = this.cfMechanics.find(i => i.type === 'powercasting-slots')
      if (!pcSlots) {
        return false
      }
      const output = []
      for (let i = 1; i < 6; i++) {
        if (pcSlots.slots[i]) {
          output.push(
            {
              header: { text: this.$t(`ordinal_numbers[${i}]`), value: `powerSlots${i}`, align: 'center' },
              values: pcSlots.slots[i].map(j => j || '-')
            }
          )
        }
      }
      return output
    },
    pcPoints () {
      const pcPoints = this.cfMechanics.find(i => i.type === 'powercasting-points')
      if (!pcPoints) {
        return false
      }
      return [
        {
          header: {
            text: 'Tech Points',
            value: 'techPoints',
            align: 'center'
          },
          values: pcPoints.points
        },
        {
          header: {
            text: 'Tech Point Limit',
            value: 'techPointLimit',
            align: 'center'
          },
          values: pcPoints.limit
        }
      ]
    },
    pcBarrier () {
      const barrier = this.cfMechanics.find(i => i.type === 'barrier')
      if (!barrier) {
        return false
      }
      return [
        {
          header: {
            text: 'Barrier Uses',
            value: 'barrierUses',
            align: 'center'
          },
          values: barrier.uses
        },
        {
          header: {
            text: 'Barrier Ticks',
            value: 'barrierTicks',
            align: 'center'
          },
          values: barrier.ticks
        }
      ]
    },
    progressionColumns () {
      return [
        ...this.pcLevelAndProfBonus,
        ...(this.pcFromMechanics.filter(i => i.order > 1 && i.order < 5) || []),
        ...this.pcFeatures,
        ...(this.pcFromMechanics.filter(i => i.order > 5 && i.order < 10) || []),
        ...(this.pcBarrier || []),
        ...(this.pcFromMechanics.filter(i => i.order > 10 && i.order < 14) || []),
        ...(this.pcCantrips || []),
        ...(this.pcFromMechanics.filter(i => i.order > 15 && i.order < 20) || []),
        ...(this.pcPowersKnown || []),
        ...(this.pcPoints || []),
        ...(this.pcPact || []),
        ...(this.pcSlots || [])
      ]
    },
    selectedLevel () {
      return this.selectedRow ? this.selectedRow.id : false
    },
    isSubclassLevel () {
      return this.item.progression.subclass.includes(this.selectedLevel)
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
    },
    progression () {
      const items = []
      for (const row of this.characterProgression) {
        const output = {
          cssId: `Level${row.level}`,
          id: row.level
        }
        for (const p of this.progressionColumns) {
          output[p.header.value] = p.values[row.level - 1]
        }
        items.push(output)
      }
      return items
    },
    powerCastingColumnCount () {
      return this.pcSlots ? this.pcSlots.length : 0
    },
    powerCastingHeaderOffset () {
      return this.headerArray.length - this.powerCastingColumnCount
    },
    headerArray () {
      return this.progressionColumns.map(i => i.header)
    }
  },
  methods: {
    getFeatureTextByLevel (level) {
      const features = this.classFeatures.filter(i => i.level === level && !i.subclass).map(i => i.name)
      if (this.item.progression.abi.includes(level)) {
        features.push(this.$t('ability_score_increase_title'))
      }
      if (this.item.progression.subclass.includes(level)) {
        features.push(this.$t(`subclass_feature_titles.${this.item.id}`))
      }
      return features.length === 0 ? '-' : this.$t(`lists.comma_list[${features.length}]`, features)
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
