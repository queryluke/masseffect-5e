<template>
  <div>
    <me-cs-card-title v-if="$vuetify.breakpoint.smAndDown">
      Powers
    </me-cs-card-title>

    <!-- Power Mod -->
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="powerModAbility"
          hint="Powercasting Ability"
          :items="abilityOptions"
          persistent-hint
          outlined
          :clearable="scPcModAb !== powerModAbility"
          dense
          class="mr-3"
        />
      </v-col>
      <v-col cols="4" md="2" offset-md="1">
        <v-card outlined flat>
          <div class="ma-auto text-center">
            <div class="text-caption">
              <small>Mod</small>
            </div>
            <div class="text-h6 text-uppercase">
              {{ modText(pcMod) }}
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4" md="2">
        <v-card outlined flat>
          <div class="ma-auto text-center">
            <div class="text-caption">
              <small>Attack</small>
            </div>
            <div class="text-h6">
              {{ modText(powerAttackMod) }}
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4" md="2">
        <v-card outlined flat>
          <div class="ma-auto text-center">
            <div class="text-caption">
              <small>DC</small>
            </div>
            <div class="text-h6">
              {{ powerDc }}
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tech points -->
    <v-row>
      <v-col v-if="powerSlots[1].max" cols="12" md="8">
        <div>Power Slots</div>
        <template v-for="(value, level) of powerSlots">
          <v-row
            v-if="value.max"
            :key="`powerslots-${level}`"
            align="center"
          >
            <v-col cols="2">
              {{ $t(`ordinal_numbers[${level}]`) }}
            </v-col>
            <v-col cols="10">
              <me-cs-action-resource-display-checkbox
                :current="value.used"
                :max="value.max"
                @add="addPs(level)"
                @remove="removePs(level)"
                @set="setPs($event, level)"
              />
            </v-col>
          </v-row>
        </template>
      </v-col>
      <v-col v-if="techPoints.max" cols="12" md="4">
        <div>
          Tech Points
        </div>
        <me-cs-action-resource-display-counter
          :current="currentTp"
          :max="techPoints.max"
          @add="addTp"
          @remove="removeTp"
          @set="setTp"
        />
        <div class="text-overline text-center">
          <small>
            Limit: {{ techPoints.limit }}
          </small>
        </div>
      </v-col>
    </v-row>

    <!-- Power Slots -->
    <v-row>
      <v-col>
        <div class="d-flex justify-space-between">
          <div class="text-subtitle-1">
            Powers
          </div>
          <v-btn x-small color="primary" @click="managerDialog = true">
            Manage
          </v-btn>
        </div>
        <!--
        <template v-for="powerLevel in [0, 1, 2, 3, 4, 5]">
          <me-character-sheet-powers-at-level-list :key="`powers-at-level-${powerLevel}`" :power-level="powerLevel" />
        </template>
        -->
      </v-col>
    </v-row>

    <!-- manage dialog
    <v-dialog v-model="managerDialog" fullscreen>
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            Manage Powers
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon @click="managerDialog = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="mt-5">
          <v-container class="max-width: 1200px">
            <me-character-sheet-powers-manager />
          </v-container>
        </div>
      </v-card>
    </v-dialog>
    -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsPowers',
  mixins: [ScoreText],
  data () {
    return {
      managerDialog: false
    }
  },
  computed: {
    ...mapGetters({
      character: 'character',
      scPcModAb: 'powers/startingClassPowerModAbility',
      pcModAb: 'powers/powerModAbility',
      pcMod: 'powers/powercastingMod',
      profBonus: 'profBonus',
      techPoints: 'powers/techPoints',
      powerSlots: 'powers/powerSlots',
      powers: 'powers/powers'
    }),
    abilityOptions () {
      return ['str', 'dex', 'con', 'wis', 'int', 'cha'].map((i) => {
        return {
          text: this.$t(`abilities.${i}.title`),
          value: i
        }
      })
    },
    powerAttackMod () {
      return this.profBonus + this.pcMod + this.character.settings.attackSpellMod
    },
    powerDc () {
      return 8 + this.powerAttackMod
    },
    powerModAbility: {
      get () {
        return this.pcModAb
      },
      set (value) {
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'settings.powerModAbility', value })
      }
    },
    currentTp () {
      return this.techPoints.max - this.techPoints.used
    }
  },
  methods: {
    // These are technically "backwards" because adding TP = removing tp used
    addTp () {
      const value = Math.max(0, this.techPoints.used - 1)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.tpUsed', value })
    },
    removeTp () {
      const value = Math.min(this.techPoints.max, this.techPoints.used + 1)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.tpUsed', value })
    },
    setTp (v) {
      // set value is 5...meaning they want current tp (max - used) to = 5
      // so we want 7 - x = 5
      // x = (value - max) * -1
      const value = Math.max(0, ((v - this.techPoints.max) * -1))
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.tpUsed', value })
    },
    addPs (level) {
      const value = Math.min(this.powerSlots[level].max, this.powerSlots[level].used + 1)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.psUsed.${level - 1}`, value })
    },
    removePs (level) {
      const value = Math.max(0, this.powerSlots[level].used - 1)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.psUsed.${level - 1}`, value })
    },
    setPs (value, level) {
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.psUsed.${level - 1}`, value })
    }
  }
}
</script>
