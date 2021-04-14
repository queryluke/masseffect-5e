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
              {{ $t('character.klass.progression.columns.power_slots_by_power_level') }}
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
        #[`item.features`]="{ item: featureItem, isMobile }"
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
        #[`item.power_level`]="{ item: featureItem }"
      >
        <span class="text-center">
          {{ $t(`numbers.ordinal[${featureItem.power_level}]`) }}
        </span>
      </template>

      <!--
      <template
        #[`header.psByPl`]="{ header: psByPlHeader }"
      >
        <tr v-if="$vuetify.breakpoint.xs">
          {{ psByPlHeader.text }}
        </tr>
      </template>

      <template
        #[`item.psByPl`]="{ item: psByPlItem }"
      >
        <td
          v-if="$vuetify.breakpoint.smAndDown"
          :id="`${psByPlItem.cssId}Intersect`"
          v-intersect="{ handler: onIntersect, threshold: [1] }"
        />
      </template>
      -->
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
            {{ $t('level.nth', { level: selectedRow.level }) }}
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
import { KlassMixins } from '~/mixins/klassMixins'

export default {
  mixins: [KlassMixins],
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
    }
  },
  methods: {
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
