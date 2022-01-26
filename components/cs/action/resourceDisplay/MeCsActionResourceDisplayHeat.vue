<template>
  <div class="d-flex align-start justify-center justify-md-start">
    <v-btn x-small class="mr-1" color="primary" icon @click="reloadWeapon">
      <v-icon size="18">
        mdi-refresh
      </v-icon>
    </v-btn>
    <div style="width: 200px">
      <v-progress-linear
        :value="currentHeatPercent"
        height="6"
        class="mt-1"
        :color="`${heatColor}`"
        background-color="grey darken-2"
      />
      <div class="text-caption text-center mt-n1">
        <small>
          {{ current }} / {{ max }}
        </small>
      </div>
    </div>
    <v-btn x-small class="ml-1 mr-2" color="secondary" icon @click="fireWeapon">
      <v-icon size="18" :disabled="current >= max">
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
  data () {
    return {
      heatColors: [
        'indigo darken-4',
        'blue darken-4',
        'cyan darken-3',
        'green',
        'light-green',
        'lime',
        'amber accent-4',
        'orange darken-1',
        'deep-orange darken-1',
        'red darken-4'
      ]
    }
  },
  computed: {
    heatColor () {
      return this.heatColors[Math.ceil(this.currentHeatPercent / 10) - 1]
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
