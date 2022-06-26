<template>
  <div :class="textColor" class="d-block text-truncate">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MeCsEquipmentTitle',
  props: {
    rarity: {
      type: String,
      required: true
    }
  },
  computed: {
    textColor () {
      return this.$store.getters['config/rarityTextColor'](this.rarity)
    }
  }
}
</script>
