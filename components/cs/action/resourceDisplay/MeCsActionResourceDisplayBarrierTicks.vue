<template>
  <div class="d-flex">
    <div>
      <template v-for="value in Array.from({length: max}, (x, i) => i)">
        <v-btn :key="`use-track-${value}`" icon x-small>
          <v-icon :color="value >= current ? 'primary' : 'red'" @click.stop="set(value)">
            {{ value >= current ? 'mdi-checkbox-blank-outline' : 'mdi-minus-box' }}
          </v-icon>
        </v-btn>
      </template>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
// import { CsColors } from '~/mixins/character/csColors'
const { mapGetters } = createNamespacedHelpers('character/hp')
export default {
  computed: {
    ...mapGetters(['barrier']),
    current: {
      get () {
        return this.barrier.ticks.used
      },
      set (value) {
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.barrier.ticksUsed', value })
      }
    },
    max () {
      return this.barrier.ticks.max
    }
  },
  methods: {
    set (value) {
      if (value + 1 === this.current || value < this.current) {
        this.current--
      } else {
        this.current++
      }
    }
  }
}
</script>
