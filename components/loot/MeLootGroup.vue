<template>
  <v-card>
    <v-card-title class="text-h6">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MeLootGroup',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
