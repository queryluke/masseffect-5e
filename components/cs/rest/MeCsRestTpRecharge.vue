<template>
  <div class="d-flex align-center">
    <div class="text-body-2 font-weight-bold text-capitalize mr-2">
      {{ klass }}
    </div>
    <v-btn outlined color="red darken-4" x-small @click="roll">
      <v-icon left>
        mdi-dice-multiple
      </v-icon>
      roll <span class="text-lowercase">{{ notation }}</span>
    </v-btn>
    <div v-if="rolled" class="ml-2">
      Result: {{ rechargeRoll.results }} = {{ rechargeRoll.total }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCsRestTpRecharge',
  props: {
    recharge: {
      type: Object,
      default: () => {}
    },
    reset: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rolled: false,
      rechargeRoll: {
        results: null,
        total: 0
      }
    }
  },
  computed: {
    settings () {
      const defaults = {
        dieCount: 0,
        dieType: 0,
        bonus: false,
        source: ''
      }
      return { ...defaults, ...this.recharge }
    },
    klass () {
      return this.recharge.source.split('/')[1]
    },
    bonus () {
      return this.settings.bonus ? this.$store.getters['character/mechanics/mcBonus'](this.settings.bonus) : 0
    },
    notation () {
      let notation = ''
      if (this.settings.dieCount && this.settings.dieType) {
        notation = `${this.settings.dieCount}d${this.settings.dieType}`
      }
      if (this.bonus > -1) {
        notation += `+${this.bonus}`
      } else {
        notation += this.bonus
      }
      return notation
    }
  },
  watch: {
    reset (newVal) {
      if (newVal) {
        this.rechargeRoll = {
          results: null,
          total: 0
        }
        this.rolled = false
      }
    }
  },
  methods: {
    async roll () {
      this.$emit('recharge', (parseInt(this.rechargeRoll.total) * -1))
      this.rechargeRoll = await this.$store.dispatch('character/roller/INTERNAL_ROLL', this.notation)
      this.rolled = true
      this.$emit('recharge', parseInt(this.rechargeRoll.total))
    }
  }
}
</script>
