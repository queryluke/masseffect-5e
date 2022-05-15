<template>
  <div>
    <me-cb-choices-v-select
      :items="items"
      :label="label"
      :total-selections="totalSelections"
      :value="selectedModelIds"
      :acquired="alreadyAcquired"
      :disabled="!!mechanic.set"
      @change="upsert"
    />
    <div v-if="!hideSelectedModels">
      <template v-for="mod of selectedModelsData">
        <div :key="mod.id">
          <div v-if="mechanic.totalSelections > 1" class="text-subtitle-1">
            {{ mod.name }}
          </div>

          <div v-for="(mechanic, index) of additionalMechanics(mod)" :key="`subMechanic-${index}`" outlined class="mb-2">
            <div class="pa-2">
              <me-cb-aspect-selectable
                :mechanic="mechanic"
                :path="`${id}/${mod.id}`"
              />
            </div>
          </div>
          <div v-for="(subM, index) of selectedModelsSubModels(mod)" :key="`subModel-${index}`" outlined class="mb-2">
            <div class="pa-2">
              <me-tpg s="title">
                {{ subM.name }}
              </me-tpg>
              <me-html :content="subM.html" />
              <me-cb-aspect-selectable
                v-for="(subMechanic, mIndex) of (subM.mechanics || []).filter(i => i.options)"
                :key="`subModel-${index}-mechanics-${mIndex}`"
                :mechanic="subMechanic"
                :path="`${id}/${mod.id}/${subM.id}`"
              />
            </div>
          </div>
          <me-html :content="mod.html" />
        </div>
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
      return this.mechanic.set ? this.mechanic.set.length : (this.mechanic.selections || 1)
    },
    items () {
      let models = this.models
      if (this.mechanic.limits) {
        // TODO: how to handle feat prereqs
        models = models.filter(this.modelFilter)
      }
      if (this.mechanic.model === 'powers' && this.mechanic.known) {
        const knownPowers = (this.$store.getters['character/character'].powers || []).map(i => i.id)
        models = models.filter(i => knownPowers.includes(i.id))
      }
      return models.map((i) => {
        return {
          text: i.name,
          value: i.id
        }
      })
    },
    selectedModelIds () {
      if (this.mechanic.set) {
        this.upsert(this.mechanic.set)
        return this.mechanic.set
      }
      return this.currentValue.map(i => i.value)
    },
    selectedModelsData () {
      return this.hideSelectedModels ? [] : this.models.filter(i => this.selectedModelIds.includes(i.id))
    },
    selectedModelIdsFromAnyWhere () {
      if (this.mechanic.isolated) {
        return []
      }
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
    additionalMechanics (mod) {
      return (mod.mechanics || []).filter(i => i.options)
    },
    selectedModelsSubModels (mod) {
      if (this.mechanic.model === 'species') {
        return this.$store.getters.getData('traits').filter(i => i.species.includes(mod.id))
      }
      return []
    },
    alreadyAcquired (item) {
      return this.selectedModelIdsFromAnyWhere.includes(item.value)
    },
    modelFilter (item) {
      return this.mechanic.limits.every(({ attr, value }) => {
        const comparitor = value || []
        const itemValue = item[attr]
        if (Array.isArray(itemValue)) {
          return item[attr].some(i => comparitor.includes(i))
        } else {
          return comparitor.includes(item[attr])
        }
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
