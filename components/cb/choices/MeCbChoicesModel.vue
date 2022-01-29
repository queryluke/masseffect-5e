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
              :path="id"
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
    limitString () {
      return this.mechanic.limits ? JSON.stringify(this.mechanic.limits) : false
    },
    selectedModelIds () {
      let current = this.currentValue
      if (this.limitString) {
        current = current.filter(i => i.limit === this.limitString)
      }
      return current.map(i => i.value)
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
      const appended = {
        type: this.type
      }
      if (this.limitString) {
        appended.limit = this.limitString
      }
      return appended
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
