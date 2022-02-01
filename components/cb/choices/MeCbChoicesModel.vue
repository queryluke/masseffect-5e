<template>
  <div>
    <me-cb-choices-v-select
      :items="items"
      :label="label"
      :total-selections="totalSelections"
      :value="selectedModelIds"
      :acquired="alreadyAcquired"
      @change="upsert"
    />
    <div v-if="!hideSelectedModels">
      <template v-for="mod of selectedModelsData">
        <div :key="mod.id">
          <div v-if="mechanic.totalSelections > 1" class="text-subtitle-1">
            {{ mod.name }}
          </div>
          <me-html :content="mod.html" />
        </div>
        <v-card v-for="(mechanic, index) of (mod.mechanics || []).filter(i => i.options)" :key="index" outlined class="mb-2">
          <div class="pa-2">
            <me-cb-aspect-selectable
              :mechanic="mechanic"
              :path="`${id}/${mod.id}`"
            />
          </div>
        </v-card>
      </template>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/selections')
export default {
  name: 'MeCbChoicesModel',
  props: {
    id: {
      type: String,
      required: true
    },
    mechanic: {
      type: Object,
      required: true
    },
    currentValue: {
      type: Array,
      required: true
    },
    hideSelectedModels: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['selected']),
    type () {
      return this.mechanic.model
    },
    label () {
      // TODO: create string
      return this.mechanic.label || 'Choose...'
    },
    models () {
      return this.$store.getters.getData(this.type)
    },
    totalSelections () {
      return this.mechanic.selections || 1
    },
    items () {
      let models = this.models
      if (this.mechanic.limits) {
        // TODO: how to handle feat prereqs
        models = models.filter(this.modelFilter)
      }
      return models.map((i) => {
        return {
          text: i.name,
          value: i.id
        }
      })
    },
    selectedModelIds () {
      return this.currentValue.map(i => i.value)
    },
    selectedModelsData () {
      return this.hideSelectedModels ? [] : this.models.filter(i => this.selectedModelIds.includes(i.id))
    },
    selectedModelIdsFromAnyWhere () {
      const matches = []
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i]?.value[0]?.type === this.type) {
          matches.push(...this.selected[i].value.map(j => j.value))
        }
      }
      return matches.filter(i => !this.selectedModelIds.includes(i))
    },
    appended () {
      return {
        type: this.type
      }
    }
  },
  methods: {
    alreadyAcquired (value) {
      return this.selectedModelIdsFromAnyWhere.includes(value)
    },
    modelFilter (item) {
      return this.mechanic.limits.every(({ attr, value }) => {
        const comparitor = value || []
        return comparitor.includes(item[attr])
      })
    },
    upsert (value) {
      this.$emit('upsert', value.map((i) => {
        return { value: i, ...this.appended }
      }))
    }
  }
}
</script>
