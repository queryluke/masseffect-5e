<template>
  <div>
    <div class="d-flex justify-space-between">
      <div>
        <me-tpg s="6">
          Armor
        </me-tpg>
      </div>
      <!-- Shield Source -->
      <v-menu v-if="shieldSources.length > 1" offset-y :close-on-content-click="false">
        <template #activator="{ on, attrs }">
          <v-card outlined v-bind="attrs" class="pl-1" v-on="on">
            <span class="text-caption">
              Shields: {{ shieldSource.name }}
            </span>
            <v-icon size="16">
              mdi-menu-down
            </v-icon>
          </v-card>
        </template>
        <v-card>
          <v-list dense>
            <template v-for="source of shieldSources">
              <v-list-item :key="source.id" :disabled="viewOnly" style="min-height: 30px" class="mb-2" @click="shieldSource = source.id">
                <v-list-item-content class="py-0">
                  <v-list-item-title>
                    {{ source.name }} (capacity: {{ source.capacity }}, regen: {{ source.regen }})
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-menu>
    </div>
    <me-hr size="2" />
    <div v-for="placement in placements" :key="placement">
      <v-list v-if="itemsOfPlacement(placement).length" dense two-line>
        <v-subheader class="text-uppercase">
          {{ placement === 'body_armor' ? 'Body Armor' : placement }}
        </v-subheader>
        <template v-for="item in itemsOfPlacement(placement)">
          <me-cs-equipment-list-item :key="item.uuid" :item="item" type="armor" :equip-disabled="isEquipped(placement) && !item.equipped">
            <template #title>
              <me-cs-equipment-title :rarity="item.data.rarity">
                {{ item.data.name }}
              </me-cs-equipment-title>
            </template>
            <template #subtitle>
              <me-cs-equipment-subtitle :type="item.data.type" model="armor" :additional="{ placement: item.data.placement }" />
            </template>
          </me-cs-equipment-list-item>
          <v-divider :key="`divider-${item.uuid}`" />
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCsEquipmentArmorList',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      placements: ['head', 'body_armor', 'chest', 'arms', 'legs']
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    shieldSources () {
      return this.$store.getters['character/hp/shieldSources']
    },
    shieldSource: {
      get () {
        const sourceSelection = this.$store.getters['character/character'].settings.shieldSource
        const source = this.shieldSources.find(i => i.id === sourceSelection)
        return source || this.shieldSources[0]
      },
      set (value) {
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'settings.shieldSource', value })
      }
    }
  },
  methods: {
    itemsOfPlacement (placement) {
      return this.items.filter(i => i.data.placement === placement)
    },
    isEquipped (placement) {
      if (placement === 'body_armor') {
        return this.$store.getters['character/equipment/equippedArmor'].filter(i => ['chest', 'legs', 'arms', 'body_armor'].includes(i.data.placement)).length > 0
      }
      if (placement === 'head') {
        return this.$store.getters['character/equipment/equippedArmor'].filter(i => i.data.placement === placement).length > 0
      }
      return this.$store.getters['character/equipment/equippedArmor'].filter(i => [placement, 'body_armor'].includes(i.data.placement)).length > 0
    }
  }
}
</script>
