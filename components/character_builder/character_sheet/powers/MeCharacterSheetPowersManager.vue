<template>
  <div>
    <v-card-text>
      <div v-if="csMaxCantripsKnown">
        <me-character-sheet-powers-known-counter :count="knownPowersCount.cantripCount" :max="csMaxCantripsKnown" label="Cantrips" />
      </div>
      <div v-if="csMaxPowersKnown">
        <me-character-sheet-powers-known-counter :count="knownPowersCount.powerCount" :max="csMaxPowersKnown" label="Learned Powers" />
      </div>
      <div v-if="csMaxPowersPrepared">
        <me-character-sheet-powers-known-counter :count="preparedPowersCount" :max="csMaxPowersPrepared" label="Prepared Powers" />
      </div>
    </v-card-text>
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Available ({{ availablePowers.length }})
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            clearable
            dense
          />
          <template v-for="item in availablePowers">
            <me-character-sheet-powers-add-card :key="item.id" :item="{id: item.id}" addable />
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="mt-5">
        <v-expansion-panel-header>
          Known / Prepared ({{ character.powers.length }})
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template v-for="kItem in character.powers">
            <me-character-sheet-powers-add-card :key="kItem.id" :item="kItem" deletable />
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      search: null,
      debouncedSearch: null
    }
  },
  computed: {
    ccIds () {
      return this.characterClasses.map(i => i.id)
    },
    tpMaxCheck () {
      console.log(this.csTechPointLimit)
      return this.csTechPointLimit || 0
    },
    psMaxCheck () {
      const powerSlots = this.csPowerSlots
      return powerSlots ? powerSlots.findIndex(i => i > 0) + 1 : 0
    },
    knownPowersCount () {
      let cantripCount = 0
      let powerCount = 0
      for (const power of this.character.powers.filter(i => i.learned)) {
        const powerData = this.powers.find(i => i.id === power.id)
        if (powerData.level === 0) {
          cantripCount += power.advancement ? 2 : 1
        } else {
          powerCount += power.advancement ? 2 : 1
        }
      }
      return { cantripCount, powerCount }
    },
    preparedPowersCount () {
      let powerCount = 0
      for (const power of this.character.powers.filter(i => !i.learned)) {
        const powerData = this.powers.find(i => i.id === power.id)
        powerCount += power.advancement ? (powerData.level * 2) : powerData.level
      }
      return powerCount
    },
    knownPowerIds () {
      return this.character.powers.map(i => i.id)
    },
    availablePowers () {
      return this.powers.filter((i) => {
        const searchCheck = this.debouncedSearch && this.debouncedSearch.length > 0 ? i.name.toLowerCase().includes(this.debouncedSearch) : true
        const klassCheck = this.ccIds.some(cId => i.classes.includes(cId))
        const tpCheck = this.hasTechPoints ? i.level <= this.tpMaxCheck : true
        const psCheck = this.hasPowerSlots ? i.level <= this.psMaxCheck : true
        const knownCheck = !this.knownPowerIds.includes(i.id)
        return searchCheck && klassCheck && (tpCheck || psCheck) && knownCheck
      })
    }
  },
  watch: {
    search () {
      this.debouncedChangeSearch()
    }
  },
  created () {
    this.debouncedChangeSearch = debounce(this.changeSearch, 250)
  },
  methods: {
    changeSearch () {
      this.debouncedSearch = this.search
    }
  }
}
</script>
