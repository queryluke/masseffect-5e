<template>
  <div>
    <div class="text-center text-h4">
      Ability Scores
    </div>
    <div>
      <v-select
        v-model="absGenMethod"
        :items="generationMethods"
        label="Generation Method..."
        return-object
      />
    </div>
    <v-row v-if="absGenMethod && absGenMethod.value === 'standard'" class="text-center">
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
          :value="selectedAbilityScores[ability]"
          clearable
          @change="setAbsBase({ability, value: $event})"
        />
      </v-col>
    </v-row>
    <v-row v-if="absGenMethod && absGenMethod.value === 'buy'" class="text-center">
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
          :value="selectedAbilityScores[ability]"
          clearable
          @change="setAbsBase({ability, value: $event})"
        />
      </v-col>
    </v-row>
    <v-row v-if="absGenMethod && absGenMethod.value === 'manual'" class="text-center">
      <v-col
        v-for="ability in absKeys"
        :key="`buy-${ability}`"
        cols="6"
        sm="4"
        md="2"
      >
        <v-text-field
          :label="$t(`abilities.${ability}.title`)"
          :value="selectedAbilityScores[ability]"
          outlined
          dense
          clearable
          @change="setAbsBase({ability, value: $event})"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="ability in absKeys" :key="`breakdown-${ability}`" cols="12" md="6" lg="4">
        <me-character-builder-ability-breakdown :ability="ability" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
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
    pointsSpent () {
      let spent = 0
      const selections = Object.values(this.selectedAbilityScores).filter(i => i !== null)
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
  methods: {
    setStandard (attr, value) {
      value = value || 0
      const ta = { ...this.scores }
      ta[attr] = value
      this.scores = ta
    },
    availableStandard (ability) {
      if (!this.selectedAbilityScores) {
        return this.standardArray
      }
      const selected = Object.values(this.selectedAbilityScores).filter(i => i !== null)
      const filtered = this.standardArray.filter(i => !selected.includes(i))
      if (this.selectedAbilityScores[ability]) {
        filtered.push(this.selectedAbilityScores[ability])
      }
      return filtered.sort((a, b) => b - a)
    },
    availableBuy (ability) {
      if (!this.selectedAbilityScores) {
        return this.pointBuy.map(i => this.setBuyText(null, i))
      }
      return this.pointBuy.filter(i => this.costDiff(this.selectedAbilityScores[ability], i) <= this.pointsRemaining).map((i) => {
        return this.selectedAbilityScores[ability] === i.value ? i.value : this.setBuyText(this.selectedAbilityScores[ability], i)
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
