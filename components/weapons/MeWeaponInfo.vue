<template>
  <div>
    <me-weapon-title v-if="title" :item="item" />
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col>
            <span v-for="(prop, index) in item.properties" :key="index">
              <me-weapon-prop :id="prop" />
              <span v-if="index + 1 < item.properties.length" class="pa-2">|</span>
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" lg="3">
            <me-item-stat label="Damage">
              {{ item.damage }} {{ item.dmgType }}
            </me-item-stat>
          </v-col>
          <v-col cols="6" lg="3">
            <me-item-stat label="Range">
              <me-weapon-range :item="item" />
            </me-item-stat>
          </v-col>
          <v-col cols="6" lg="3">
            <me-item-stat label="Heat">
              {{ item.heat }}
            </me-item-stat>
          </v-col>
          <v-col cols="6" lg="3">
            <me-item-stat label="Weight">
              {{ item.weight }}
            </me-item-stat>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-body-2">
            <p>
              {{ item.notes }}
            </p>
            <me-andromeda-chip v-if="item.andromeda" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
        <v-img v-if="item.image" :src="item.image" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    title: {
      type: Boolean,
      default: false
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
