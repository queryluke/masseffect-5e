<template>
  <v-tabs-items v-model="tab">
    <v-tab-item>
      <v-card :max-width="700" flat>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field v-model="search" append-icon="mdi-magnify" dense label="Search" hide-details />
          </v-col>
          <v-col cols="12">
            <v-chip-group v-model="filter" active-class="primary--text">
              <v-chip v-for="filter in filters" :key="filter" class="text-uppercase" small>
                {{ filter }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
        <div class="d-flex justify-space-between align-center">
          <div class="text-subtitle-1 mt-2">
            Equipment
          </div>
          <v-btn small outlined color="primary" @click="tab = 1">
            <v-icon left>
              mdi-plus
            </v-icon>
            Custom Armor
          </v-btn>
        </div>
        <me-hr :size="1" />
        <v-virtual-scroll
          :items="filteredItems"
          height="300"
          item-height="64"
        >
          <template #default="{ item }">
            <me-cs-equipment-adder-item :item="item" />
            <v-divider />
          </template>
        </v-virtual-scroll>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-btn small outlined @click="tab = 0">
        <v-icon left>
          mdi-chevron-left
        </v-icon>
        Back to Equipment List
      </v-btn>
      <v-form ref="customArmorForm" @submit="submitCustomArmor">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="customArmor.name" label="Name" />
          </v-col>
          <v-col cols="6">
            <v-select v-model="customArmor.placement" :items="armorPlacements" label="Placement" />
          </v-col>
          <v-col cols="6">
            <v-select v-model="customArmor.type" :items="armorTypes" label="Type" />
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="customArmor.html" rows="1" auto-grow label="Notes / Description" />
          </v-col>
        </v-row>
        <v-btn
          small
          outlined
          :color="customArmorAdded ? 'success' : 'primary'"
          :loading="customArmorAdding"
          @click="submitCustomArmor"
        >
          {{ customArmorAdded ? 'Added' : 'Add' }}
        </v-btn>
      </v-form>
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
export default {
  data () {
    return {
      search: null,
      filter: null,
      rarity: null,
      filters: ['weapons', 'armor', 'gear'],
      customArmorRules: {
        name: [v => !!v || 'Name is required'],
        placement: [v => !!v || 'Placement is required'],
        type: [v => !!v || 'Type is required']
      },
      customArmor: {
        name: null,
        placement: null,
        type: null,
        html: null
      },
      defaultCustomArmor: {
        name: null,
        placement: null,
        type: null,
        html: null
      },
      armorTypes: ['light', 'medium', 'heavy'],
      armorPlacements: ['head', 'chest', 'arms', 'legs'],
      tab: 0,
      customArmorAdded: false,
      customArmorAdding: false
    }
  },
  computed: {
    items () {
      const items = []
      for (const type of ['weapons', 'armor', 'gear']) {
        const models = this.$store.getters.getData(type).map((i) => {
          return {
            ...i,
            modelType: type
          }
        })
        items.push(...models)
      }
      return items
    },
    filteredItems () {
      return this.items.filter((i) => {
        return (this.search && this.search !== '' ? i.name.toLowerCase().includes(this.search.toLowerCase()) : true) &&
          (this.filter ? i.modelType === this.filters[this.filter] : true)
      })
    }
  },
  methods: {
    submitCustomArmor () {
      if (this.customArmor.name && this.customArmor.placement && this.customArmor.type) {
        const customArmor = {
          type: 'armor',
          custom: this.customArmor,
          equipped: false,
          mods: [],
          id: this.customArmor.name.replaceAll(/\W/g, '-') + new Date().getTime(),
          uuid: this.customArmor.name.replaceAll(/\W/g, '-') + new Date().getTime()
        }
        this.customArmorAdding = true
        this.$store.dispatch('character/equipment/ADD_EQUIPMENT', customArmor)
        this.customArmorAdding = false
        this.customArmorAdded = true
        setTimeout(() => {
          this.customArmorAdded = false
          this.tab = 0
          this.customArmor = this.defaultCustomArmor
        }, 1000)
      }
    }
  }
}
</script>
