<template>
  <div>
    <v-row justify="end">
      <v-col>
        <v-btn @click="clearRolls">
          Clear Log
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card v-for="(roll, i) in rolls" :key="i" shaped class="mb-3">
          <v-card-text>
            <roll-set :roll="roll" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapActions } = createNamespacedHelpers('diceRoller')

export default {
  computed: {
    ...mapGetters(['rolls'])
  },
  methods: {
    ...mapActions(['clearRolls'])
  }
}
</script>
