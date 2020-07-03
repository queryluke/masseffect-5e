<template lang="pug">
  div
    h3(style="padding-top: 12px;") {{label}}
    div(class="counter-area")
      v-btn(@click="val = minValue" v-if="showMin") Min
      v-btn(@click="val--" :disabled="val <= 0") -
      h2(class="points-text") {{val}} / {{maxValue}}
      v-btn(@click="val++" :disabled="val >= maxValue") +
      v-btn(@click="val = maxValue" v-if="showMax") Max

</template>

<style lang="scss">
  .counter-area {
    .v-btn {
      min-width: 0px;
    }
    .points-text {
      display: inline;
      margin: 15px;
    }
  }
</style>

<script>
export default {
  props: {
    label: {
      type: String,
      default: () => { return 'Label' }
    },
    value: {
      type: Number,
      default: () => { return 0 }
    },
    minValue: {
      type: Number,
      default: () => { return 0 }
    },
    maxValue: {
      type: Number,
      default: () => { return 0 }
    },
    showMin: {
      type: Boolean,
      default: true
    },
    showMax: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    val: 0
  }),
  watch: {
    val (value) {
      this.$emit('change', value)
      return value
    }
  },
  created () {
    this.val = this.value
  }
}
</script>
