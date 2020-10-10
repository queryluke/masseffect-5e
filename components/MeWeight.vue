<template>
  <me-metric
    :value="amount"
    unit="lb"
    :override="override"
    :abbr="abbr"
    :adj="adj"
  />
</template>

<script>
export default {
  name: 'MeWeight',
  props: {
    amount: {
      type: [Number, String],
      required: true
    },
    override: {
      type: [Boolean, String],
      default: false
    },
    adj: {
      type: Boolean,
      default: false
    },
    abbr: {
      type: Boolean,
      default: false
    }
  }
}
</script>
