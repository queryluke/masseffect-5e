<template>
  <div v-if="!$fetchState.pending" class="mb-3 mt-n2 text-body-2">
    <p v-for="(powerList, index) in list" :key="index" class="my-0">
      {{ powerList.name }} <me-html :content="powerList.text" inline />
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
      return this.$store.getters.getItem('classes', 'adept').progression.columns.find(i => i.label === 'power_slots_by_power_level').values
    },
    powers () {
      return this.$store.getters.getData('powers')
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
          const powerDialog = `<me-power-dialog id="${power.id}" hide-advancements />`
          const string = power.level ? `${powerDialog} (${this.$t('npc.higher_power_level', { level_adj: this.$t('level_adj', { nth: this.$t(`ordinal_numbers[${power.level}]`) }) })})` : powerDialog
          group[power.perDay].push(string)
        }
      }
      for (const key in group) {
        const label = key === 'at_will' ? this.$t('npc.at_will') : this.$t('npc.uses_per_day', { amount: key })
        const sort = key === 'at_will' ? 0 : key
        const name = this.$t('markdown_label', { label })
        const obj = {
          name,
          sort,
          text: this.$t(`lists.comma_list[${group[key].length}]`, group[key])
        }
        list.push(obj)
      }
      return list.sort((a, b) => a.sort > b.sort ? 1 : -1)
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
          const cantripLabel = `${this.$t('class_feature_columns.cantrips')} (${this.$t('npc.at_will')})`
          list.push(
            {
              name: this.$t('markdown_label', { label: cantripLabel }),
              text: this.$t(`lists.comma_list[${cantrips.length}]`, cantrips.map(i => `<me-power-dialog id="${i.id}" hide-advancements />`))
            }
          )
        }
        for (const index in this.slotProgression) {
          const slotLevel = parseInt(index) + 1
          const slotCount = this.slotProgression[index][this.feature.casterLevel - 1]
          if (slotCount === 0) {
            continue
          }
          const pList = powers.filter(i => i.level === slotLevel)
          const level = this.$t('level_nth', { nth: this.$t(`ordinal_numbers[${slotLevel}]`) })
          const slots = this.$tc('npc.slots', slotCount)
          const label = `${level} (${slots})`
          list.push(
            {
              name: this.$t('markdown_label', { label }),
              text: this.$t(`lists.comma_list[${pList.length}]`, pList.map(i => `<me-power-dialog id="${i.id}" hide-advancements />`))
            }
          )
        }
      }
      return list
    },
    list () {
      return this.innate ? this.innateList : this.levelList
    }
  }
}
</script>
