<template>
  <div>
    <v-select
      v-model="selectionId"
      :items="items"
      :label="$t(`misc.${options.id}`)"
      outlined
    />
    <div v-if="selectionData">
      <template v-for="mechanic in selectionData.mechanics">
        <me-character-builder-selectable v-if="mechanic.choices" :key="mechanic.id" :selectable="mechanic" :source="`${source}-${selectionId}`" />
      </template>
    </div>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    options: {
      type: Object,
      required: true
    },
    // background-criminal-criminal-specialty
    source: {
      type: String,
      required: true
    }
  },
  computed: {
    items () {
      return this.options.choices.items.map((i) => {
        return {
          text: this.$t(`misc.${i.id}`),
          value: i.id
        }
      })
    },
    selectionData () {
      return this.selectionId ? this.options.choices.items.find(i => i.id === this.selectionId) : false
    },
    selectionId: {
      get () {
        const selection = this.character.selections.find(i => i.source === this.source)
        return selection?.value || null
      },
      set (value) {
        // remove any values of the old selection
        this.$store.dispatch('cb/DELETE_SELECTIONS', {
          cid: this.cid,
          // e.g. background-criminal-criminal-specialty-assassin
          id: `${this.source}-${this.selectionId}`
        })
        // update the current selection
        const selectionValue = {
          source: this.source,
          value
        }
        this.$store.dispatch('cb/UPDATE_SELECTIONS', { cid: this.cid, selection: selectionValue })
        // add mechanics without choices
        const newSelections = this.getMechanicsWithoutChoices(`${this.source}-${this.selectionId}`, this.selectionData.mechanics)
        this.$store.dispatch('cb/ADD_SELECTIONS', { cid: this.cid, selections: newSelections })
      }
    }
  }
}
</script>
