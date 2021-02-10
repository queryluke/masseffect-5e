<template>
  <v-card outlined class="ma-5">
    <v-card-title class="text-h5 font-weight-thin">
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
