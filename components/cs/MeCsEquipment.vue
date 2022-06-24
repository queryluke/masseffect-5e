<template>
  <div>
    <v-row class="mb-2">
      <v-col
        cols="12"
        sm="6"
        offset-sm="3"
        md="4"
        offset-md="4"
        text-center
      >
        <me-cb-debounced-input
          path="currentStats.credits"
          label="Credits"
          hide-icons
        />
      </v-col>
    </v-row>

    <div class="mt-3">
      <me-cs-equipment-weapon-list v-if="['all', 'weapons'].includes(tab)" :items="weapons" />
      <me-cs-equipment-armor-list v-if="['all', 'armor'].includes(tab)" :items="armor" />
      <me-cs-equipment-gear-list v-if="['all', 'gear'].includes(tab)" :items="gear" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsEquipment',
  computed: {
    ...mapGetters({ character: 'character', weapons: 'equipment/weapons', armor: 'equipment/armor', gear: 'equipment/gear', tab: 'navigation/equipmentFilter' }),
    viewOnly () {
      return this.$store.state.character.viewOnly
    }
  }
}
</script>
