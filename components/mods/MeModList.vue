<template>
  <me-expansion-list
    :headers="headers"
    :items="items"
    type="mods"
  >
    <template v-slot:header.expanded="{ item }">
      <me-mod-title :item="item" />
    </template>
    <template v-slot:header.name="{ item }">
      <div class="font-weight-bold" :class="textColor(item.rarity)">
        {{ item.name }}
      </div>
      <small>
        {{ item.type }} mod
      </small>
    </template>
    <template v-slot:header.notes="{ item }">
      {{ item.notes.join(', ') }}
    </template>
    <template v-slot:header.availability="{ item }">
      {{ availabilityAbbr(item) }}
    </template>
    <template v-slot:header.cost="{ item }">
      {{ item.cost | groupDigits(',') }}
    </template>
    <template v-slot:body="{ item }">
      <me-mod-info :item="item" />
    </template>
  </me-expansion-list>
</template>

<script>
export default {
  name: 'MeModList',
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
      return this.$store.getters['config/modHeaders']
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
    availabilityAbbr (item) {
      return item.type === 'Armor'
        ? item.availability.length >= 3 ? 'All armor' : item.availability.join(', ')
        : item.availability.length >= 5 ? 'All ranged weapons' : item.availability.join(', ')
    }
  }
}
</script>
