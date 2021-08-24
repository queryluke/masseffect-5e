<template>
  <div>
    <v-row align-content="end">
      <v-col cols="12">
        <slot />
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="typeSelection"
          :items="improvementOptions"
          item-value="type"
          label="Choose an option..."
        />
      </v-col>
      <v-col v-if="featSelected" cols="12" sm="8">
        <v-autocomplete
          v-model="featureSelection"
          :items="feats"
          label="Choose a feat..."
          item-text="name"
          item-value="id"
        />
      </v-col>
      <v-col v-if="abiSelected" cols="12" sm="8">
        <v-select
          v-model="featureSelection"
          item-text="text"
          item-value="value"
          :items="abiArray"
          label="Choose up to two abilities..."
          :counter="2"
          height="32px"
          chips
          deletable-chips
          multiple
        >
          <template #selection="data">
            <v-chip
              small
              v-bind="data.attrs"
              :input-value="data.selected"
              close
              @click:close="remove(data.item)"
            >
              {{ data.item.text }} {{ abilityBonusTotal }}
            </v-chip>
          </template>
          <template #item="data">
            <v-list-item-icon v-if="isSelected(data.item.value)">
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
            </v-list-item-content>
          </template>
        </v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  // TODO: Enforce feat prerequisites
  // TODO: Feat previews
  mixins: [CharacterBuilderHelpers],
  props: {
    source: {
      type: String,
      required: true
    },
    // might be useful for species?
    featOnly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      improvementOptions: [
        { text: 'Ability Score Improvement', type: 'abi' },
        { text: 'Feat', type: 'feat' }
      ]
    }
  },
  computed: {
    abiArray () {
      return ['str', 'dex', 'con', 'wis', 'int', 'cha'].map((i) => {
        return {
          text: this.$t(`abilities.${i}.title`),
          value: i,
          disabled: this.featSelected || this.isSelected(i) ? false : Array.isArray(this.featureSelection) && this.featureSelection.length === 2
        }
      })
    },
    selection () {
      const selection = this.selections.find(i => i.source === this.source)
      return selection || {
        source: this.source,
        type: null,
        value: null
      }
    },
    typeSelection: {
      get () {
        return this.selection.type
      },
      set (type) {
        this.$store.dispatch('cb/UPDATE_SELECTIONS', { cid: this.cid, selection: { ...this.selection, type, value: [] } })
      }
    },
    featureSelection: {
      get () {
        return this.selection.value
      },
      set (value) {
        this.$store.dispatch('cb/UPDATE_SELECTIONS', { cid: this.cid, selection: { ...this.selection, value } })
      }
    },
    featSelected () {
      return this.typeSelection && this.typeSelection === 'feat'
    },
    abiSelected () {
      return this.typeSelection && this.typeSelection === 'abi'
    },
    abilityBonusTotal () {
      if (this.featSelected || !this.featureSelection) {
        return ''
      }
      return this.featureSelection.length === 1 ? '+2' : '+1'
    }
  },
  methods: {
    isSelected (value) {
      return this.featureSelection && this.featureSelection.includes(value)
    },
    remove (item) {
      const index = this.featureSelection.indexOf(item.value)
      if (index >= 0) {
        const newProfs = [...this.featureSelection]
        newProfs.splice(index, 1)
        this.featureSelection = newProfs
      }
    }
  }
}
</script>
