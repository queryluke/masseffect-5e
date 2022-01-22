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
            v-for="(mechanic, index) of aspect.mechanics"
            :key="index"
            :mechanic="mechanic"
            :path="`${path}/${aspect.id}`"
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
      showAspect: false
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
      return this.options.reduce((acc, curr) => acc + (curr.selections || 1), 0)
    },
    allSelectionsMade () {
      if (this.options.length === 0) {
        return true
      }
      const selections = this.character.selected.filter(i => i.path.startsWith(this.path))
      const selectionsCount = selections.reduce((acc, curr) => {
        const addition = !curr.value
          ? 0
          : curr.value.reduce((a, c) => a + c.amount || 1, 0)
        return acc + addition
      }, 0)
      return selectionsCount >= this.optionsCount
    }
  }
}
</script>
