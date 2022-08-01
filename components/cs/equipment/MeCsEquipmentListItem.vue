<template>
  <v-list-item dense style="min-height: 38px" @click="showItem">
    <slot name="equip">
      <v-list-item-action class="my-0" @click.stop="toggleEquipped">
        <v-icon :color="iconColor">
          {{ item.equipped ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
        </v-icon>
      </v-list-item-action>
    </slot>
    <v-list-item-content class="py-0">
      <v-list-item-title>
        <slot name="title" />
      </v-list-item-title>
      <v-list-item-subtitle class="mt-n1">
        <small>
          <slot name="subtitle" />
        </small>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <slot name="action" />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'MeCsEquipmentListItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    equipDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    iconColor () {
      return this.viewOnly || this.equipDisabled
        ? 'grey darken-2'
        : this.item.equipped
          ? 'primary'
          : 'grey lighten-1'
    },
    itemData () {
      return this.item.data
    },
    title () {
      return this.itemData.name
    },
    subtitle () {
      switch (this.item.type) {
        case 'weapon':
          return this.$tc(`weapon_types.${this.itemData.type}`, 1)
        case 'armor':
          return `${this.$t(`armor_types.${this.itemData.type}`)} ${this.$t(`armor_placements.${this.itemData.placement}_title`)}`
        default:
          return ''
      }
    }
  },
  methods: {
    toggleEquipped () {
      if (this.viewOnly || this.equipDisabled) {
        return
      }
      this.$store.dispatch('character/equipment/TOGGLE_EQUIPPED', this.item.uuid)
    },
    showItem () {
      this.$store.commit('character/navigation/SET', { key: 'toDisplay', value: this.item.uuid })
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', `me-cs-equipment-${this.type}-side-nav`)
    }
  }
}
</script>
