<template>
  <div>
    <v-chip-group>
      <v-chip v-if="item.bonusDamage > 0">
        +{{ item.bonusDamage }} damage
      </v-chip>
      <v-chip v-if="item.bonusHit > 0">
        +{{ item.bonusHit }} to hit
      </v-chip>
    </v-chip-group>
    <me-weapon-info :item="{ ...itemData, ...item.stats }" />
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    itemData () {
      return this.equipmentData(this.item.type, this.item.id)
    }
  }
}
</script>
