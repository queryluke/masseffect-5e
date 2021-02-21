<template lang="pug">
  div(v-if="!loading").mb-3.text-body-2
    p.my-0 Cantrips (at will): #[em {{ cantrips.map(power => power.name.toLowerCase()).join(', ') }}]
    p(v-for="item in powerList" v-bind:key="item.level").my-0 {{ ordinal(item.level) }} level ({{ item.slots }} {{ item.slots | pluralize('slot') }})
      span(v-if="item.powers.length > 0") : #[em {{ item.powers.map(power => power.name.toLowerCase()).join(', ') }}]
</template>

<script>
export default {
  props: {
    powercasting: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      loading: true,
      powers: [],
      adept: {
        progression: []
      }
    }
  },
  computed: {
    powerList () {
      const powerList = []
      Object.entries(this.powerSlots).forEach(([key, value]) => {
        if (value) {
          const powersInLevel = this.castable.filter(s => parseInt(s.level, 10) === parseInt(key, 10))
          powerList.push({ level: key, slots: value, powers: powersInLevel })
        }
      })
      return powerList
    },
    cantrips () {
      return this.castable.filter(s => parseInt(s.level, 10) === 0)
    },
    powerSlots () {
      const powercastingLevelIndex = parseInt(this.powercasting.level, 10) - 1
      const powerSlots = {}
      for (const col of this.adept.progressionColumns.filter(i => i.ps)) {
        if (col.values[powercastingLevelIndex] > 0) {
          powerSlots[col.name[0]] = col.values[powercastingLevelIndex]
        }
      }
      return powerSlots
    },
    castable () {
      return this.powers.filter(s => this.powercasting.powerList.includes(s.id))
    }
  },
  async created () {
    const data = await Promise.all([
      this.$store.dispatch('FETCH_DATA', 'powers'),
      this.$store.dispatch('FETCH_ITEM', { endpoint: 'classes', id: 'adept' })
    ])
    this.powers = data[0]
    this.adept = data[1]
    this.loading = false
  },
  methods: {
    ordinal (level) {
      return `${level}${this.$options.filters.ordinal(level)}`
    }
  }
}
</script>
