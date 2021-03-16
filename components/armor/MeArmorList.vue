<template>
  <me-expansion-list
    :headers="headers"
    :items="items"
    type="armor"
  >
    <template v-slot:header.expanded="{ item }">
      <me-armor-title :item="item" />
    </template>
    <template v-slot:header.name="{ item }">
      <div class="font-weight-bold" :class="textColor(item.rarity)">
        {{ item.name }}
      </div>
    </template>
    <template v-slot:header.notes="{ item }">
      {{ item.notes.join(', ') }}
    </template>
    <template v-slot:header.cost="{ item }">
      {{ item.cost | groupDigits(',') }}
    </template>
    <template v-slot:body="{ item }">
      <me-armor-info :item="item" />
    </template>
  </me-expansion-list>
</template>

<script>
export default {
  name: 'MeArmorList',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    bookmarkable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    headers () {
      return this.$store.getters['config/armorHeaders']
    },
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
