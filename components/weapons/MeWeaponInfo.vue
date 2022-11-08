<template>
  <div>
    <me-weapon-title v-if="title" :item="item" />
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col>
            <div v-for="(prop, index) in item.properties" :key="index" class="text-body-2 d-inline-block">
              <me-weapon-prop :id="prop" />
              <div v-if="index + 1 < item.properties.length" class="px-2 d-inline-block">
                |
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" lg="3">
            <me-item-stat :label="$t('damage_title')">
              {{ $t('dice', {dieType: item.damage.dieType, dieCount: dieCount}) }} {{ $t(`damage_types.${item.damage.type}`) }}
            </me-item-stat>
          </v-col>
          <v-col cols="6" lg="3">
            <me-item-stat :label="$t('range_title')">
              <me-weapon-range :item="item" />
            </me-item-stat>
          </v-col>
          <v-col cols="6" lg="3">
            <me-item-stat :label="$t('heat_title')">
              {{ item.heat }}
            </me-item-stat>
          </v-col>
          <v-col cols="6" lg="3">
            <me-item-stat :label="$t('weight_title')">
              <me-weight :amount="item.weight" num-only />
            </me-item-stat>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-body-2 mb-3">
            <me-html :content="item.html" />
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
    dieCount () {
      return typeof this.item.damage.dieCount === 'object' ? 'X' : this.item.damage.dieCount
    }
  }
}
</script>
