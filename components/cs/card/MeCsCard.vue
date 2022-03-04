<template>
  <v-card elevation="0" class="my-3">
    <slot name="header">
      <me-cs-card-title>{{ title }}</me-cs-card-title>
    </slot>
    <v-card-text class="px-2">
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MeCsCard',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
