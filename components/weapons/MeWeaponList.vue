<template>
  <me-expansion-list
    :headers="headers"
    :items="items"
  >
    <template v-slot:header.expanded="{ item }">
      <me-weapon-title :item="item" />
    </template>
    <template v-slot:header.name="{ item }">
      <div class="font-weight-bold" :class="textColor(item.rarity)">
        {{ item.name }} <me-andromeda-chip v-if="item.andromeda" />
      </div>
      <small>
        {{ item.type }}
      </small>
    </template>
    <template v-slot:header.range="{ item }">
      <me-weapon-range :item="item" />
    </template>
    <template v-slot:header.damage="{ item }">
      {{ item.damage }} {{ item.dmgType }}
    </template>
    <template v-slot:header.cost="{ item }">
      {{ item.cost | groupDigits(',') }}
    </template>
    <template v-slot:body="{ item }">
      <me-weapon-info :item="item" />
      <me-bookmark v-if="bookmarkable" type="weapon" :item="item" />
    </template>
  </me-expansion-list>
</template>

<script>
export default {
  name: 'MeWeaponList',
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
      return this.$store.getters['config/weaponHeaders']
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
