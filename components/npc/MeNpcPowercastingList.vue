<template>
  <div v-if="!$fetchState.pending" class="mb-3 text-body-2">
    <p v-for="(powerList, index) in list" :key="index" class="my-0">
      {{ powerList.name }} <span class="font-italic">{{ powerList.text }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    feature: {
      type: Object,
      default: () => {
        return {
          list: []
        }
      }
    },
    innate: {
      type: Boolean,
      default: false
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_LOTS', ['classes', 'powers'])
  },
  computed: {
    slotProgression () {
      return this.store.getters.getItem('classes', 'adept').progression.find(i => i.label === 'power_slots_by_power_level')
    },
    powers () {
      return this.store.getters.getData('powers')
    },
    innateList () {
      if (!this.innate) {
        return []
      }
      const group = {}
      const list = []
      for (const power of this.feature.list) {
        const p = this.powers.find(i => i.id === power.id)
        if (p) {
          if (!group[power.perDay]) {
            group[power.perDay] = []
          }
          const string = power.level ? `${p.name.toLowerCase()} (${this.$t('npc.higher_power_level', { level_adj: this.$t('level_adj', { nth: this.$t('ordinal_numbers', power.level) }) })})` : p.name.toLowerCase()
          group[power.perDay].push(string)
        }
      }
      for (const key in group) {
        const obj = {
          name: key === 'at_will' ? this.$t('npc.at_will') : this.$t('uses_per_day', { amount: key }),
          text: this.$t('lists.comma_list', group[key].length, group[key])
        }
        list.push(obj)
      }
      return list
    },
    levelList () {
      if (this.innate) {
        return []
      }
      const powers = this.powers.filter(i => this.feature.list.includes(i.id))
      const list = []
      if (powers.length > 0) {
        const cantrips = powers.filter(i => i.level === 0)
        if (cantrips.length > 0) {
          list.push(
            {
              name: `${this.$t('class_feature_columns.cantrips')} (${this.$t('npc.at_will')}):`,
              text: this.$t('lists.comma_list', cantrips.length, cantrips.map(i => i.name.toLowerCase()))
            }
          )
        }
        for (const index in this.slotProgression) {
          const slotLevel = index + 1
          const slotCount = this.slotProgression[index][this.feature.casterLevel - 1]
          const pList = powers.filter(i => i.level === slotLevel)
          const level = this.$t('level_nth', { nth: this.$t('ordinal_numbers', slotLevel) })
          const slots = this.$tc('npc.slots', slotCount)
          list.push(
            {
              name: `${level} (${slots}):`,
              text: this.$t('lists.comma_list', pList.length, pList.map(i => i.name.toLowerCase()))
            }
          )
        }
      }
      return list
    },
    list () {
      return this.feature.innate ? this.innateList : this.levelList
    }
  }
}
</script>
