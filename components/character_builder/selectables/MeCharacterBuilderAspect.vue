<template>
  <v-expansion-panel>
    <v-expansion-panel-header :disable-icon-rotate="aspectHasSelections" :color="aspectHasSelections ? 'primary' : undefined ">
      <div>
        <div class="text-subtitle">
          {{ aspect.name }}
        </div>
        <div v-if="subtitle" class="text-caption">
          {{ subtitle }}
        </div>
      </div>
      <template v-if="aspectHasSelections" #actions>
        <v-icon>
          mdi-alert-circle
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div class="mt-3">
        <slot>
          <me-html v-if="aspect.html" :content="aspect.html" />
          <me-character-builder-selectable v-for="mechanic in mechanicsWithOptions" :key="mechanic.id" :source="source" :selectable="mechanic" />
        </slot>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    aspect: {
      type: Object,
      required: true
    },
    subtitle: {
      type: [String, Boolean],
      default: false
    },
    parentSource: {
      type: String,
      default: 'wastebin'
    },
    hasSelections: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    source () {
      return `${this.parentSource}-${this.aspect.id}`
    },
    mechanicsWithOptions () {
      if (!this.aspect.mechanics) {
        return []
      }
      return this.aspect.mechanics.filter(i => i.choices)
    },
    aspectHasSelections () {
      if (this.hasSelections) {
        return true
      }
      if (this.mechanicsWithOptions.length === 0) {
        return false
      }
      return this.mechanicsWithOptions.some(i => this.mechanicNeedsSelection(i, this.source, i.choices.count) === true)
    }
  }
}
</script>
