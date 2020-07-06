<template lang="pug">
  div.mb-3
    p.my-0 Cantrips (at will): #[em {{ cantrips.map(spell => spell.name.toLowerCase()).join(', ') }}]
    p(v-for="item in spellList" v-bind:key="item.level").my-0 {{ item.level | ordinal }} level ({{ item.slots }} {{ item.slots | pluralize('slot') }})
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
      return this.adept.progression.find(p => parseInt(p.level, 10) === parseInt(this.spellcasting.level, 10)).spellSlots
    },
    castable () {
      return this.spells.filter(s => this.spellcasting.spellList.includes(s.id))
    }
  },
  async created () {
    const data = await Promise.all([
      this.$store.dispatch('FETCH_DATA', 'spells'),
      this.$store.dispatch('FETCH_ITEM', { endpoint: 'spells', id: 'adept' })
    ])
    this.spells = data[0]
    this.adept = data[1]
  }
}
</script>
