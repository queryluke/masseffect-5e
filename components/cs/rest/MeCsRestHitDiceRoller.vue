<template>
  <v-card flat class="my-1">
    <v-card-text class="px-3">
      <div class="d-flex align-center">
        <me-tpg s="subtitle">
          {{ klass.data.name }}
        </me-tpg>
        <div class="text-caption ml-2">
          (1d{{ klass.data.hitDie }} {{ damageText(conMod) }})
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
            {{ notation }}
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
      conMod: 'abilities/conMod'
    }),
    notation () {
      return `${this.cache}d${this.klass.data.hitDie}${this.rollText(this.conMod * this.cache)}`
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
      this.roll = await this.$store.dispatch('character/roller/INTERNAL_ROLL', this.notation)
      this.updateLocalHiDice()
    }
  }
}
</script>
