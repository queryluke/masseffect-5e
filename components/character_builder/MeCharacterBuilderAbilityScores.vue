<template>
  <div>
    <h2 class="text-center">Ability Scores</h2>
    <v-row class="text-center">
      <v-col
        cols="4"
        :key="index"
        v-for="(attr, index) in Object.keys(scores)"
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
  </div>
</template>

<script>
export default {
  methods: {
    setScore (attr, value) {
      value = value || 0
      const ta = { ...this.scores }
      ta[attr] = value
      console.log(value)
      console.log(ta)
      this.scores = ta
    },
    filterStandardArray (val) {
      const arr = [...this.possibleValues]
      if (val !== 0) {
        arr.push(val)
      }
      return arr
    }
  },
  data () {
    return {
      standardArray: [15, 14, 13, 12, 10, 8]
    }
  },
  computed: {
    scores: {
      get () {
        return this.$store.getters['user/character'].baseAbilityScores
      },
      set (value) {
        return this.$store.commit('user/UPDATE_CHARACTER', { attr: 'baseAbilityScores', value })
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
  }
}
</script>
