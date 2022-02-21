<template>
  <v-card flat outlined class="mt-1" @click="moreInfo = !moreInfo">
    <v-card-text class="py-2">
      <div class="text-body-2">
        {{ item.name }}
        <div v-if="subtitle">
          <small>
            {{ subtitle }}
          </small>
        </div>
      </div>
      <div v-if="resources.length">
        <me-cs-action-resource v-for="(mechanic, index) of resources" :id="mechanic.resource.id" :key="index" :resource="mechanic.resource" />
      </div>
    </v-card-text>
    <me-standard-dialog v-if="item.html" :shown="moreInfo" @close="moreInfo = false">
      <template #title>
        {{ item.name }}
      </template>
      <me-html :content="item.html" />
    </me-standard-dialog>
  </v-card>
</template>

<script>
import { ProfLabels } from '~/mixins/labels/ProfLabels'

export default {
  name: 'MeCsFeatureItem',
  mixins: [ProfLabels],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      moreInfo: false
    }
  },
  computed: {
    resources () {
      const resources = (this.item.mechanics || []).filter(i => i.resource)
      const unique = [...new Set(resources.map(i => i.resource.id))]
      return unique.map(i => resources.find(j => j.id === i.id))
    },
    options () {
      return (this.item.mechanics || []).filter(i => i.options)
    },
    subtitle () {
      if (this.options.length) {
        const selected = this.$store.getters['character/selections/selected']
        const subTitle = []
        for (const option of this.options) {
          const type = option.model || option.type
          const selections = selected.find(i => i.path.includes(this.item.id) && i.path.endsWith(type) && (option.limits ? i.limit === JSON.stringify(option.limits) : true))
          if (selections) {
            if (['skill', 'tool', 'weapon'].includes(option.type)) {
              subTitle.push(this.profString(selections.value.map(i => i.value)))
            }
            if (option.type === 'asi') {
              subTitle.push(...selections.value.map(i => `+${i.amount} ${this.$t(`abilities.${i.ability}.title`)}`))
            }
            if (option.type === 'model-choice') {
              const selectionNames = selections.value
                .map((i) => {
                  return this.$store.getters.getItem(i.type, i.value)?.name || false
                })
                .filter(i => i)
              subTitle.push(...selectionNames)
            }
          }
        }
        return subTitle.join(', ')
      }
      return false
    }
  }
}
</script>
