<template>
  <me-metric :value="length" unit="ft" :override="override" />
</template>

<script>
export default {
  name: 'MeDistance',
  props: {
    length: {
      type: [Number, String],
      required: true
    },
    override: {
      type: [Boolean, String],
      default: false
    }
  }
}
</script>
