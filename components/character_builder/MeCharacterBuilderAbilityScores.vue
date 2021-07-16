<template>
  <div>
    <!--
    <div class="text-center text-h4">
      Ability Scores
    </div>
    <div>
      <v-select
        v-model="selectedGenMethod"
        :items="generationMethods"
        label="Generation Method..."
        return-object
      />
    </div>
    <div class="text-h6">
      {{ selectedGenMethod.text }}
    </div>
    <v-row v-if="selectedGenMethod.value === 'standard'" class="text-center">
      <v-col
        v-for="(attr, index) in Object.keys(scores)"
        :key="index"
        cols="4"
      >
        <v-autocomplete
          :items="filterStandardArray(scores[attr])"
          :label="attr"
          :value="{...scores}[attr]"
          clearable
          @change="setScore(attr, $event)"
        />
      </v-col>
    </v-row>
    </v-select>
  </div>
  -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      standardArray: [15, 14, 13, 12, 10, 8],
      pointBuy: [
        { text: 8, cost: 0 },
        { text: 9, cost: 1 },
        { text: 10, cost: 2 },
        { text: 11, cost: 3 },
        { text: 12, cost: 4 },
        { text: 13, cost: 5 },
        { text: 14, cost: 7 },
        { text: 15, cost: 9 }
      ],
      selectedGenMethod: null,
      generationMethods: [
        {
          value: 'standard',
          text: 'Standard Array'
        },
        {
          value: 'buy',
          text: 'Point Buy'
        },
        {
          value: 'manual',
          text: 'Manual or Roll'
        }
      ]
    }
  },
  computed: {
    scores: {
      get () {
        return this.$store.getters['cb/characters'][this.$route.query.cid].character.baseAbilityScores
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.$route.query.cid, attr: 'baseAbilityScores', value })
      }
    },
    possibleValues () {
      const scoresArr = []
      const standArr = this.standardArray
      for (const attr in this.scores) {
        scoresArr.push(this.scores[attr])
      }
      const finalArr = standArr.filter(function (val) {
        return !scoresArr.includes(val)
      })
      return [...finalArr]
    }
  },
  methods: {
    setScore (attr, value) {
      value = value || 0
      const ta = { ...this.scores }
      ta[attr] = value
      this.scores = ta
    },
    filterStandardArray (val) {
      const arr = [...this.possibleValues]
      if (val !== 0) {
        arr.push(val)
      }
      return arr
    }
  }
}
</script>
