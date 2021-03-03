<template>
  <me-expansion-list
    :headers="headers"
    :items="items"
    type="gear"
  >
    <template v-slot:header.expanded="{ item }">
      <me-gear-title :item="item" />
    </template>
    <template v-slot:header.name="{ item }">
      <div class="font-weight-bold" :class="textColor(item.rarity)">
        {{ item.name }}
      </div>
      <small>
        {{ item.type }} <span v-if="item.subType">({{ item.subType }})</span>
      </small>
    </template>
    <template v-slot:header.cost="{ item }">
      {{ cost(item.cost) }}
    </template>
    <template v-slot:body="{ item }">
      <me-gear-info :item="item" />
    </template>
  </me-expansion-list>
</template>

<script>
export default {
  name: 'MeGearList',
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
      return this.$store.getters['config/gearHeaders']
    },
    rarityTextColors () {
      const mode = this.$vuetify.theme.dark ? 'dark' : 'light'
      return this.$store.getters['config/rarityTextColors'][mode]
    }
  },
  methods: {
    textColor (rarity) {
      return this.rarityTextColors[rarity]
    },
    cost (cost) {
      return cost === 0 ? '-' : this.$options.filters.groupDigits(cost, ',')
    }
  }
}
</script>
