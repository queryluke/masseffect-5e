<template>
  <div>
    <div class="text-subtitle">
      {{ profLabel(type) }}
    </div>
    <div class="d-flex">
      <div v-if="options.has">
        <template v-for="prof in options.has">
          <v-chip
            :key="prof"
            class="mr-3 mt-5"
          >
            {{ profText(type, prof) }}
          </v-chip>
        </template>
      </div>
      <v-autocomplete
        v-if="options.choices"
        v-model="profs"
        item-text="text"
        item-value="value"
        :items="items"
        :label="options.text"
        :counter="options.choices.count"
        chips
        deletable-chips
        multiple
      >
        <template #selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click:close="remove(data.item)"
          >
            {{ data.item.text }}
          </v-chip>
        </template>
        <template #item="data">
          <v-list-item-icon v-if="alreadyAcquired(data.item.value)">
            <v-icon color="warning">
              mdi-alert-circle
            </v-icon>
          </v-list-item-icon>
          <v-list-item-icon v-else-if="isSelected(data.item.value)">
            <v-icon color="primary">
              mdi-checkbox-marked
            </v-icon>
          </v-list-item-icon>
          <v-list-item-icon v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ data.item.text }}
            </v-list-item-title>
            <v-list-item-subtitle v-if="alreadyAcquired(data.item.value)">
              Already acquired
            </v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </div>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    classIndex: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    disableItems () {
      return this.profs.length === this.options.choices.count
    },
    items () {
      return this.options.choices.items.map((i) => {
        return { text: this.profText(this.type, i), value: i, disabled: this.alreadyAcquired(i) ? true : this.isSelected(i) ? false : this.disableItems }
      })
    },
    profs: {
      get () {
        return this.getKlassProfSelections(this.type)
      },
      set (value) {
        this.setKlassProfSelections({ type: this.type, value })
      }
    }
  },
  methods: {
    remove (item) {
      const index = this.profs.indexOf(item.value)
      if (index >= 0) {
        const newProfs = [...this.profs]
        newProfs.splice(index, 1)
        this.profs = newProfs
      }
    },
    alreadyAcquired (prof) {
      return this.proficiencies[this.type].includes(prof) && !this.profs.includes(prof)
    },
    isSelected (prof) {
      return this.profs.includes(prof)
    }
  }
}
</script>
