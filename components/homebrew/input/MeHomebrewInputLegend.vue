<template>
  <div class="font-weight-light mt-4">
    <span :style="style">
      <slot />
    </span>
    <me-hr :size="small ? 1 : 4" class="mt-n1" />
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewInputLegend',
  props: {
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style () {
      return {
        'font-size': this.small ? '1em' : '1.4em'
      }
    }
  }
}
</script>
