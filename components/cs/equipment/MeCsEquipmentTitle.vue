<template>
  <div :class="textColor" class="d-block text-truncate">
    <v-badge :value="homebrew" dot inline>
      <slot />
    </v-badge>
  </div>
</template>

<script>
export default {
  name: 'MeCsEquipmentTitle',
  props: {
    rarity: {
      type: String,
      required: true
    },
    homebrew: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    textColor () {
      return this.$store.getters['config/rarityTextColor'](this.rarity)
    }
  }
}
</script>
