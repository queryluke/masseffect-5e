<template>
  <div>
    <v-select
      v-model="selection"
      :items="items"
      :label="$t(`misc.${options.id}`)"
      :counter="options.choices.count"
      outlined
    />
    <div v-if="selectionData">
      <template v-for="mechanic in selectionData.mechanics">
        <me-character-builder-selectable v-if="mechanic.choices" :key="mechanic.id" :selectable="mechanic" :parent-path="`${path}.selections`" />
      </template>
    </div>
  </div>
</template>

<script>
import { get as lodashGet } from 'lodash'
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    options: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    items () {
      return this.options.choices.map((i) => {
        return {
          text: this.$t(`misc.${i.id}`),
          value: i.id
        }
      })
    },
    selectionData () {
      if (this.selection) {
        return this.options.find(i => i.id === this.selection.selectionId)
      }
      return false
    },
    selection: {
      get () {
        return lodashGet(this.character, this.path)
      },
      set (value) {
        const val = value.choices ? { id: value, selections: {} } : value
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: this.path, value: val })
      }
    }
  }
}
</script>
