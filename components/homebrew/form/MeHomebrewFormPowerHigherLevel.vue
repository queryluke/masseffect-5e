<template>
  <v-row>
    <v-col cols="12" sm="8" offset-sm="2" offset-md="3">
      <v-select
        v-model="overrides"
        multiple
        filled
        dense
        chips
        small-chips
        label="Adjust..."
        deletable-chips
        :items="overrideOptions"
        hide-details
      />
    </v-col>
    <v-col v-if="overrides.includes('damage')" cols="12" class="px-3">
      <me-homebrew-input-legend small>
        Damage
      </me-homebrew-input-legend>
      <me-homebrew-input-damages :damages="damages" @update="damages = $event" />
    </v-col>
    <v-col v-if="overrides.includes('range')" cols="12">
      <me-homebrew-input-legend small>
        Range
      </me-homebrew-input-legend>
      <me-homebrew-input-range :range="range" ignore-long @update="range = $event" />
    </v-col>
    <v-col v-if="overrides.includes('duration')" cols="12">
      <me-homebrew-input-legend small>
        Duration
      </me-homebrew-input-legend>
      <me-homebrew-input-duration :duration="duration" @update="duration = $event" />
    </v-col>
    <v-col v-if="overrides.includes('resource')" cols="12">
      <me-homebrew-input-legend small>
        Uses
      </me-homebrew-input-legend>
      <me-homebrew-input-resource
        :resource="resource"
        castable
        label="Has Uses?"
        :excluded-display-types="['gear-consumable', 'hit-dice', 'omni-gel', 'barrier-ticks']"
        @update="resource = $event"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MeHomebrewFormPowerHigherLevel',
  props: {
    previousLevels: {
      type: Array,
      default: () => []
    },
    mechanics: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      selectedOverrides: [],
      overrideOptions: [
        { value: 'damage', text: 'Damage' },
        { value: 'duration', text: 'Duration' },
        { value: 'range', text: 'Range' },
        { value: 'resource', text: 'Uses' }
      ]
    }
  },
  computed: {
    overrides: {
      get () {
        return [...new Set(this.overrideOptions.filter(i => !!(this.mechanics || {})[i.value]).map(i => i.value).concat(this.selectedOverrides))]
      },
      set (value) {
        const removed = this.overrides.filter(i => !value.includes(i))
        const newMechanics = Object.assign({}, this.mechanics)
        for (const remove of removed) {
          delete newMechanics[remove]
        }
        this.$emit('update', newMechanics)
        this.selectedOverrides = value
      }
    },
    damages: {
      get () {
        return this.mechanics?.damage || this.getMechanicFromPreviousLevel('damage') || []
      },
      set (value) {
        this.$emit('update', { ...(this.mechanics || {}), damage: value })
      }
    },
    range: {
      get () {
        return this.mechanics?.range || this.getMechanicFromPreviousLevel('range') || {}
      },
      set (value) {
        this.$emit('update', { ...(this.mechanics || {}), range: value })
      }
    },
    duration: {
      get () {
        return this.mechanics.duration || this.getMechanicFromPreviousLevel('duration') || {}
      },
      set (value) {
        this.$emit('update', { ...(this.mechanics || {}), duration: value })
      }
    },
    resource: {
      get () {
        return this.mechanics.resource || this.getMechanicFromPreviousLevel('resource') || {}
      },
      set (value) {
        this.$emit('update', { ...(this.mechanics || {}), resource: value })
      }
    }
  },
  methods: {
    getMechanicFromPreviousLevel (mechanic) {
      for (const prevM of this.previousLevels.slice().reverse()) {
        if (prevM[mechanic]) {
          return prevM[mechanic]
        }
      }
      return null
    }
  }
}
</script>
