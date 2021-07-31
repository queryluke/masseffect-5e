<template>
  <div>
    <v-alert dense value="info">
      Adding mods does not automatically update the armor's stats. If you need to adjust your shields, ac, speed, etc.,
      you can do so in the Character Sheet Settings.
    </v-alert>
    <v-autocomplete
      v-model="itemMods"
      label="Mods"
      :items="availableMods('armor', item.stats.placement, item.stats.type)"
      item-text="name"
      item-value="id"
      multiple
    />
    <template v-for="mod in item.mods">
      <div v-if="mod" :key="`selected-armor-mod-${mod}`">
        <me-html v-if="!loading" :content="modData(mod).html" />
        <me-hr />
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
    itemMods: {
      get () {
        return this.item.mods
      },
      set (value) {
        const changeItem = { ...this.item, mods: value }
        this.removeEquipment(this.item.type, this.item.uuid, changeItem)
      }
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
    availableMods (type, placement, availability) {
      return this.mods.filter(i => i.type === type && i.placement === placement && i.availability.includes(availability))
    },
    modData (id) {
      return this.mods.find(i => i.id === id)
    }
  }
}
</script>
