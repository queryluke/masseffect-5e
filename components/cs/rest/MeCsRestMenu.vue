<template>
  <v-card :loading="working || restState === 'reset'" flat>
    <v-card-text>
      <p v-if="type === 'short'" class="text-caption">
        A short rest is a period of downtime, at least 1 hour long, during which a character does nothing more strenuous than eating, drinking, reading, and tending to wounds.
      </p>
    </v-card-text>
    <div v-if="prrMechanics.length && type === 'short'" class="px-2">
      <me-tpg s="h6">
        Power Recovery
      </me-tpg>
      <div>
        <v-row v-for="(indicator, index) in prrIndicators" :key="`recoveryIndicator-${index}`" no-gutters align="center">
          <v-col cols="4" class="text-caption">
            <small>
              {{ indicator.label }} ({{ indicator.current }}/{{ indicator.max }}){{ indicator.pact ? '*' : '' }}
            </small>
          </v-col>
          <v-col cols="8">
            <v-progress-linear :value="Math.ceil(indicator.current / indicator.max * 100)" />
          </v-col>
        </v-row>
        <div v-if="pactSlots.slotLevel > 0" class="text-caption">
          <small>
            * - automatically gain {{ pactSlots.numSlots }} slots on a short rest
          </small>
        </div>
      </div>

      <template v-for="(prrItem, index) of prrMechanics">
        <me-cs-rest-power-resource-recovery
          :key="`prrMechanic-${index}`"
          :options="prrItem"
          :available="prrAvailable"
          :reset="resetting"
          :index="index"
          :maxes="prrMaxes"
          @updatePrr="updatePrr"
        />
        <v-divider v-if="index < prrMechanics.length - 1" :key="`prrMechanicDivider-${index}`" />
      </template>
    </div>

    <!-- hit points -->
    <div v-if="type === 'short'" class="px-2">
      <me-tpg s="h6">
        Hit Points
      </me-tpg>
      <v-row no-gutters align="center">
        <v-col cols="4" class="text-caption">
          <small>
            HP ({{ hp.current + hpFromHitDice }}/{{ hp.max }})
          </small>
        </v-col>
        <v-col cols="8">
          <v-progress-linear :value="Math.ceil((hp.current + hpFromHitDice) / hp.max * 100)" color="green" />
        </v-col>
      </v-row>
      <template v-for="(klass, index) in klasses">
        <me-cs-rest-hit-dice-roller :key="`klass-hit-dice-${klass.id}`" :class-index="index" :reset="resetting" @updateHitDice="updateHpFromHitDice" />
        <v-divider v-if="index < klasses.length - 1" :key="`klass-hit-dice-divider-${klass.id}`" />
      </template>
    </div>

    <div v-if="type === 'long'" class="px-2">
      <me-tpg s="h6">
        Hit Dice
      </me-tpg>
      <div v-if="regainAllHitDice">
        <p>
          You will regain all your hit dice.
        </p>
      </div>
      <div v-else>
        <p class="text-caption">
          You can regain {{ maxHitDiceRegen }} hit dice. ({{ totalHitDiceRegen }}/{{ maxHitDiceRegen }})
        </p>
        <v-row>
          <v-col v-for="hdRegenOption in hitDiceRegenOptions" :key="`klass-hit-dice-regen-${hdRegenOption.label}`" cols="6">
            <v-select
              dense
              :disabled="hdRegenOption.disabled"
              :items="hdRegenOption.options"
              :value="hitDieRegen[hdRegenOption.label]"
              clearable
              :hint="hdRegenOption.hint"
              persistent-hint
              @change="updateHdRegen($event, hdRegenOption.label)"
            >
              <template #label>
                <span class="text-capitalize">
                  {{ hdRegenOption.label }}
                </span>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- indoctrination / exhaustion -->
    <div v-if="type === 'long' && (character.currentStats.indoctrination || character.currentStats.exhaustion)" class="px-2">
      <me-tpg s="h6">
        Effects
      </me-tpg>
      <v-row>
        <v-col>
          <v-checkbox v-if="character.currentStats.indoctrination" v-model="reduceIndoctrination" label="Reduce Indoctrination?" />
        </v-col>
        <v-col>
          <v-checkbox v-if="character.currentStats.exhaustion" v-model="reduceExhaustion" label="Reduce Exhaustion?" />
        </v-col>
      </v-row>
    </div>

    <v-card-actions class="py-12">
      <v-spacer />
      <v-btn color="primary" @click="execRest(type)">
        Take {{ type }} rest
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
// TODO: remove rep benefits on long rest
import { createNamespacedHelpers } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsRestMenu',
  data () {
    return {
      working: false,
      prrBucket: {},
      hitDiceUsed: {},
      reduceIndoctrination: false,
      reduceExhaustion: false,
      hitDieRegen: {},
      resetting: false
    }
  },
  computed: {
    ...mapGetters({
      character: 'character',
      klasses: 'klasses/selectedKlasses',
      pactSlots: 'powers/pactSlots',
      techPoints: 'powers/techPoints',
      powerSlots: 'powers/powerSlots',
      mechanics: 'mechanics/mechanics',
      powers: 'powers/powers',
      level: 'klasses/level',
      type: 'navigation/restMenu',
      restState: 'navigation/restState',
      mcBonus: 'mechanics/mcBonus',
      sideNav: 'navigation/sideNav',
      hp: 'hp/hp'
    }),
    prrMechanics () {
      return this.mechanics.filter(i => i.type === 'power-resource-recovery')
    },
    prrIndicators () {
      const indicators = []
      for (const index of [0, 1, 2, 3, 4, 5]) {
        let label, current, max, pact
        if (index === 0) {
          if (this.techPoints.max === 0) {
            continue
          } else {
            label = 'Tech Points'
            current = this.techPoints.max - this.prrAvailable[0]
            max = this.techPoints.max
            pact = false
          }
        } else if (this.powerSlots[index].max === 0) {
          continue
        } else {
          pact = this.pactSlots.slotLevel === index ? this.pactSlots.numSlots : false
          label = `${this.$t(`ordinal_numbers[${index}]`)} Level`
          current = this.powerSlots[index].max - this.prrAvailable[index]
          max = this.powerSlots[index].max
        }
        indicators.push({
          label,
          current,
          max,
          pact
        })
      }
      return indicators
    },
    prrMaxes () {
      return [this.techPoints.max, ...Object.entries(this.powerSlots).map(i => i[1].max)]
    },
    prrAvailable () {
      const usedTp = this.character.currentStats.tpUsed
      const usedPs = this.character.currentStats.psUsed
      const reducedBucket = [0, 0, 0, 0, 0, 0].map((v, i) => {
        return v + Object.values(this.prrBucket).reduce((a, c) => a + c[i], 0)
      })
      const available = [usedTp, ...usedPs].map((v, i) => {
        return v - reducedBucket[i]
      })
      if (this.pactSlots?.slotLevel) {
        available[this.pactSlots.slotLevel] = Math.max(0, available[this.pactSlots.slotLevel] - this.pactSlots.numSlots)
      }
      return available
    },
    hpFromHitDice () {
      const possibleToRegain = this.hp.max - this.hp.current
      return Math.min(possibleToRegain, Object.entries(this.hitDiceUsed).reduce((a, c) => a + c[1].hp, 0))
    },
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    regainAllHitDice () {
      return this.mechanics.find(i => i.type === 'regain-all-hit-dice')
    },
    maxHitDiceRegen () {
      return Math.max(Math.floor(this.level / 2), 1)
    },
    totalHitDiceRegen () {
      return Object.values(this.hitDieRegen).reduce((a, c) => a + c, 0)
    },
    hitDiceRegenOptions () {
      return this.klasses.map((i) => {
        const used = (this.character.currentStats.hitDiceUsed[i.id] || 0)
        const max = Math.min(used, (this.maxHitDiceRegen - this.totalHitDiceRegen + (this.hitDieRegen[i.id] || 0)))
        const options = [...Array(max).keys()].map(i => i + 1)
        return {
          label: i.id,
          disabled: used < 1,
          options,
          hint: `Used ${used} of ${i.levels}`
        }
      })
    }
  },
  watch: {
    restState (newVal) {
      if (newVal === 'reset') {
        this.reset()
        this.$nextTick(() => {
          this.$store.commit('character/navigation/SET', { key: 'restState', value: false })
        })
      } else {
        this.resetting = false
      }
    }
  },
  methods: {
    reset () {
      this.working = false
      this.resetting = true
      this.prrBucket = {}
      this.hitDiceUsed = {}
      this.hitDieRegen = {}
    },
    updatePrr ({ selections, index }) {
      this.prrBucket = Object.assign({}, this.prrBucket, { [index]: selections })
    },
    updateHpFromHitDice ({ used, hp, klassId }) {
      this.hitDiceUsed = Object.assign({}, this.hitDiceUsed, { [klassId]: { used, hp } })
    },
    updateHdRegen (value, id) {
      this.hitDieRegen = Object.assign({}, this.hitDieRegen, { [id]: value })
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
        const reducedBucket = [0, 0, 0, 0, 0, 0].map((v, i) => {
          return v + Object.values(this.prrBucket).reduce((a, c) => a + c[i], 0)
        })
        for (let i = 0; i < 6; i++) {
          if (reducedBucket[i] > 0) {
            currentStatsClone.psUsed[i] = Math.max(0, currentStatsClone.psUsed[i] - reducedBucket[i])
          }
        }

        // tech points
        if (reducedBucket[0] > 0) {
          currentStatsClone.tpUsed = Math.max(0, currentStatsClone.tpUsed - reducedBucket[0])
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
        } else {
          for (const [klass, amount] of Object.entries(this.hitDieRegen)) {
            if (currentStatsClone.hitDiceUsed[klass]) {
              currentStatsClone.hitDiceUsed[klass] -= amount
            }
          }
        }
      }
      if (type === 'short') {
        // hit dice
        if (this.hpFromHitDice && !Number.isNaN(this.hpFromHitDice)) {
          const hitDiceRecovery = Math.max(0, Number.parseInt(this.hpFromHitDice, 10))
          currentStatsClone.hitPointsLost = Math.max(0, currentStatsClone.hitPointsLost - hitDiceRecovery)
        }
        // use hit dice
        for (const [klassId, stats] of Object.entries(this.hitDiceUsed)) {
          const currentValue = currentStatsClone.hitDiceUsed[klassId]
          if (currentValue) {
            currentStatsClone.hitDiceUsed[klassId] += stats.used
          } else {
            currentStatsClone.hitDiceUsed[klassId] = stats.used
          }
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
      this.reset()
      this.$store.commit('character/navigation/SET', { key: 'sideNav', value: false })
    }
  }
}
</script>
