<template>
  <div v-if="!$fetchState.pending" class="mb-3 mt-n3 text-body-2">
    <p v-for="(grenadeList, index) in list" :key="index" class="my-0">
      {{ grenadeList.name }} <me-html :content="grenadeList.text" inline />
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
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'gear')
  },
  computed: {
    grenades () {
      return this.$store.getters.getData('gear').filter(i => i.type === 'grenade')
    },
    list () {
      const group = {}
      const list = []
      for (const grenade of this.feature.list) {
        const p = this.grenades.find(i => i.id === grenade.id)
        if (p) {
          if (!group[grenade.uses]) {
            group[grenade.uses] = []
          }
          const mark = grenade.mark ? `mark="${grenade.mark}"` : ''
          const string = `<me-grenade-dialog id="${p.id}" ${mark} />`
          group[grenade.uses].push(string)
        }
      }
      for (const key in group) {
        const obj = {
          name: `${this.$tc('npc.uses', key)}:`,
          text: this.$t(`lists.comma_list[${group[key].length}]`, group[key])
        }
        list.push(obj)
      }
      return list
    }
  }
}
</script>
