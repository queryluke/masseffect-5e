<template>
  <v-card flat class="my-1">
    <v-card-text class="px-3">
      <div class="d-flex align-center">
        <me-tpg s="subtitle">
          {{ klass.data.name }}
        </me-tpg>
        <div class="text-caption ml-2">
          <span>
            (1d{{ klass.data.hitDie }} {{ damageText(conMod) }})
          </span>
          <span v-if="minHitDieRoll">
            <small>
              Minimum roll: {{ minHitDieRoll }}
            </small>
          </span>
        </div>
      </div>
      <me-cs-action-resource-display-checkbox
        :max="klass.levels"
        :current="hitDiceUsed"
        @add="hitDiceUsed++"
        @remove="hitDiceUsed--"
        @set="hitDiceUsed = $event"
      />
      <v-row v-if="cache > 0">
        <v-col class="text-center mt-3">
          <v-btn outlined color="primary" class="text-lowercase" small @click="rollDice">
            {{ text }}
            <v-icon right size="14">
              mdi-heart
            </v-icon>
          </v-btn>
          <div class="text-caption">
            <small v-if="roll.results">
              Roll Result: {{ roll.results }} = {{ roll.total }}
            </small>
            <small v-else>
              &nbsp;
            </small>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'

const { mapGetters } = createNamespacedHelpers('character')
export default {
  mixins: [ScoreText],
  props: {
    classIndex: {
      type: Number,
      required: true
    },
    reset: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cache: 0,
      roll: {
        results: null,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      character: 'character',
      klasses: 'klasses/klasses',
      conMod: 'abilities/conMod',
      mechanics: 'mechanics/mechanics',
      mcBonus: 'mechanics/mcBonus'
    }),
    rollBonus () {
      return this.rollText(this.conMod * this.cache)
    },
    minHitDieRoll () {
      return this.mechanics.filter(i => i.type === 'min-hit-die-roll').reduce((a, c) => Math.max(a, this.mcBonus(c.bonus)), 0)
    },
    notation () {
      const minNotation = this.minHitDieRoll > 0 ? `min${this.minHitDieRoll}` : ''
      return `${this.cache}d${this.klass.data.hitDie}${minNotation}${this.rollBonus}`
    },
    text () {
      return `${this.cache}d${this.klass.data.hitDie}${this.rollBonus}`
    },
    klass () {
      return this.klasses[this.classIndex]
    },
    actualUse () {
      return (this.character.currentStats.hitDiceUsed[this.klass.id] || 0)
    },
    hitDiceUsed: {
      get () {
        return this.actualUse + this.cache
      },
      set (value) {
        this.cache = (value - this.actualUse)
        this.roll = {
          results: null,
          total: 0
        }
        this.updateLocalHiDice()
      }
    }
  },
  watch: {
    reset (newVal) {
      if (newVal) {
        this.roll = {
          results: null,
          total: 0
        }
        this.cache = 0
      }
    }
  },
  methods: {
    updateLocalHiDice () {
      this.$emit('updateHitDice', { used: this.cache, hp: this.roll.total, klassId: this.klass.id })
    },
    async rollDice () {
      // TODO: add this to the log when the initial log is removed from the side nav
      this.roll = await this.$store.dispatch('character/roller/INTERNAL_ROLL', this.notation)
      this.updateLocalHiDice()
    }
  }
}
</script>
