<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header>
        {{ feature.name }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <me-html :content="feature.html" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>

export default {
  props: {
    feature: {
      type: Object,
      required: true
    }
  }
}
</script>
