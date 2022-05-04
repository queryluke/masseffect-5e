<template>
  <div>
    <div class="text-subtitle">
      Advancements
    </div>
    <template v-for="item of items">
      <v-select
        :key="`adv-option-${item.id}`"
        :items="advaAsOption(item)"
        no-data-text="There are no advancements for this power"
        :label="item.name"
        :value="advCurrentValue(item)"
        @change="upsert(item.id, $event)"
      />
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCbChoicesAdvancements',
  props: {
    mechanic: {
      type: Object,
      required: true
    },
    currentValue: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({ powersList: 'powers/powerList', selected: 'selections/selected' }),
    items () {
      if (!this.mechanic.limit) {
        return []
      }
      if (this.mechanic.limit.value) {
        return this.powersList.filter(i => this.mechanic.limit.value.includes(i.id))
      }
      if (this.mechanic.limit.valueLookup) {
        const ids = this.selected
          .filter(i => i.path.endsWith(`${this.mechanic.limit.valueLookup.model}/${this.mechanic.limit.valueLookup.id}/powers`) || i.path.endsWith(`${this.mechanic.limit.valueLookup.id}/powers`))
          .reduce((acc, curr) => acc.concat(...curr.value), [])
          .filter(i => i.type === 'powers')
          .map(i => i.value)
        return this.powersList.filter(i => ids.includes(i.id))
      }
      return []
    }
  },
  methods: {
    advaAsOption (item) {
      return item.advancements.map((i) => {
        return {
          value: i.id,
          text: i.name
        }
      })
    },
    advCurrentValue (item) {
      return this.currentValue.find(i => i.id === item.id)
    },
    upsert (id, value) {
      const newValues = this.currentValue.slice()
      const existing = newValues.findIndex(i => i.id === id)
      const upsertValue = { type: 'advancement', value, id }
      if (existing > -1) {
        newValues.splice(existing, 1, upsertValue)
      } else {
        newValues.push(upsertValue)
      }
      this.$emit('upsert', newValues)
    }
  }
}
</script>
