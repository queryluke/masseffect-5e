<template>
  <v-card-text>
    <v-row>
      <!-- CASTING TIME -->
      <v-col cols="12">
        <me-homebrew-input-legend id="cast">
          Casting Time
        </me-homebrew-input-legend>
      </v-col>
      <v-col cols="12">
        <me-homebrew-input-casting-times :casting-time="mechanics.castingTime" :alt-casting="mechanics.altCasting" @update="update($event)" />
      </v-col>

      <!-- DURATION -->
      <v-col cols="12">
        <me-homebrew-input-legend id="duration">
          Duration
        </me-homebrew-input-legend>
      </v-col>
      <v-col cols="12" sm="8">
        <me-homebrew-input-duration :duration="duration" @update="duration = $event" />
      </v-col>
      <v-col cols="12" sm="4">
        <v-checkbox v-if="duration && duration.unit !== 'instant'" v-model="concentration" label="Concentration?" />
      </v-col>

      <!-- RANGE -->
      <v-col cols="12">
        <me-homebrew-input-legend id="range">
          Range
        </me-homebrew-input-legend>
      </v-col>
      <v-col cols="12">
        <me-homebrew-input-range ignore-long :range="range" @update="range = $event" />
      </v-col>

      <!-- CONDITIONS -->
      <v-col cols="12">
        <me-homebrew-input-legend id="conditions">
          Conditions
        </me-homebrew-input-legend>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select v-model="primes" :items="primers" label="Primes?" filled dense />
      </v-col>
      <v-col cols="12" sm="6">
        <v-checkbox v-model="detonates" label="Detonates?" />
      </v-col>
      <v-col cols="12" sm="6">
        <me-homebrew-input-conditions multiple :selected-conditions="conditions" @update="conditions = $event" />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
export default {
  name: 'MeHomebrewFormPowerBaseMechanics',
  props: {
    mechanics: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      primers: [
        { value: false, text: 'None' },
        { value: 'cold', text: 'Cold' },
        { value: 'fire', text: 'Fire' },
        { value: 'force', text: 'Force' },
        { value: 'lightning', text: 'Lightning' },
        { value: 'necrotic', text: 'Necrotic' }
      ]
    }
  },
  computed: {
    duration: {
      get () {
        return this.mechanics.duration
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.mechanics, duration: value }))
      }
    },
    concentration: {
      get () {
        return this.mechanics.concentration
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.mechanics, concentration: value }))
      }
    },
    range: {
      get () {
        return this.mechanics.range
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.mechanics, range: value }))
      }
    },
    conditions: {
      get () {
        return this.mechanics.conditions
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.mechanics, conditions: value }))
      }
    },
    detonates: {
      get () {
        return this.mechanics.detonates
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.mechanics, detonates: value }))
      }
    },
    primes: {
      get () {
        return this.mechanics.primes
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.mechanics, primes: value }))
      }
    }
  },
  methods: {
    update (data) {
      this.$emit('update', Object.assign({}, { ...this.mechanics, ...data }))
    }
  }
}
</script>
