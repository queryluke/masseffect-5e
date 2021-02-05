<template>
  <div>
    <p
      class="text-h6"
    >
      {{ item.name }}
    </p>
    <me-html
      :content="item.html"
    />
    <me-hr
      v-if="hr"
      :color="hrColor"
    />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    hr: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hrColor () {
      return this.$store.getters['config/classThemeHrColor'](this.item.class)
    }
  }
}
</script>
