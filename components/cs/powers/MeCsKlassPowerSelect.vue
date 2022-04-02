<template>
  <div>
    <v-divider />
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
    <v-expansion-panels flat tile>
      <!-- cantrips -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          Add Powers
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <me-cs-powers-known-counter :count="1" :max="pcMaxes.numCantrips">
            Cantrips
          </me-cs-powers-known-counter>
          <me-cs-powers-known-counter :count="learnedCantripsCount" :max="learnedCantripsMax">
            Powers
          </me-cs-powers-known-counter>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- powers -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          {{ pcMaxes.learned ? 'Known' : 'Prepared' }} Powers
        </v-expansion-panel-header>
      </v-expansion-panel>
      <!--
        <v-expansion-panel-content>
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
              @addPower="addPower(item)"
              @removePower="removePower(item)"
              @setPowerAdv="setAdvancement(item)"
            />
          </template>
        </v-expansion-panel-content>
        -->
    </v-expansion-panels>
  </div>
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
    ...mapGetters({
      powerList: 'powers/powerList',
      character: 'character',
      klasses: 'klasses/selectedKlasses',
      klassIcons: 'klasses/klassIcons',
      klassPowercastingMaxes: 'powers/klassPowercastingMaxes'
    }),
    klassIndex () {
      return this.klasses.findIndex(i => i.id === this.klass.id)
    },
    pcMaxes () {
      console.log(this.klassPowercastingMaxes[this.klass.id])
      return this.klassPowercastingMaxes[this.klass.id]
    },
    klassIcon () {
      console.log(this.klassIcons)
      return this.klassIcons[this.klass.id]
    },
    powercastingMechanics () {
      return this.klassesFeatures[this.klassIndex].reduce((acc, curr) => acc.concat(curr.mechanics || []), []).filter(i => i.type.startsWith('powercasting'))
    },
    maxPowerLevel () {
      const pointcasting = this.powercastingMechanics.find(i => i.type === 'powercasting-points')
      const pointmax = pointcasting?.limit[this.klass.levels - 1] || -1
      const pactcasting = this.powercastingMechanics.find(i => i.type === 'powercasting-pact')
      const pactmax = pactcasting?.slotLevel[this.klass.levels - 1] || -1
      const slotcasting = this.powercastingMechanics.find(i => i.type === 'powercasting-slots')
      let slotmax = -1
      if (slotcasting) {
        for (const [level, values] of Object.entries(slotcasting.slots)) {
          if (values[this.klass.levels - 1] > 0) {
            slotmax = level
          }
        }
      }
      return Math.max(pointmax, pactmax, slotmax)
    }
    /*
    availablePowers () {
      return this.powerList.filter(i => i.classes.includes(this.klass.id)) // TODO: need a way to not filter for homebrew classes
        .filter(i => i.level <= this.maxPowerLevel)
    },
    availableForKlass () {
      return this.powerList.filter(i => i.classes.includes(this.klass.id)) // TODO: need a way to not filter for homebrew classes
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
    */
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
