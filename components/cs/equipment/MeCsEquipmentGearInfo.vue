<template>
  <div>
    <v-row>
      <v-col cols="4">
        <me-cs-action-resource-display-counter
          :current="item.uses"
          :max="999"
          label="Quantity"
          @add="changeStat('uses', item.uses + 1)"
          @remove="changeStat('uses', item.uses - 1)"
          @set="changeStat('uses', $event)"
        />
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-model="notes"
          label="Notes"
          hint="e.g. Grenade mark, medi-gel type"
          persistent-hint
          @change="debouncedNoteChange()"
        />
      </v-col>
    </v-row>
    <me-gear-info :item="itemData" />
  </div>
</template>

<script>
import { cloneDeep, debounce, set as setAttr } from 'lodash'

export default {
  name: 'MeCsEquipmentGearInfo',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cachedNotes: ''
    }
  },
  computed: {
    itemData () {
      return this.item.data
    },
    notes: {
      get () {
        return this.item.notes
      },
      set (value) {
        this.cachedNotes = value
      }
    }
  },
  created () {
    this.debouncedNoteChange = debounce(() => {
      this.noteChange()
    }, 1000)
  },
  methods: {
    noteChange () {
      this.changeStat('notes', this.cachedNotes)
    },
    changeStat (path, value) {
      const replacement = cloneDeep(this.item)
      setAttr(replacement, path, value)
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid, replacement })
    }
  }
}
</script>
