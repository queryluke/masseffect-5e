<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <div>
        <div class="d-flex">
          <v-avatar tile size="32">
            <v-img :src="require(`~/assets/images/classes/${klass.id}.svg`)" />
          </v-avatar>
          <div class="text-subtitle-1">
            {{ klass.data.name }}
          </div>
        </div>
        <v-row>
          <v-col v-if="learnedCantripsMax > 0" cols="6">
            <me-cs-powers-known-counter :count="learnedCantripsCount" :max="learnedCantripsMax">
              Cantrips
            </me-cs-powers-known-counter>
          </v-col>
          <v-col v-if="learnedPowersMax > 0" cols="6">
            <me-cs-powers-known-counter :count="learnedPowersCount" :max="learnedPowersMax">
              {{ techClass ? 'Prepared' : 'Known' }}
            </me-cs-powers-known-counter>
          </v-col>
        </v-row>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <!-- filters -->
      <v-row>
        <v-col cols="12" sm="6" md="8">
          <v-text-field v-model="search" clearable append-icon="mdi-magnify" label="Search" />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-checkbox v-model="learned" label="Learned / Prepared" />
        </v-col>
      </v-row>

      <template v-for="item in filteredPowers">
        <me-cs-power-select-card
          :key="item.id"
          :item="item"
          :prepared="isPrepared(item)"
          @togglePower="togglePower"
          @setPowerAdv="setPowerAdv"
        />
      </template>
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
      learned: false
    }
  },
  computed: {
    ...mapGetters({ powerList: 'powers/powerList', character: 'character', intMod: 'abilities/intMod' }),
    techClass () {
      return ['engineer', 'infiltrator'].includes(this.klass.id)
    },
    tpMaxCheck () {
      return this.techClass ? this.progressionValues('tech_point_limit', this.klass.levels) : 0
    },
    psMaxCheck () {
      if (['adept', 'vanguard'].includes(this.klass.id)) {
        const pses = this.progressionValues('power_slots_by_power_level').slice()
        const pslots = pses.reverse()
        return pslots ? 5 - pslots.findIndex(i => i[this.klass.levels] > 0) : 0
      } else if (this.klass.id === 'sentinel') {
        return this.progressionValues('power_level', this.klass.levels)
      }
      return 0
    },
    powersLearnedForClass () {
      return this.character.powers.filter(i => i.klass === this.klass.id)
    },
    availableForKlass () {
      return this.powerList.filter(i => i.classes.includes(this.klass.id))
        .map((i) => {
          const learned = this.powersLearnedForClass.find(j => j.id === i.id)
          let base = {
            ...i,
            learned: false,
            disabled: i.level === 0
              ? this.learnedCantripsMax === 0
              : this.techClass
                ? i.level > this.tpMaxCheck
                : i.level > this.psMaxCheck
          }
          if (learned) {
            base = {
              ...learned,
              ...base,
              learned: true
            }
          }
          return base
        })
        // disabled means not available anymore...i.e., power is above the class's available powers
        // but they could learn, then reduce class levels, if so...show alert
        // this type of logic should probably be on the klass
        .filter(i => (i.disabled && i.learned) || !i.disabled)
        .sort((a, b) => a.level - b.level)
    },
    availableCantrips () {
      return this.availableForKlass.filter(i => i.level === 0)
    },
    learnedCantripsMax () {
      return this.klass.id === 'engineer'
        ? 0
        : ['soldier', 'infiltrator'].includes(this.klass.id)
            ? this.progressionValues('combat_powers', this.klass.levels)
            : this.progressionValues('cantrips', this.klass.levels)
    },
    learnedCantripsCount () {
      return this.availableCantrips.filter(i => i.learned).reduce((acc, curr) => acc + (curr.advancement ? 2 : 1), 0)
    },
    availablePowers () {
      return this.availableForKlass.filter(i => i.level !== 0)
    },
    learnedPowersMax () {
      if (this.klass.id === 'engineer') {
        return Math.max(this.klass.levels + this.intMod, 1)
      } else if (this.klass.id === 'infiltrator') {
        return Math.max((Math.floor(this.klass.levels / 2) + this.intMod), 1)
      } else if (this.klass.id === 'soldier') {
        return 0
      } else {
        return this.progressionValues('powers_known', this.klass.levels)
      }
    },
    learnedPowersCount () {
      return this.availablePowers.filter(i => i.learned).reduce((acc, curr) => acc + (curr.advancement ? 2 : 1), 0)
    },
    filteredPowers () {
      return this.availableForKlass.filter(i => (this.search && this.search !== '' ? i.name.toLowerCase().includes(this.search.toLowerCase()) : true) && (this.learned ? i.learned : true))
    }
  },
  methods: {
    isPrepared (item) {
      return this.techClass
        ? this.klass.id === 'engineer'
          ? true
          : item.level !== 0
        : false
    },
    progressionValues (column, level = null) {
      const values = (this.klass.data.progression.columns.find(i => i.label === column) || { values: [] }).values
      if (level) {
        return values[level - 1]
      }
      return values
    },
    setPowerAdv ({ id, advId }) {
      const cloned = this.character.powers.slice()
      const index = cloned.findIndex(i => i.id === id && i.klass === this.klass.id)
      if (index > -1) {
        const match = cloned[index]
        cloned.splice(index, 1, { ...cloned[index], advancement: match.advancement === advId ? null : advId })
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'powers', value: cloned })
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
