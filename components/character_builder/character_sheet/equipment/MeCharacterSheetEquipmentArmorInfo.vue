<template>
  <div>
    <v-chip-group>
      <v-chip v-if="item.acBonus > 0">
        +{{ item.acBonus }} AC
      </v-chip>
    </v-chip-group>
    <me-armor-info :item="itemData" />
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
  data () {
    return {
      customArmorStub: {
        placement: null,
        type: null,
        name: '',
        cost: 0,
        manufacturer: null,
        image: null,
        tags: [],
        andromeda: false,
        set: false,
        rarity: 'common',
        flavor: '',
        html: ''
      }
    }
  },
  computed: {
    itemData () {
      if (this.item.custom) {
        return { ...this.customArmorStub, placement: this.item.stats.placement, type: this.item.stats.type, name: this.item.custom.name, id: this.item.id, html: this.item.custom.notes || '' }
      }
      return this.equipmentData(this.item.type, this.item.id)
    }
  }
}
</script>
