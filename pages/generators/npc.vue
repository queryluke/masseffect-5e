<template>
  <v-container>
    <me-page-title />
    <v-card>
      <v-expand-transition>
        <v-card-text v-show="showInfo">
          <v-alert
            border="top"
            colored-border
            type="info"
            flat
          >
            <p>
              The NPC Generator has not been updated with the latest species traits that were released with the v140 update, but it
              is our current priority to get the traits into the generator.
            </p>
            <p>
              If you leave the Species Traits switch ON, you will see old traits from v131 (though some are the same). You
              should feel free to leave this OFF if you'd like to avoid any confusion at your table.
            </p>
          </v-alert>
          <p>
            This generator creates disposable NPCs based on the Mass Effect archetypes. Your options for NPC generation are:
          </p>
          <ul class="text-body-2">
            <li>Offensive vs Defensive: Offensive increase damage per round, but reduces AC, Shields, and Hit Points. Defensive does the opposite.</li>
            <li>Damage Priority: When randomly generating attack, the generator will attempt to have the highest damage source be the selected type, either powers, weapons, or grenades.</li>
            <li>
              Grenade Toggle: Whether or not you want the NPC to use grenades
            </li>
            <li>Species Traits: Whether or not you want the NPC to gain any special species traits.</li>
          </ul>
        </v-card-text>
      </v-expand-transition>
      <v-card-actions>
        <v-btn text @click="showInfo = !showInfo">
          {{ showInfo ? 'Hide' : 'Show Generator Details' }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mt-8">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-select
              v-model="selectedCr"
              :items="crs"
              label="Select a Challenge Rating"
              item-text="cr"
              item-value="cr"
              return-object
              single-line
              menu-props="bottom"
              hint="Challenge Rating"
              persistent-hint
              clearable
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="selectedCl"
              :items="classes"
              label="Select a Class"
              item-text="name"
              item-value="id"
              return-object
              single-line
              menu-props="bottom"
              hint="Class"
              persistent-hint
              clearable
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="selectedSp"
              :items="species"
              label="Select a Species"
              item-text="name"
              item-value="id"
              return-object
              single-line
              menu-props="bottom"
              hint="Species"
              persistent-hint
              clearable
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="8" offset-md="2" lg="6" offset-lg="3">
            <v-slider
              v-model="selectedOffensiveScale"
              min="-2"
              max="2"
              :color="sliderColor"
              :track-color="sliderTrackColor"
              :thumb-color="sliderThumbColor"
            >
              <template #prepend class="body-2">
                <span class="body-2">
                  More Defensive
                </span>
              </template>
              <template #append>
                <span class="body-2">
                  More Offensive
                </span>
              </template>
            </v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-select
              v-model="selectedDamageFocus"
              :items="damageFocusOptions"
              label="Damage Priority"
              single-line
              menu-props="bottom"
              clearable
              @change="damageFocusAdjustments()"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-switch v-model="selectedGrenades" dense label="Grenades?" class="ml-sm-6 ml-md-12" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-switch v-model="selectedTraits" dense label="Species Traits?" class="ml-md-12" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          @click="generate()"
        >
          Generate
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-row>
      <v-col
        sm="10"
        lg="8"
        offset-sm="1"
        offset-lg="2"
        class="mt-8"
      >
        <v-card v-if="generated">
          <v-card-text>
            <me-npc-stat-block :stats="npc" :title="true" />
          </v-card-text>
          <v-card-actions>
            <me-bookmark :item="npc" type="genpc" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { RandomValue } from '~/mixins/randomValue'
import { NpcGenerator } from '~/mixins/npc_generator'

export default {
  mixins: [RandomValue, NpcGenerator],
  async asyncData ({ store, i18n }) {
    store.dispatch('SET_META', {
      title: i18n.t('npc_generator_title'),
      description: i18n.t('meta.npc_generator')
    })
    await store.dispatch('FETCH_LOTS', ['classes', 'species', 'npc-stats', 'powers', 'weapons', 'gear', 'skills'])
  },
  data () {
    return {
      showInfo: true,
      selectedCr: null,
      selectedSp: null,
      selectedCl: null,
      selectedOffensiveScale: 0,
      selectedGrenades: true,
      selectedTraits: true,
      selectedDamageFocus: null,
      options: {
        cr: null,
        klass: null,
        species: null,
        offensiveScale: 0,
        grenades: true,
        traits: true,
        damageFocus: null
      },
      scaleIndex: [-2, -1, 0, 1, 2],
      offensiveScaleColors: ['blue-grey lighten-1', 'blue-grey lighten-1', 'blue-grey lighten-1', 'red darken-3', 'red darken-4'],
      offensiveScaleTrackColors: ['blue darken-4', 'blue darken-3', 'blue-grey lighten-1', 'blue-grey lighten-1', 'blue-grey lighten-1'],
      offensiveScaleThumbColors: ['blue darken-4', 'blue darken-3', 'blue-grey lighten-1', 'red darken-3', 'red darken-4'],
      damageFocusOptions: ['powers', 'weapons', 'grenades']
    }
  },
  computed: {
    crs () {
      return this.$store.getters.getData('npc-stats')
    },
    classes () {
      return this.$store.getters.baseData('classes')
    },
    species () {
      return this.$store.getters.baseData('species').filter(i => !['subspecies', 'variant'].includes(i.type))
    },
    spells () {
      return this.$store.getters.baseData('powers')
    },
    weapons () {
      return this.$store.getters.baseData('weapons')
    },
    grenades () {
      return this.$store.getters.baseData('gear').filter(g => g.type === 'grenade')
    },
    sliderColor () {
      return this.offensiveScaleColors[this.scaleIndex.indexOf(this.selectedOffensiveScale)]
    },
    sliderTrackColor () {
      return this.offensiveScaleTrackColors[this.scaleIndex.indexOf(this.selectedOffensiveScale)]
    },
    sliderThumbColor () {
      return this.offensiveScaleThumbColors[this.scaleIndex.indexOf(this.selectedOffensiveScale)]
    }
  },
  methods: {
    damageFocusAdjustments () {
      if (this.selectedDamageFocus === 'grenades' && this.selectedGrenades === false) {
        this.selectedGrenades = true
      }
    },
    generate () {
      this.options = {
        cr: this.selectedCr === null ? this.randomValue(this.crs) : this.selectedCr,
        klass: this.selectedCl === null ? this.randomValue(this.classes) : this.selectedCl,
        species: this.selectedSp === null ? this.randomValue(this.species) : this.selectedSp,
        offensiveScale: this.selectedOffensiveScale,
        grenades: this.selectedGrenades,
        traits: this.selectedTraits,
        damageFocus: this.selectedDamageFocus === null ? this.randomValue(this.damageFocusOptions) : this.selectedDamageFocus
      }
      this.generated = false
      this.npc = {}
      setTimeout(() => this.generateGrunt(), 300)
    }
  }
}
</script>
