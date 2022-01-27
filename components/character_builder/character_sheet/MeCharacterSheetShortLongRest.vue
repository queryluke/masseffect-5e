<template>
  <div>
    <div class="d-flex justify-space-around">
      <v-btn x-small @click="openRest('short')">
        Short Rest
      </v-btn>
      <v-btn x-small @click="openRest('long')">
        Long Rest
      </v-btn>
    </div>
    <v-dialog
      v-model="restBar"
      elevation="24"
      max-width="500"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card :loading="working">
        <v-card-title class="text-h5">
          Take a {{ type }} rest?
        </v-card-title>
        <v-card-text>
          <!-- biotic recovery -->
          <v-card v-if="(adeptLevel || nemesisLevel) && type === 'short' && character.currentStats.psUsed.some(i => i > 0)" shaped outlined elevation="0">
            <v-card-title class="text-subtitle-2">
              Biotic Recovery: {{ maxBioticRecoverySlots }} levels worth of power slots
            </v-card-title>
            <v-card-text class="px-3 py-0">
              <div>
                {{ bioticRecoveryTotal }} of {{ maxBioticRecoverySlots }} remaining
              </div>
              <div v-if="sentinelLevel && type === 'short'" class="text-caption font-weight-bold">
                Note: You will regain {{ $t(`string_numbers[${sentinelSlotRecoveryNumber}]`) }}
                {{ $tc('slot', sentinelSlotRecoveryNumber, { n: `${nthLevelLabel(sentinelSlotRecovery.slotLvl, true)} power ` }) }} from your Sentinel class.
              </div>
              <v-row>
                <v-col cols="4">
                  <v-select
                    v-if="character.currentStats.psUsed[0] > 0"
                    :label="nthLevelLabel(1)"
                    :items="brFirstItems"
                    :value="bioticRecovery[0]"
                    clearable
                    :disabled="brFirstItems.length === 0"
                    @change="updateBioticRecovery(0, $event)"
                  />
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-if="character.currentStats.psUsed[1] > 0"
                    :label="nthLevelLabel(2)"
                    :items="brSecondItems"
                    :value="bioticRecovery[1]"
                    clearable
                    :disabled="brSecondItems.length === 0"
                    @change="updateBioticRecovery(1, $event)"
                  />
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-if="character.currentStats.psUsed[2] > 0"
                    :label="nthLevelLabel(3)"
                    :items="brThirdItems"
                    :value="bioticRecovery[2]"
                    clearable
                    :disabled="brThirdItems.length === 0"
                    @change="updateBioticRecovery(2, $event)"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- recharge -->
          <v-card v-if="engineerLevel && type === 'short'" shaped outlined class="mt-2" elevation="0">
            <v-card-title class="text-subtitle-2">
              Engineer Recharge: 1d{{ maxEngineerRecharge }}
            </v-card-title>
            <v-card-text class="px-3 py-0">
              <v-slider
                v-model="engineerRecharge"
                :label="engineerRecharge.toString()"
                ticks="always"
                tick-size="6"
                :tick-labels="engineerRechargeTickLabels"
                :max="maxEngineerRecharge"
              />
            </v-card-text>
          </v-card>

          <!-- hit dice -->
          <v-card outlined shaped elevation="0" class="mt-3">
            <v-card-title class="text-subtitle-2">
              Hit Dice
            </v-card-title>
            <v-card-text text="px-3 py-0">
              <v-text-field v-if="type === 'short'" v-model="hpFromHitDice" label="Total HP recovered from Hit Dice" dense />
              <div v-if="type === 'long'">
                <div v-if="regainAllHitDice">
                  You will regain all your hit dice.
                </div>
                <div v-else>
                  You can regain {{ Math.floor(level / 2) }} hit dice. Use the <v-icon size="18">
                    mdi-minus
                  </v-icon> button to regain them.
                </div>
              </div>
              <div v-if="type === 'short' || !regainAllHitDice">
                <template v-for="(klass, index) in characterClasses">
                  <me-character-sheet-hit-dice-tracker :key="`klass-hit-dice-${klass.id}`" :class-index="index" />
                </template>
              </div>
            </v-card-text>
          </v-card>

          <!-- indoctrination / exhaustion -->
          <v-row>
            <v-col>
              <v-checkbox v-if="character.currentStats.indoctrination" v-model="reduceIndoctrination" label="Reduce Indoctrination?" />
            </v-col>
            <v-col>
              <v-checkbox v-if="character.currentStats.exhaustion" v-model="reduceExhaustion" label="Reduce Exhaustion?" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn text outlined @click="restBar = false">
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn color="secondary" elevation="0" @click="execRest(type)">
            Take {{ type }} rest
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
// TODO: remove rep benefits on long rest

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      restBar: false,
      type: 'short',
      working: false,
      bioticRecovery: [0, 0, 0],
      engineerRecharge: 0,
      hpFromHitDice: null,
      reduceIndoctrination: false,
      reduceExhaustion: false
    }
  },
  computed: {
    adeptLevel () {
      const adept = this.characterClasses.find(i => i.id === 'adept')
      return adept ? adept.levels : false
    },
    engineerLevel () {
      const engineer = this.characterClasses.find(i => i.id === 'engineer')
      return engineer ? engineer.levels : false
    },
    sentinelLevel () {
      const sentinel = this.characterClasses.find(i => i.id === 'sentinel')
      return sentinel ? sentinel.levels : false
    },
    sentinelSlotRecoveryNumber () {
      return Math.min(this.sentinelSlotRecovery.numSlots, this.character.currentStats.psUsed[this.sentinelSlotRecovery.slotLvl - 1])
    },
    sentinelSlotRecovery () {
      const numSlots = this.getProgressionValue('sentinel', 'power_slots', this.sentinelLevel)
      const slotLvl = this.getProgressionValue('sentinel', 'power_level', this.sentinelLevel)
      return { numSlots, slotLvl }
    },
    maxEngineerRecharge () {
      return this.engineerLevel >= 15 ? 8 : this.engineerRecharge >= 11 ? 6 : 4
    },
    engineerRechargeTickLabels () {
      return [...Array(this.maxEngineerRecharge + 1).keys()]
    },
    nemesisLevel () {
      const nemesis = this.characterClasses.find(i => i.id === 'vanguard' && i.subclass === 'nemesis')
      return nemesis ? nemesis.levels : false
    },
    maxBioticRecoverySlots () {
      let maxSlotRecovery = 0
      if (this.adeptLevel) {
        maxSlotRecovery += Math.floor(this.adeptLevel / 2)
      }
      if (this.nemesisLevel) {
        maxSlotRecovery += Math.floor(this.nemesisLevel / 3)
      }
      return Math.max(1, maxSlotRecovery)
    },
    bioticRecoveryTotal () {
      return this.bioticRecovery.reduce((a, c, i) => a + (c * (i + 1)), 0)
    },
    brFirstItems () {
      return [...Array(Math.max(0, this.maxBioticRecoverySlots)).keys()].map(i => i + 1).filter((i) => {
        return (this.bioticRecoveryTotal - this.bioticRecovery[0]) + i <= this.maxBioticRecoverySlots
      })
    },
    brSecondItems () {
      return [...Array(Math.max(0, this.maxBioticRecoverySlots)).keys()].map(i => i + 1).filter((i) => {
        const currentValue = this.bioticRecovery[1] * 2
        const newValue = i * 2
        return (this.bioticRecoveryTotal - currentValue) + newValue <= this.maxBioticRecoverySlots
      })
    },
    brThirdItems () {
      return [...Array(Math.max(0, this.maxBioticRecoverySlots)).keys()].map(i => i + 1).filter((i) => {
        const currentValue = this.bioticRecovery[2] * 3
        const newValue = i * 3
        return (this.bioticRecoveryTotal - currentValue) + newValue <= this.maxBioticRecoverySlots
      })
    },
    regainAllHitDice () {
      return this.mechanicBag.find(i => i.type === 'regain-all-hit-dice')
    }
  },
  methods: {
    openRest (type) {
      this.working = false
      this.type = type
      this.bioticRecovery = [0, 0, 0]
      this.engineerRecharge = 0
      this.hpFromHitDice = null
      this.restBar = true
    },
    execRest (type) {
      this.working = true
      let toProcess = ['barrier']
      const currentStatsClone = JSON.parse(JSON.stringify(this.character.currentStats))
      /*
      FEATS
       */
      const featsToProcess = this.selections
        .filter(i => i.type === 'feat')
        .map(i => this.$store.getters.getItem('feats', i.value))
        .filter(i => i.mechanics?.uses && (type === 'short' ? i.mechanics?.recharge === 'short' : true))
        .map(i => i.id)
      toProcess = toProcess.concat(featsToProcess)
      /*
      CUSTOM
       */
      const brewsToProcess = (this.character.brews || [])
        .filter(i => i.mechanics?.uses && (type === 'short' ? i.mechanics?.recharge === 'short' : true))
        .map(i => i.id)
      toProcess = toProcess.concat(brewsToProcess)
      /*
      CLASS FEATURES
       */
      const featuresToProcess = this.characterClasses.map((klass) => {
        return this.features.filter((i) => {
          return i.klass === klass.id &&
            (!i.subclass || (klass.subklass ? i.subclass === klass.subklass : false)) &&
            i.level <= klass.levels &&
            i.mechanics?.uses &&
            (type === 'short' ? i.mechanics?.recharge === 'short' : true)
        })
      })
        .reduce((a, c) => a.concat(c), [])
        .map(i => i.id)
      toProcess = toProcess.concat(featuresToProcess)
      /*
      TRAITS
       */
      const speciesTraitsToProcess = this.speciesTraits.map((i) => {
        const group = []
        for (const mechanic of i.mechanics) {
          if (mechanic.has?.uses && (type === 'short' ? mechanic.has?.recharge === 'short' : true)) {
            group.push(mechanic.has.id)
          }
        }
        return group
      }).reduce((a, c) => a.concat(c), [])
      toProcess = toProcess.concat(speciesTraitsToProcess)
      /*
      POWERS
       */
      const powersToProcess = this.csAllPowers.filter(i => i.power.uses && (type === 'short' ? i.power.recharge === 'short' : true))
        .map(i => i.power.id)
      toProcess = toProcess.concat(powersToProcess)
      if (type === 'long') {
        // LONG REST, all powers/tp
        currentStatsClone.psUsed = [0, 0, 0, 0, 0]
        currentStatsClone.tpUsed = 0
      } else if (type === 'short') {
        // SHORT REST, biotic recovery, sentinel
        const slotsToRecover = [0, 0, 0, 0, 0]
        if (this.sentinelLevel) {
          const { numSlots, slotLvl } = this.sentinelSlotRecovery
          currentStatsClone.psUsed[slotLvl - 1] += numSlots
        }
        for (const [slotLvlIndex, value] of this.bioticRecovery.entries()) {
          slotsToRecover[slotLvlIndex] += value
        }
        for (const [slotLvlIndex, currVal] of currentStatsClone.psUsed.entries()) {
          currentStatsClone.psUsed[slotLvlIndex] = Math.max(0, currVal - slotsToRecover[slotLvlIndex])
        }
        // SHORT REST, biotic recovery, sentinel
        if (this.engineerLevel && this.engineerLevel >= 7) {
          currentStatsClone.tpUsed = Math.max(0, currentStatsClone.tpUsed - this.engineerRecharge)
        }
      }

      /*
      PROCESS Feats, Powers, Traits, Class Features, Custom
       */
      // TODO: to ensure the different models don't have the same id, the featureTimesUsed should have the type as part
      // of it's id. The only current overlap is Lucky feat and volus trait
      // had to update the lucky feat id to prevent this
      for (const id of toProcess) {
        if (currentStatsClone.featuresTimesUsed[id]) {
          currentStatsClone.featuresTimesUsed[id] = 0
        }
      }

      /*
      SHIELDS
       */
      currentStatsClone.shields.value = currentStatsClone.shields.max

      /*
      HP
       */
      if (type === 'long') {
        // recover all
        currentStatsClone.hitPointsLost = 0
        // hit dice
        if (this.regainAllHitDice) {
          for (const klass in currentStatsClone.hitDiceUsed) {
            currentStatsClone.hitDiceUsed[klass] = 0
          }
        }
      }
      if (type === 'short') {
        // hit dice
        if (this.hpFromHitDice && !Number.isNaN(this.hpFromHitDice)) {
          const hitDiceRecovery = Math.max(0, Number.parseInt(this.hpFromHitDice, 10))
          currentStatsClone.hitPointsLost = Math.max(0, currentStatsClone.hitPointsLost - hitDiceRecovery)
        }
      }

      if (type === 'long') {
        // temp hp
        currentStatsClone.tempHp = 0
        // indoctrination
        if (this.reduceIndoctrination) {
          currentStatsClone.indoctrination = Math.max(0, currentStatsClone.indoctrination - 1)
        }
        // exhaustion
        if (this.reduceExhaustion) {
          currentStatsClone.exhaustion = Math.max(0, currentStatsClone.exhaustion - 1)
        }
      }

      this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'currentStats', value: currentStatsClone })

      this.working = false
      this.restBar = false
    },
    nthLevelLabel (level, adj = false) {
      return this.$t(adj ? 'level_adj' : 'level_nth', { nth: this.$t(`ordinal_numbers[${level}]`) })
    },
    updateBioticRecovery (index, value) {
      const clone = [...this.bioticRecovery]
      clone.splice(index, 1, value)
      this.bioticRecovery = clone
    }
  }
}
</script>
