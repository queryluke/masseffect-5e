<template>
  <v-expansion-panel>
    <v-expansion-panel-header :disable-icon-rotate="!allSelectionsMade" :color="!allSelectionsMade ? 'primary' : undefined ">
      <div>
        <me-tpg s="title">
          <slot name="title">
            {{ aspect.name }}
          </slot>
        </me-tpg>
        <div class="text-caption">
          <slot name="subtitle">
            {{ aspect.subtitle }}
          </slot>
        </div>
      </div>
      <template v-if="!allSelectionsMade" #actions>
        <v-icon>
          mdi-alert-circle
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
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
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/selections')
export default {
  name: 'MeCbAspectCard',
  props: {
    aspect: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rootPath: {
      type: String,
      default: 'wastebin'
    },
    asmOverride: {
      type: Object,
      default: () => {
        return {
          has: false,
          value: false
        }
      }
    }
  },
  computed: {
    ...mapGetters(['selected']),
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
      return this.selected.filter(i => i.path.startsWith(this.path)).reduce((acc, curr) => acc.concat(curr.value), [])
    },
    allSelectionsMade () {
      if (this.asmOverride.has) {
        return this.asmOverride.value
      }
      if (this.options.length === 0) {
        return true
      }
      return this.selectedCount >= this.optionsCount
    }
  },
  methods: {
    optionsCountReduction (acc, curr) {
      let total = curr.selections || 1
      const isModel = curr.type === 'model-choice'
      if (isModel) {
        const baseSelections = this.selectedAspectValues.filter(i => i.type === curr.model)
        const arrayOfAllMatchingBaseSelectionValues = baseSelections.reduce((acc, curr) => acc.concat(curr.value), [])
        const models = this.$store.getters.getData(curr.model)
        const matchingModels = models.filter(i => arrayOfAllMatchingBaseSelectionValues.includes(i.id))
        const mechanicsToParse = matchingModels.reduce((acc, curr) => acc.concat(curr.mechanics || []), []).filter(i => i.options)
        total += mechanicsToParse.reduce(this.optionsCountReduction, 0)
      }
      return acc + total
    }
  }
}
</script>
