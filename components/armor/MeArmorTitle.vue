<template>
  <me-item-title
    :title="item.name"
    subtitle
  >
    <template v-slot:subtitle>
      <div :class="textColor(item.rarity)">
        {{ item.rarity }} {{ item.armorType }} armor, {{ item.type }} {{ bodyArmorQualifier }}
      </div>
      <div class="text-caption">
        {{ item.cost | groupDigits(',') }}
      </div>
    </template>
  </me-item-title>
</template>

<script>
export default {
  name: 'MeArmorTitle',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          name: '',
          rarity: 'Common',
          armorType: '',
          cost: 0
        }
      }
    }
  },
  computed: {
    rarityTextColors () {
      const mode = this.$vuetify.theme.dark ? 'dark' : 'light'
      return this.$store.getters['config/rarityTextColors'][mode]
    },
    bodyArmorQualifier () {
      return this.item.type === 'Body Armor' ? '(chest, arms, legs)' : ''
    }
  },
  methods: {
    textColor (rarity) {
      return this.rarityTextColors[rarity]
    }
  }
}
</script>
