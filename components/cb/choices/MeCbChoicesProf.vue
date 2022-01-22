<template>
  <div>
    <div class="text-subtitle">
      {{ profLabel(type) }}
    </div>
    <me-cb-choices-v-select
      :items="items"
      :label="label"
      :total-selections="selections"
      :value="currentValue.map(i => i.value)"
      :acquired="alreadyAcquired"
      @change="upsert"
    />
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
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
    label () {
      return `Choose ${this.$tc(`string_numbers[${this.selections}]`)}...`
    },
    selections () {
      return this.mechanic.selections || 1
    },
    profOptions () {
      if (this.type === 'skill') {
        return this.skills.map((i) => {
          return {
            text: i.name,
            value: i.id
          }
        })
      }
      if (this.type === 'weapon') {
        return this.weaponTypes
      }
      if (this.type === 'armor') {
        return this.armorTypes
      }
      if (this.type === 'savingThrows') {
        return ['str', 'dex', 'con', 'int', 'wis', 'cha'].map((i) => {
          return {
            text: this.$t(`abilities.${i}.title`),
            value: i
          }
        })
      }
      if (this.type === 'tool') {
        // TODO: clean this up, should be as simple as the other
        const items = []
        for (const prof of this.toolProfs) {
          if (prof.id === 'vehicles') {
            for (const vehicleType of ['air', 'land', 'space', 'water']) {
              const id = `vehicle-${vehicleType}`
              items.push({
                value: id,
                group: 'vehicle',
                text: `Vehicles: ${this.$options.filters.titlecase(vehicleType)}`
              })
            }
          } else {
            items.push({
              value: prof.id,
              text: prof.name,
              group: prof.type
            })
          }
        }
        return items
      }
      return []
    },
    type () {
      return this.mechanic.profType
    },
    items () {
      let items = []
      if (this.mechanic.limit) {
        items = this.profOptions.filter((i) => {
          return this.type === 'tool'
            ? this.mechanic.limit.includes(i.value) || this.mechanic.limit.includes(i.group)
            : this.mechanic.limit.includes(i.value)
        })
      } else {
        items = this.profOptions
      }
      return items
    },
    appended () {
      return {
        type: 'prof',
        profType: this.type,
        expertise: this.mechanic.expertise || false
      }
    }
  },
  methods: {
    alreadyAcquired (value) {
      return this.proficiencies[this.type].includes(value)
    },
    upsert (value) {
      this.$emit('upsert', value.map((i) => {
        return { value: i, ...this.appended }
      }))
    }
  }
}
</script>
