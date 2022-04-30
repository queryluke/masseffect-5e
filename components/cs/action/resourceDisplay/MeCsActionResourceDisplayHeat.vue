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
    }
  },
  computed: {
    heatColor () {
      return `rgba(183, 28, 28, ${this.currentHeatPercent * 0.01})`
    },
    currentHeatPercent () {
      return Math.ceil((this.current * 100) / this.max)
    }
  },
  methods: {
    fireWeapon () {
      this.$emit('add')
    },
    reloadWeapon () {
      this.$emit('reset')
    }
  }
}
</script>
