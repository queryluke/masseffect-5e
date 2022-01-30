<template>
  <v-card flat color="transparent">
    <me-tpg s="h3" class="text-center">
      Ability Scores
    </me-tpg>
    <div>
      <v-select
        v-model="absGenMethod"
        :items="generationMethods"
        label="Generation Method..."
      />
    </div>
    <v-row v-if="absGenMethod === 'standard'" class="text-center">
      <v-col
        v-for="ability in absKeys"
        :key="`standard-${ability}`"
        cols="6"
        sm="4"
        md="2"
      >
        <v-select
          :items="availableStandard(ability)"
          :label="$t(`abilities.${ability}.title`)"
          :value="selectedScores[ability]"
          clearable
          @change="setScore({ability, value: $event})"
        />
      </v-col>
    </v-row>
    <v-row v-if="absGenMethod === 'buy'" class="text-center">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" sm="8" offset-sm="2" lg="6" offset-lg="3">
            <v-progress-linear
              :value="pointsRemainingPercent"
              height="25"
            >
              <strong>{{ pointsRemaining }} / {{ maxPoints }}</strong>
            </v-progress-linear>
            <div>Points Remaining</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        v-for="ability in absKeys"
        :key="`buy-${ability}`"
        cols="6"
        sm="4"
        md="2"
      >
        <v-select
          :items="availableBuy(ability)"
          :label="$t(`abilities.${ability}.title`)"
          :value="selectedScores[ability]"
          clearable
          @change="setScore({ability, value: $event})"
        />
      </v-col>
    </v-row>
    <v-row v-if="absGenMethod === 'manual'" class="text-center">
      <v-col
        v-for="ability in absKeys"
        :key="`manual-${ability}`"
        cols="6"
        sm="4"
        md="2"
      >
        <v-text-field
          :label="$t(`abilities.${ability}.title`)"
          :value="selectedScores[ability]"
          outlined
          dense
          clearable
          type="number"
          @change="setScore({ability, value: $event})"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="ability in absKeys" :key="`breakdown-${ability}`" cols="12" md="6" lg="4">
        <me-cb-ability-breakdown :ability="ability" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('character/abilities')
export default {
  name: 'MeCbAbilitiesSelect',
  data () {
    return {
      absKeys: ['str', 'dex', 'con', 'int', 'wis', 'cha'],
      standardArray: [15, 14, 13, 12, 10, 8],
      pointBuy: [
        { value: 8, cost: 0 },
        { value: 9, cost: 1 },
        { value: 10, cost: 2 },
        { value: 11, cost: 3 },
        { value: 12, cost: 4 },
        { value: 13, cost: 5 },
        { value: 14, cost: 7 },
        { value: 15, cost: 9 }
      ],
      maxPoints: 27,
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
    ...mapGetters(['selectedMethod', 'selectedScores', 'characterAbilityScores']),
    absGenMethod: {
      get () {
        return this.selectedMethod
      },
      set (value) {
        return this.$store.dispatch('character/abilities/SET_METHOD', value)
      }
    },
    pointsSpent () {
      let spent = 0
      const selections = Object.values(this.selectedScores).filter(i => i !== null)
      for (const selection of selections) {
        const match = this.pointBuy.find(i => i.value === selection)
        if (match) {
          spent += match.cost
        }
      }
      return spent
    },
    pointsRemaining () {
      return this.maxPoints - this.pointsSpent
    },
    pointsRemainingPercent () {
      return this.pointsSpent === 0 ? 0 : Math.floor((this.pointsRemaining / this.maxPoints) * 100)
    }
  },
  created () {
    const scores = {}
    for (const key of this.absKeys) {
      scores[key] = this.characterAbilityScores[key].value
    }
    this.$store.commit('character/abilities/SET_SCORES', { method: this.selectedMethod, scores })
  },
  methods: {
    ...mapActions({ setScore: 'SET_SCORE' }),
    availableStandard (ability) {
      const selected = Object.values(this.selectedScores).filter(i => i !== null)
      const filtered = this.standardArray.filter(i => !selected.includes(i) || this.selectedScores[ability] === i)
      return filtered.sort((a, b) => b - a)
    },
    availableBuy (ability) {
      if (!this.selectedScores) {
        return this.pointBuy.map(i => this.setBuyText(null, i))
      }
      return this.pointBuy.filter(i => this.costDiff(this.selectedScores[ability], i) <= this.pointsRemaining).map((i) => {
        return this.selectedScores[ability] === i.value
          ? i.value
          : this.setBuyText(this.selectedScores[ability], i)
      })
    },
    costDiff (currVal, buyObj) {
      const currCost = currVal ? this.pointBuy.find(i => i.value === currVal).cost : 0
      return buyObj.cost - currCost
    },
    setBuyText (currVal, buyObj) {
      const costDiff = this.costDiff(currVal, buyObj) * -1
      const costDiffText = costDiff > 0 ? `+${costDiff}` : costDiff
      return { text: `${buyObj.value} (${costDiffText} point${costDiff === 1 ? '' : 's'})`, cost: buyObj.cost, value: buyObj.value }
    }
  }
}
</script>
