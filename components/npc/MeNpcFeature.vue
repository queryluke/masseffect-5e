<template>
  <div class="text-body-2 mb-4">
    <span class="font-weight-medium font-italic">
      {{ title }}
    </span>
    <span class="font-weight-light">
      <slot name="description">
        <me-html :content="feature.description" inline />
      </slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    feature: {
      type: Object,
      default: () => {
        return {
          name: '',
          recharge: false,
          description: ''
        }
      }
    }
  },
  computed: {
    title () {
      if (this.feature.recharge) {
        return `${this.feature.name} (${this.feature.recharge}).`
      } else {
        return `${this.feature.name}.`
      }
    }
  }
}
</script>
