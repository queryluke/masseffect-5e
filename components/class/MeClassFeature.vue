<template>
  <div>
    <p class="text-h6">
      <slot name="title" />
    </p>
    <slot />
    <me-hr
      v-if="hr"
      :size="hrSize"
      :color="hrColor"
    />
  </div>
</template>

<script>
export default {
  props: {
    klassId: {
      type: String,
      default: null
    },
    hr: {
      type: Boolean,
      default: true
    },
    hrSize: {
      type: Number,
      default: 4
    }
  },
  computed: {
    hrColor () {
      return this.$store.getters['config/classThemeHrColor'](this.klassId)
    }
  }
}
</script>
