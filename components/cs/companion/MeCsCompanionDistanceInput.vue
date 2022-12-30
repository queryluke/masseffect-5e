<template>
  <v-slider
    :value="value"
    :label="label"
    :step="step"
    :max="max"
    @end="$emit('set', $event)"
  >
    <template #label>
      <span class="text-capitalize">
        {{ label }}
      </span>
    </template>
    <template #append>
      <me-distance v-if="value > 0" :length="value" abbr />
    </template>
    <template #thumb-label="{ value: newValue }">
      <me-distance v-if="newValue > 0" :length="newValue" abbr />
    </template>
  </v-slider>
</template>

<script>
export default {
  name: 'MeCsCompanionDistanceInput',
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      required: true
    },
    max: {
      type: Number,
      default: 60
    },
    step: {
      type: Number,
      default: 5
    }
  }
}
</script>
