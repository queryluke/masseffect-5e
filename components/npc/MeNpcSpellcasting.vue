<template lang="pug">
  div(v-if="!loading").mb-3.text-body-2
    p.my-0 Cantrips (at will): #[em {{ cantrips.map(spell => spell.name.toLowerCase()).join(', ') }}]
    p(v-for="item in spellList" v-bind:key="item.level").my-0 {{ ordinal(item.level) }} level ({{ item.slots }} {{ item.slots | pluralize('slot') }})
      span(v-if="item.spells.length > 0") : #[em {{ item.spells.map(spell => spell.name.toLowerCase()).join(', ') }}]
</template>

<script>
export default {
  props: {
    spellcasting: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      loading: true,
      spells: [],
      adept: {
        progression: []
      }
    }
  },
  computed: {
    spellList () {
      const spellList = []
      Object.entries(this.spellSlots).forEach(([key, value]) => {
        if (value) {
          const spellsInLevel = this.castable.filter(s => parseInt(s.level, 10) === parseInt(key, 10))
          spellList.push({ level: key, slots: value, spells: spellsInLevel })
        }
      })
      return spellList
    },
    cantrips () {
      return this.castable.filter(s => parseInt(s.level, 10) === 0)
    },
    spellSlots () {
      const spellcastingLevelIndex = parseInt(this.powercasting.level, 10) - 1
      const spellSlots = {}
      for (const col of this.adept.progressionColumns.filter(i => i.ps)) {
        if (col.values[spellcastingLevelIndex] > 0) {
          spellSlots[col.name[0]] = col.values[spellcastingLevelIndex]
        }
      }
      return spellSlots
    },
    castable () {
      return this.spells.filter(s => this.powercasting.powerList.includes(s.id))
    }
  },
  async created () {
    const data = await Promise.all([
      this.$store.dispatch('FETCH_DATA', 'powers'),
      this.$store.dispatch('FETCH_ITEM', { endpoint: 'classes', id: 'adept' })
    ])
    this.spells = data[0]
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
