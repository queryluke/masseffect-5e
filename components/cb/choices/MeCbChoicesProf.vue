<template>
  <div>
    <div class="text-subtitle">
      {{ profLabel(type) }}
    </div>
    <div class="d-flex flex-wrap">
      <v-select
        item-text="text"
        item-value="value"
        :items="items"
        :label="`Choose ${$tc(`string_numbers[${selections}]`)}...`"
        :counter="selections"
        chips
        deletable-chips
        multiple
        :value="vSelectCurrentValue"
        @change="updateSelection"
      >
        <template #selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            small
            @click:close="removeSelection(data.item.value)"
          >
            {{ data.item.text }}
          </v-chip>
        </template>
        <template #item="{ item }">
          <v-list-item-icon v-if="alreadyAcquired(item.value)">
            <v-icon color="warning">
              mdi-alert-circle
            </v-icon>
          </v-list-item-icon>
          <v-list-item-icon v-else-if="isSelected(item.value)">
            <v-icon color="primary">
              mdi-checkbox-marked
            </v-icon>
          </v-list-item-icon>
          <v-list-item-icon v-else>
            <v-icon :color="item.disabled ? 'grey darken-2' : undefined">
              mdi-checkbox-blank-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
            <v-list-item-subtitle v-if="alreadyAcquired(item.value)">
              Already acquired
            </v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-select>
    </div>
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
    selections () {
      return this.mechanic.selections || 1
    },
    expertise () {
      return this.mechanic.expertise || false
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
    disableItems () {
      return this.currentValue.length === this.selections
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
      return items.map((i) => {
        return { ...i, disabled: this.disabled(i.value) }
      })
    },
    vSelectCurrentValue () {
      return this.currentValue.map(i => i.value)
    }
  },
  methods: {
    disabled (value) {
      return this.alreadyAcquired(value)
        ? true
        : this.isSelected(value)
          ? false
          : this.disableItems
    },
    alreadyAcquired (value) {
      return this.proficiencies[this.type].includes(value) && !this.isSelected(value)
    },
    isSelected (value) {
      return this.currentValue.map(i => i.value).includes(value)
    },
    removeSelection (value) {
      const currentValue = this.currentValue.slice()
      const currentIndex = currentValue.findIndex(i => i.value === value)
      currentValue.splice(currentIndex, 1)
      this.$emit('upsert', currentValue)
    },
    updateSelection (value) {
      const newValue = value.map((i) => {
        return {
          type: 'prof',
          profType: this.type,
          value: i,
          expertise: this.expertise
        }
      })
      this.$emit('upsert', newValue)
    }
  }
}
</script>
