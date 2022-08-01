<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="pl-0 py-2" :disable-icon-rotate="hasPowerIssues || hasPowersToLearn">
      <v-list-item>
        <v-list-item-avatar tile>
          <v-img :src="klassIcon" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ klass.data.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <template v-if="hasPowerIssues || hasPowersToLearn" #actions>
        <v-icon :color="hasPowerIssues ? 'error' : 'info'">
          mdi-{{ hasPowerIssues ? 'alert-octagram' : 'alert-circle' }}
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div class="mx-n4">
        <div class="my-2">
          <me-cs-powers-known-counter :count="learnedCantripsCount" :max="pcMaxes.numCantrips">
            Cantrips
          </me-cs-powers-known-counter>
        </div>
        <div class="my-2">
          <me-cs-powers-known-counter :count="learnedPowersCount" :max="pcMaxes.numPowers">
            Powers
          </me-cs-powers-known-counter>
        </div>
        <div class="text-subtitle-1 mt-2">
          Filter by Name
        </div>
        <v-text-field
          v-model="search"
          clearable
          dense
          hide-details
          outlined
          prepend-inner-icon="mdi-magnify"
        />
        <div class="text-subtitle-1 mt-2">
          Filter by Level
        </div>
        <me-cs-powers-level-filter learned />
        <v-switch v-model="learnedFilter" dense hide-details class="v-input--reverse">
          <template #label>
            <span class="text-caption">
              Learned / Prepared
            </span>
          </template>
        </v-switch>
      </div>
      <div class="mx-n6">
        <template v-for="power in filteredPowers">
          <me-cs-power-select-card :key="power.data.id" :item="power" :prepared="power.data.level === 0 ? false : !pcMaxes.learned" @togglePower="togglePower" @setPowerAdv="setPowerAdv" />
        </template>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')

export default {
  name: 'MeCsKlassPowerSelect',
  props: {
    klass: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      search: null,
      learnedFilter: false
    }
  },
  computed: {
    ...mapGetters({
      powerList: 'powers/powerList',
      character: 'character',
      klasses: 'klasses/selectedKlasses',
      klassIcons: 'klasses/klassIcons',
      klassPowercastingMaxes: 'powers/klassPowercastingMaxes',
      levelFilter: 'navigation/learnedPowersLevelFilter',
      selectedPowers: 'powers/selectedPowers'
    }),
    klassIndex () {
      return this.klasses.findIndex(i => i.id === this.klass.id)
    },
    pcMaxes () {
      return this.klassPowercastingMaxes[this.klass.id]
    },
    klassIcon () {
      return this.klassIcons[this.klass.id]
    },
    powersAvailableToKlass () {
      return this.powerList.filter(i => i.classes.includes(this.klass.id)) // TODO: need a way to not filter for homebrew classes
    },
    availablePowersAndCantrips () {
      const powers = []
      for (const p of this.powersAvailableToKlass) {
        const learned = this.selectedPowers.find(i => i.id === p.id && i.klass === this.klass.id)
        const base = {
          data: p,
          learned: !!learned,
          advancement: learned?.advancement,
          notAvailable: false,
          fromFeature: learned?.path || false
        }
        if (p.level === 0 && this.pcMaxes.numCantrips > 0) {
          powers.push(base)
        } else {
          // if power level is greater than what they can learn....
          if (p.level > this.pcMaxes.maxPowerLevel) {
            // check it hasn't already bean learned (in the case where they learn and reduce level)
            if (base.learned || (p.level === 0 && this.pcMaxes.numCantrips > 0)) {
              base.notAvailable = true
            } else {
              continue
            }
          }
          powers.push(base)
        }
      }
      return powers.sort((a, b) => a.data.level - b.data.level)
    },
    learnedCantripsCount () {
      return this.availablePowersAndCantrips.filter(i => (i.learned || i.fromFeature) && i.data.level === 0).reduce((acc, curr) => {
        const adder = curr.fromFeature ? 0 : 1
        const adv = curr.advancement ? 1 : 0
        return acc + adder + adv
      }, 0)
    },
    learnedPowersCount () {
      return this.availablePowersAndCantrips.filter(i => (i.learned || i.fromFeature) && i.data.level > 0).reduce((acc, curr) => {
        const adder = curr.fromFeature ? 0 : 1
        const adv = curr.advancement ? 1 : 0
        return acc + adder + adv
      }, 0)
    },
    filteredPowers () {
      return this.availablePowersAndCantrips.filter((i) => {
        const searchFilter = this.search && this.search !== '' ? i.data.name.toLowerCase().includes(this.search.toLowerCase()) : true
        const learnedFilter = this.learnedFilter ? i.learned : true
        const levelFilter = this.levelFilter !== 'all' ? i.data.level === this.levelFilter : true
        return [searchFilter, learnedFilter, levelFilter].every(i => i)
      })
    },
    hasPowersToLearn () {
      return this.learnedCantripsCount < this.pcMaxes.numCantrips ||
        this.learnedPowersCount < this.pcMaxes.numPowers
    },
    hasPowerIssues () {
      return this.learnedCantripsCount > this.pcMaxes.numCantrips ||
        this.learnedPowersCount > this.pcMaxes.numPowers ||
        this.availablePowersAndCantrips.filter(i => i.notAvailable).length > 0
    }
  },
  methods: {
    setPowerAdv ({ id, advId, fromFeature }) {
      if (fromFeature) {
        const path = `${fromFeature}/advancements`
        let value = [{ id, type: 'advancement', value: advId }]
        const alreadySelected = this.$store.getters['character/selections/selected'].find(i => i.path === path)
        if (alreadySelected) {
          const oldValue = alreadySelected.value[0]
          if (oldValue?.value === advId) {
            value = []
          }
        }
        this.$store.dispatch('character/selections/UPSERT_SELECTION', { limit: false, path, value })
      } else {
        const cloned = this.character.powers.slice()
        const index = cloned.findIndex(i => i.id === id && i.klass === this.klass.id)
        if (index > -1) {
          const match = cloned[index]
          cloned.splice(index, 1, { ...cloned[index], advancement: match.advancement === advId ? null : advId })
          this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'powers', value: cloned })
        }
      }
    },
    togglePower (id) {
      const cloned = this.character.powers.slice()
      const index = cloned.findIndex(i => i.id === id && i.klass === this.klass.id)
      if (index > -1) {
        cloned.splice(index, 1)
      } else {
        cloned.push({ id, advancement: null, klass: this.klass.id })
      }
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'powers', value: cloned })
    }
  }
}
</script>

<style>
.v-input--reverse .v-input__slot {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
</style>
