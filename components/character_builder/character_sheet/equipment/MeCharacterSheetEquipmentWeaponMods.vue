<template>
  <div>
    <v-alert dense type="info">
      Adding mods does not automatically update the weapon's stats. You can adjust the stats in the "Stat Override" Tab.
    </v-alert>
    <template v-for="(mod, modType) in item.mods">
      <v-autocomplete
        :key="`mod-select-${modType}`"
        :label="$t(`mod_placements.${modType}`)"
        :items="availableMods('weapon', modType, itemData.type)"
        item-text="name"
        item-value="id"
        :value="mod"
        @change="changeWeaponMod($event, modType)"
      />
      <div v-if="mod" :key="`mod-data-${modType}`">
        <me-html v-if="!loading" :content="modData(mod).html" />
      </div>
    </template>
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
      loading: false
    }
  },
  computed: {
    itemData () {
      return this.equipmentData(this.item.type, this.item.id)
    }
  },
  watch: {
    'item.mods' () {
      this.loading = true
      // FIXME: ugly race condition here, need to find a better way to re-trigger the html content render
      setTimeout(() => {
        this.loading = false
      }, 100)
    }
  },
  methods: {
    changeWeaponMod (mod, modType) {
      const changeItem = { ...this.item, mods: { ...this.item.mods, [modType]: mod } }
      this.removeEquipment(this.item.type, this.item.uuid, changeItem)
    },
    modData (id) {
      return this.mods.find(i => i.id === id)
    },
    availableMods (type, placement, availability) {
      return this.mods.filter(i => i.type === type && i.placement === placement && i.availability.includes(availability))
    }
  }
}
</script>
