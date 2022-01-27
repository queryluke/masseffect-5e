<template>
  <v-card class="px-1 px-md-3 my-1" flat>
    <v-card-title class="text-body-2 pa-0 py-2">
      {{ item.name }}
    </v-card-title>
    <v-card-text>
      <me-html :content="item.html" />
      <div v-if="resources.length">
        <me-cs-action-resource v-for="(mechanic, index) of resources" :id="mechanic.resource.id" :key="index" :resource="mechanic.resource" />
      </div>
    </v-card-text>
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
  computed: {
    resources () {
      const resources = (this.item.mechanics || []).filter(i => i.resource)
      const unique = [...new Set(resources.map(i => i.resource.id))]
      return unique.map(i => resources.find(j => j.id === i.id))
    }
  }
}
</script>
