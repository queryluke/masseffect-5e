<template>
  <v-card v-if="item" flat tile>
    <!-- quantity -->
    <v-card-text v-if="item.data.consumable">
      <me-cb-debounced-number-input
        :current="item.uses"
        :max="99"
        label="Quantity"
        @add="changeStat('uses', item.uses + 1)"
        @remove="changeStat('uses', item.uses - 1)"
        @set="changeStat('uses', $event)"
      />
    </v-card-text>
    <!-- NOTES -->
    <v-divider v-if="item.data.consumable" />
    <v-list-item @click="showNotes = !showNotes">
      <v-list-item-content>
        <v-list-item-title class="text-caption">
          Notes
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon>
          {{ showNotes ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
      </v-list-item-action>
    </v-list-item>
    <v-expand-transition>
      <div v-show="showNotes">
        <v-card-text>
          <v-textarea
            v-model="notes"
            outlined
            @change="debouncedNoteChange()"
          />
        </v-card-text>
      </div>
    </v-expand-transition>
    <v-divider />
    <me-cs-equipment-gear-info :item="item.data" />
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { cloneDeep, debounce, set as setAttr } from 'lodash'
const { mapGetters } = createNamespacedHelpers('character/equipment')

export default {
  name: 'MeCsEquipmentGearSideNav',
  data () {
    return {
      cachedNotes: '',
      showNotes: false,
      useTypes: ['medi_gel', 'omni_gel', 'grenade', 'ammo']
    }
  },
  computed: {
    ...mapGetters(['gear', 'gearList']),
    toDisplay () {
      return this.$store.getters['character/navigation/toDisplay']
    },
    item () {
      return this.gear.find(i => i.uuid === this.toDisplay)
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
    changeStat (path, value) {
      const replacement = cloneDeep(this.item)
      setAttr(replacement, path, value)
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid, replacement })
    }
  }
}
</script>
