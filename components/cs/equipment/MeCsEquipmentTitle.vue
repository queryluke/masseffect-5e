<template>
  <div :class="textColor" class="d-block text-truncate">
    {{ item.name }}
  </div>
</template>

<script>
export default {
  name: 'MeCsEquipementTitle',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    textColor () {
      return this.$store.getters['config/rarityTextColor'](this.item.rarity)
    }
  }
}
</script>
