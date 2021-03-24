<template>
  <div class="mt-5" :key="level" v-if="abiLevels.length">
    <h3>Ability Score Improvement{{abiLevels.length > 1 ? 's' : ''}}</h3>
    <div>
      <div v-for="(item, index) in abiLevels" :key="index">
        <v-row>
          <v-col sm="4">
            <v-select
              :items="[
                'Ability Score Improvement',
                'Feat',
              ]"
              :value="abilityScoreImprovements[index] ? [...abilityScoreImprovements][index].type : undefined"
              label="Choose an option..."
              @change="updateAbiType(index, $event)"
            />
          </v-col>
          <!-- Feat Pickers -->
          <v-col v-if="abilityScoreImprovements[index] && abilityScoreImprovements[index].type === 'Feat'">
            <v-autocomplete
              :items="featData"
              label="Chosen Feat"
              return-object
              item-text="name"
              item-value="id"
              :value="abilityScoreImprovements[index].id"
              @change="updateAbiFeat(index, $event)"
            />
          </v-col>
          <v-col sm="4" v-if="abilityScoreImprovements[index] && abilityScoreImprovements[index].type === 'Feat'">
            <v-btn href="/feats" target="_blank">View All Feats</v-btn>
          </v-col>
          <!-- ABI Pickers -->
          <template
            v-if="abilityScoreImprovements[index] && abilityScoreImprovements[index].type === 'Ability Score Improvement'"
          >
            <v-col cols="4">
              <v-autocomplete
                class="flex"
                :items="abiArray"
                label="Chosen Ability Score Improvement"
                :value="getAbiValue(abilityScoreImprovements[index], index, 0)"
                @change="updateAbiScore(abilityScoreImprovements[index], $event, index, 0)"
              />
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                class="flex"
                :items="abiArray"
                label="Chosen Ability Score Improvement"
                :value="getAbiValue(abilityScoreImprovements[index], index, 1)"
                @change="updateAbiScore(abilityScoreImprovements[index], $event, index, 1)"
              />
            </v-col>
          </template>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    classIndex: {
      type: Number,
      required: true
    },
    level: {
      type: Number,
      required: true
    }
  },
  watch: {
    level () {
      this.cleanAbi()
    }
  },
  methods: {
    cleanAbi () {
      let ta = [...this.abilityScoreImprovements]
      const abl = [...this.abiLevels]
      // console.log(abl, ta)
      ta = ta.slice(0, abl.length)
      this.abilityScoreImprovements = ta
    },
    getAbiValue (abiObj, abiIndex, index) {
      if (abiObj.abilitiesIncreased && abiObj.abilitiesIncreased[index] && abiObj.abilitiesIncreased[index][abiIndex]) {
        return abiObj.abilitiesIncreased[index][abiIndex].name
      }
      return undefined
    },
    filterById (_inputData) {
      return (_inputData.id === this.id)
    },
    filterByAbiLevel (_inputData) {
      return (_inputData <= this.level)
    },
    updateAbiType (index, event) {
      const ta = [...this.abilityScoreImprovements]
      ta[index] = { type: event }
      this.abilityScoreImprovements = ta
    },
    updateAbiFeat (index, event) {
      const ta = [...this.abilityScoreImprovements]
      ta[index] = {
        type: 'Feat',
        id: event.id
      }
      this.abilityScoreImprovements = ta
    },
    updateAbiScore (asiObj, scoreVal, asiIndex, scoreIndex) {
      const ta = [...this.abilityScoreImprovements]
      const abiType = 'Ability Score Improvement'
      if (!asiObj.abilitiesIncreased) {
        console.log('init asi object at index ')
        ta[asiIndex] = { // this particular level's asi values
          type: abiType,
          abilitiesIncreased: [{ [scoreVal]: 1 }] // {Strength: 2} or {Strength: 1, Wisdom: 1}
        }
      }
      if (scoreIndex > ta[asiIndex].abilitiesIncreased.length) {
        scoreIndex = 0
      }
      console.log('setting value at index ' + scoreIndex)
      ta[asiIndex].abilitiesIncreased[scoreIndex] = [
        {
          name: scoreVal,
          value: 1
        }
      ]
      this.abilityScoreImprovements = ta
    }
  },
  data () {
    return {
      blah: true
    }
  },
  computed: {
    featData () {
      return this.$store.getters.getData('feats')
    },
    abiLevels () {
      const abiLevels = this.$store.getters.getData('classes').find(this.filterById).abiLevels
      return abiLevels.filter(this.filterByAbiLevel)
    },
    abiArray () {
      return ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']
    },
    abilityScoreImprovements: {
      get () {
        return this.$store.getters['cb/characters'][this.$route.query.cid].character.classes[this.classIndex].abilityScoreImprovements
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.$route.query.cid, attr: 'classes.' + this.classIndex.toString() + '.abilityScoreImprovements', value })
      }
    }
  }
}
</script>
