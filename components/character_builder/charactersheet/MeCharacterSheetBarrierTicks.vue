<template>
  <div>
    <v-row>
      <v-col v-if="barrier" class="text-center">
        <h3>
          Barrier Ticks
        </h3>
        <v-text-field
          class="my-2"
          outlined
          single-line
          hide-details
          type="number"
          min="0"
          readonly
          :max="barrier.ticks.max"
          :value="barrier.ticks.value"
        ></v-text-field>
        <v-btn-toggle>
          <v-btn
            @click="setBarrierTicks(-1)"
            :disabled="barrier.ticks.value <= 0"
          ><v-icon>mdi-chevron-down</v-icon></v-btn>
          <v-btn
            @click="setBarrierTicks(1)"
            :disabled="barrier.ticks.value >= barrier.ticks.max"
          ><v-icon>mdi-chevron-up</v-icon></v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    setBarrierTicks (value) {
      this.hpData = {
        attr: 'currentStats.barrier.ticks.value',
        val: this.barrier.ticks.value + value
      }
    }
  },
  computed: {
    hpData: {
      get () {
        return this.$store.getters['cb/getCharacterHealth'](this.$route.query.cid)
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.$route.query.cid,
          attr: value.attr,
          value: value.val
        })
      }
    },
    barrier () {
      return this.hpData.barrier
    }
  }
}
</script>
