<template>
  <v-card class="px-1 px-md-3 my-1" flat>
    <v-card-title class="text-body-2 pa-0 py-2">
      {{ item.name }}
    </v-card-title>
    <v-card-text>
      <me-html :content="item.html" />
    </v-card-text>
    <v-card-actions v-if="resources.length">
      <me-cs-action-resource v-for="(resource, index) of resources" :id="resource.id" :key="index" :resource="resource" />
    </v-card-actions>
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
      return (this.item.mechanics || []).filter(i => i.resource)
    }
  }
}
</script>
