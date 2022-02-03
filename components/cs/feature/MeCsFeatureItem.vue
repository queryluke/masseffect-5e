<template>
  <v-card flat outlined class="mt-1" @click="moreInfo = !moreInfo">
    <v-card-text class="py-2">
      <div class="text-body-2">
        {{ item.name }}
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
export default {
  name: 'MeCsFeatureItem',
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
    }
  }
}
</script>
