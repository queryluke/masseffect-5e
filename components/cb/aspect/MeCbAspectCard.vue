<template>
  <v-expansion-panel>
    <v-expansion-panel-header :disable-icon-rotate="!allSelectionsMade" :color="!allSelectionsMade ? 'primary' : undefined ">
      <div>
        <me-tpg s="title">
          <slot name="title">
            {{ aspect.name }}
          </slot>
        </me-tpg>
      </div>
      <template v-if="!allSelectionsMade" #actions>
        <v-icon>
          mdi-alert-circle
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content eager>
      <div class="mt-3">
        <slot name="description">
          <me-html v-if="aspect.html" :content="aspect.html" />
        </slot>
        <slot>
          <me-cb-aspect-selectable
            v-for="(mechanic, index) of options"
            :key="index"
            :mechanic="mechanic"
            :path="path"
          />
        </slot>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  name: 'MeCbAspectCard',
  mixins: [CharacterBuilderHelpers],
  props: {
    aspect: {
      type: Object,
      default: () => {}
    },
    rootPath: {
      type: String,
      default: 'wastebin'
    }
  },
  data () {
    return {
      subOptions: {
        'feat-choice': {
          model: 'feats',
          type: 'feat'
        }
      }
    }
  },
  computed: {
    path () {
      return `${this.rootPath}/${this.aspect.id}`
    },
    options () {
      return (this.aspect?.mechanics || []).filter(i => i.options)
    },
    optionsCount () {
      return this.options.reduce(this.optionsCountReduction, 0)
    },
    selectedCount () {
      return this.selectedAspectValues.reduce((acc, curr) => acc + (curr.amount || 1), 0)
    },
    selectedAspectValues () {
      return this.character.selected.filter(i => i.path.startsWith(this.path)).reduce((acc, curr) => acc.concat(curr.value), [])
    },
    allSelectionsMade () {
      if (this.options.length === 0) {
        return true
      }
      return this.selectedCount >= this.optionsCount
    }
  },
  methods: {
    optionsCountReduction (acc, curr) {
      let total = curr.selections || 1
      const subTypeObject = this.subOptions[curr.type]
      if (subTypeObject) {
        const baseSelections = this.selectedAspectValues.filter(i => i.type === subTypeObject.type)
        const arrayOfAllMatchingBaseSelectionValues = baseSelections.reduce((acc, curr) => acc.concat(curr.value), [])
        const matchingModels = this[subTypeObject.model].filter(i => arrayOfAllMatchingBaseSelectionValues.includes(i.id))
        const mechanicsToParse = matchingModels.reduce((acc, curr) => acc.concat(curr.mechanics || []), []).filter(i => i.options)
        total += mechanicsToParse.reduce(this.optionsCountReduction, 0)
      }
      return acc + total
    }
  }
}
</script>
