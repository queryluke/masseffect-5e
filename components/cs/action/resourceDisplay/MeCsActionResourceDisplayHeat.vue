<template>
  <div class="d-flex align-start justify-center justify-md-start">
    <v-btn x-small class="mr-1" color="primary" icon @click.stop="reloadWeapon">
      <v-icon size="14">
        mdi-refresh
      </v-icon>
    </v-btn>
    <div style="width: 125px">
      <v-progress-linear
        :value="currentHeatPercent"
        height="11"
        class="mt-1"
        :color="`${heatColor}`"
        background-color="grey darken-2"
      >
        <div class="text-caption text-center">
          <small>
            {{ current }} / {{ max }}
          </small>
        </div>
      </v-progress-linear>
    </div>
    <v-btn x-small class="ml-1 mr-2" color="secondary" icon @click.stop="fireWeapon">
      <v-icon size="14" :disabled="current >= max">
        mdi-lightning-bolt
      </v-icon>
    </v-btn>
  </div>
</template>

<script>

export default {
  props: {
    current: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    vented: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    heatColor () {
      return `rgba(183, 28, 28, ${this.currentHeatPercent * 0.01})`
    },
    currentHeatPercent () {
      return Math.ceil((this.current * 100) / this.max)
    },
    thermalClips () {
      return this.$store.getters['character/equipment/thermalClips']
    },
    enforceThermalClips () {
      return this.$store.getters['character/character'].options.thermalClips
    }
  },
  methods: {
    fireWeapon () {
      this.$emit('add')
    },
    reloadWeapon () {
      this.$emit('reset')
      if (this.enforceThermalClips && this.thermalClips.equipped > 0 && this.current > 0 && !this.vented) {
        const newTh = { ...this.thermalClips.items.find(i => i.equippedAmount > 0) }
        newTh.equippedAmount = Math.max(0, newTh.equippedAmount - 1)
        newTh.uses = Math.max(0, newTh.uses - 1)
        this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: newTh.uuid, replacement: newTh })
      }
    }
  }
}
</script>
