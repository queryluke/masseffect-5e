<template>
  <div :class="textColor">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'MeEquipmentSubtitle',
  props: {
    rarity: {
      type: String,
      default: 'common'
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    textColor () {
      return this.$store.getters['config/rarityTextColor'](this.rarity)
    }
  }
}
</script>
