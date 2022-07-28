<template>
  <div>
    <me-cs-equipment-weapon-list v-if="['all', 'weapons'].includes(tab)" :items="weapons" class="mt-3" />
    <me-cs-equipment-armor-list v-if="['all', 'armor'].includes(tab)" :items="armor" class="mt-3" />
    <me-cs-equipment-gear-list v-if="['all', 'gear'].includes(tab)" :items="gear" class="mt-3" />
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
