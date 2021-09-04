<template>
  <me-item-title
    :title="item.name"
    subtitle
  >
    <template #subtitle>
      <div :class="textColor(item.rarity)">
        {{ item.rarity }} {{ $t(`gear_types.${item.type}`) }} <span v-if="item.subType">({{ $t(`gear_types.${item.subType}`) }})</span>
      </div>
      <div v-if="item.cost !== 0" class="text-caption">
        {{ item.cost | groupDigits(',') }} credits
      </div>
    </template>
  </me-item-title>
</template>

<script>
export default {
  name: 'MeModTitle',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          name: '',
          rarity: 'Common',
          type: '',
          cost: 0,
          subtype: false
        }
      }
    }
  },
  computed: {
    rarityTextColors () {
      const mode = this.$vuetify.theme.dark ? 'dark' : 'light'
      return this.$store.getters['config/rarityTextColors'][mode]
    }
  },
  methods: {
    textColor (rarity) {
      return this.rarityTextColors[rarity]
    }
  }
}
</script>
