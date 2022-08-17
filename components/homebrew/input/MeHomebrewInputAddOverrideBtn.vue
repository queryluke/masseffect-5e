<template>
  <v-btn outlined small :color="overridden ? 'warning' : 'error'" @click="$emit(overridden ? 'reset' : 'override')">
    <slot v-if="!overridden" />
    <span v-else>Remove Changes</span>
  </v-btn>
</template>

<script>
export default {
  name: 'MeHomebrewInputAddOverrideBtn',
  props: {
    overridden: {
      type: Boolean,
      default: false
    }
  }
}
</script>
