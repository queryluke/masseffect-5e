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
      <v-row class="mt-5">
        <v-col>
          <div>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              clearable
              dense
            />
            <v-checkbox v-model="knownFilter" :label="`Known/Prepared`" />
          </div>
          <div>
            <template v-for="item in powersList">
              <me-character-sheet-powers-add-card :key="item.id" :item="item" />
            </template>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
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
      debouncedSearch: null,
      knownFilter: false
    }
  },
  computed: {
    ccIds () {
      return this.characterClasses.map(i => i.id)
    },
    tpMaxCheck () {
      return this.csTechPointLimit || 0
    },
    psMaxCheck () {
      const powerSlots = [...this.csPowerSlots].reverse()
      return powerSlots ? 5 - powerSlots.findIndex(i => i > 0) : 0
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
        return searchCheck && klassCheck && tpCheck && psCheck && knownCheck
      })
    },
    powersList () {
      if (this.knownFilter) {
        return this.character.powers
      }
      const list = this.availablePowers.concat(this.character.powers)
      return list.sort((a, b) => a.level === b.level ? a.id > b.id ? 1 : -1 : a.level - b.level)
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
