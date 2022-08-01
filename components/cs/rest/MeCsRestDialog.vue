<template>
  <v-dialog
    v-model="shown"
    max-width="500"
    scrollable
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :transition="$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'"
  >
    <v-card :loading="working">
      <v-card-title class="text-h5">
        Take a {{ type }} rest?
      </v-card-title>
      <v-card-text>
        <!-- biotic recovery -->
        <v-card v-if="type === 'short' && maxBioticRecoverySlots" shaped outlined elevation="0">
          <v-card-title class="text-subtitle-2">
            Biotic Recovery: {{ maxBioticRecoverySlots }} levels worth of power slots
          </v-card-title>
          <v-card-text class="px-3 py-0">
            <div>
              {{ bioticRecoveryTotal }} of {{ maxBioticRecoverySlots }} remaining
            </div>
            <v-row>
              <v-col cols="4">
                <v-select
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
        <v-card v-if="type === 'short' && tpRecharges.length" shaped outlined class="mt-2" elevation="0">
          <v-card-title>
            Tech Point Recharge
          </v-card-title>
          <v-card-text text="px-3 py-0">
            <me-cs-rest-tp-recharge v-for="(recharge, index) of tpRecharges" :key="`recharge-${index}`" :recharge="recharge" :reset="resetting" @recharge="setRecharge($event)" />
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
                You can regain {{ Math.max(Math.floor(level / 2), 1) }} hit dice.
              </div>
            </div>
            <div v-if="type === 'short' || !regainAllHitDice">
              <template v-for="(klass, index) in klasses">
                <me-cs-hit-dice-tracker :key="`klass-hit-dice-${klass.id}`" :class-index="index" />
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
        <v-btn text @click="shown = false">
          Cancel
        </v-btn>
        <v-spacer />
        <v-btn text color="primary" @click="execRest(type)">
          Take {{ type }} rest
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// TODO: remove rep benefits on long rest
import { createNamespacedHelpers } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsRestDialog',
  data () {
    return {
      type: 'short',
      working: false,
      bioticRecovery: [0, 0, 0],
      tpRecharge: 0,
      hpFromHitDice: null,
      reduceIndoctrination: false,
      reduceExhaustion: false,
      resetting: false
    }
  },
  computed: {
    ...mapGetters({
      character: 'character',
      klasses: 'klasses/selectedKlasses',
      pactSlots: 'powers/pactSlots',
      mechanics: 'mechanics/mechanics',
      powers: 'powers/powers',
      level: 'klasses/level',
      restMenu: 'navigation/restMenu',
      mcBonus: 'mechanics/mcBonus'
    }),
    tpRecharges () {
      return this.mechanics.filter(i => i.type === 'tp-recharge')
    },
    maxBioticRecoverySlots () {
      return this.mechanics.filter(i => i.type === 'ps-recovery').reduce((acc, curr) => {
        return acc + this.mcBonus(curr.max)
      }, 0)
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
    shown: {
      get () {
        return !!this.restMenu
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'restMenu', value })
      }
    },
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    regainAllHitDice () {
      return this.mechanics.find(i => i.type === 'regain-all-hit-dice')
    }
  },
  watch: {
    restMenu (newVal) {
      if (newVal) {
        this.type = newVal
        this.resetting = false
      } else {
        this.reset()
      }
    }
  },
  methods: {
    reset () {
      this.bioticRecovery = [0, 0, 0]
      this.tpRecharge = 0
      this.hpFromHitDice = null
      this.working = false
      this.resetting = true
    },
    setRecharge (value) {
      this.tpRecharge += value
    },
    execRest (type) {
      this.working = true
      const currentStatsClone = cloneDeep(this.character.currentStats)
      const mechanicsToProcess = [
        ...this.mechanics.filter(i => type === 'short' ? (i.resource?.reset && i.resource?.reset === type) : (i.resource && [null, undefined, 'short', 'long'].includes(i.resource.reset))),
        ...(this.character.brews || []).filter(i => i.mechanics?.uses && (type === 'short' ? i.mechanics?.recharge === 'short' : true)),
        ...this.powers.filter(i => type === 'short' ? (i.resource?.reset && i.resource?.reset === type) : (i.resource && [null, undefined, 'short', 'long'].includes(i.resource.reset)))
      ]
      // barrier
      currentStatsClone.barrier.used = 0

      // powercasting resources
      if (type === 'long') {
        // LONG REST, all powers/tp
        currentStatsClone.psUsed = [0, 0, 0, 0, 0]
        currentStatsClone.tpUsed = 0
      } else if (type === 'short') {
        // SHORT REST
        // pactCastings
        if (this.pactSlots.slotLevel > 0) {
          currentStatsClone.psUsed[this.pactSlots.slotLevel - 1] = Math.max(0, currentStatsClone.psUsed[this.pactSlots.slotLevel - 1] - this.pactSlots.numSlots)
        }
        // biotic recovery
        if (this.bioticRecovery.some(i => i > 0)) {
          for (let i = 0; i < 3; i++) {
            if (this.bioticRecovery[i] > 0) {
              currentStatsClone.psUsed[i] = Math.max(0, currentStatsClone.psUsed[i] - this.bioticRecovery[i])
            }
          }
        }

        // tech points
        if (this.tpRecharge > 0) {
          currentStatsClone.tpUsed = Math.max(0, currentStatsClone.tpUsed - this.tpRecharge)
        }
      }

      /*
      PROCESS Feats, Powers, Traits, Class Features, Custom
       */
      for (const mechanic of mechanicsToProcess) {
        const id = mechanic.resource?.id || mechanic.id
        if (currentStatsClone.resources[id]) {
          currentStatsClone.resources[id] = 0
        }
      }

      /*
      SHIELDS
       */
      currentStatsClone.shieldsLost = 0

      /*
      HP
       */
      if (type === 'long') {
        // recover all
        currentStatsClone.hitPointsLost = 0
        // hit dice
        if (this.regainAllHitDice) {
          for (const klass of this.klasses) {
            currentStatsClone.hitDiceUsed[klass.id] = 0
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
        currentStatsClone.tempHp = {
          max: 0,
          value: 0
        }
        // indoctrination
        if (this.reduceIndoctrination) {
          currentStatsClone.indoctrination = Math.max(0, currentStatsClone.indoctrination - 1)
        }
        // exhaustion
        if (this.reduceExhaustion) {
          currentStatsClone.exhaustion = Math.max(0, currentStatsClone.exhaustion - 1)
        }
      }
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats', value: currentStatsClone })
      this.shown = false
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
