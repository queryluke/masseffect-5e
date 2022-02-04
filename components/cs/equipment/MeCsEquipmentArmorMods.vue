<template>
  <div>
    <v-alert dense type="info">
      <small>
        Adding mods does not automatically update the armor's stats. If you need to adjust your shields, ac, speed, etc.,
        you can do so in the Character Sheet Settings.
      </small>
    </v-alert>
    <v-select
      v-model="itemMods"
      label="Mods"
      :items="availableMods('armor', item.data.placement, item.data.type)"
      item-text="name"
      item-value="id"
      multiple
      chips
      small-chips
      deletable-chips
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

export default {
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
    mods () {
      return this.$store.getters.getData('mods')
    },
    itemMods: {
      get () {
        return this.item.mods
      },
      set (value) {
        const replacement = { ...this.item, mods: value }
        this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid, replacement })
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
    availableMods (type, placement) {
      return this.mods.filter(i => i.type === type && i.placement === placement)
    },
    modData (id) {
      return this.mods.find(i => i.id === id)
    }
  }
}
</script>
