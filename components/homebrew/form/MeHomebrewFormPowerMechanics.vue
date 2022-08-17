<template>
  <v-card outlined flat>
    <v-tabs v-model="tab">
      <v-tab>Base Mechanics</v-tab>
      <v-tab>Attack</v-tab>
      <v-tab>DC</v-tab>
      <v-tab>Damage</v-tab>
      <v-tab>Limited Uses</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card-text>
          <v-row>
            <!-- CASTING TIME -->
            <v-col cols="12">
              <me-homebrew-input-legend>Casting Time</me-homebrew-input-legend>
            </v-col>
            <v-col cols="12">
              <me-homebrew-input-casting-times :casting-time="mechanics.castingTime" :alt-casting="mechanics.altCasting" @update="update($event)" />
            </v-col>

            <!-- DURATION -->
            <v-col cols="12">
              <me-homebrew-input-legend>Duration</me-homebrew-input-legend>
            </v-col>
            <v-col cols="12" sm="6">
              <me-homebrew-input-durations :selected-duration="duration" @update="duration = $event" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-checkbox v-model="concentration" label="Concentration?" />
            </v-col>

            <!-- RANGE -->
            <v-col cols="12">
              <me-homebrew-input-legend>Range</me-homebrew-input-legend>
            </v-col>
            <v-col cols="12">
              <me-homebrew-input-range ignore-long :range="range" @update="range = $event" />
            </v-col>

            <!-- CONDITIONS -->
            <v-col cols="12">
              <me-homebrew-input-legend>Conditions</me-homebrew-input-legend>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select v-model="primes" :items="primers" label="Primes?" />
            </v-col>
            <v-col cols="12" sm="4">
              <v-checkbox v-model="detonates" label="Detonates?" />
            </v-col>
            <v-col cols="12" sm="4">
              <me-homebrew-input-conditions multiple :selected-conditions="conditions" @update="conditions = $event" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <me-homebrew-input-attack :attack="mechanics.attack" default-wp="power" @update="attack = $event" />
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <me-homebrew-input-dc :dc="mechanics.dc" @update="dc = $event" />
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <me-homebrew-input-damages :damages="mechanics.damage" @update="damage = $event" />
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <me-homebrew-input-resource :resource="resource" castable :excluded-display-types="['gear-consumable', 'hit-dice', 'omni-gel', 'barrier-ticks']" @update="resource = $event">
            <template #resourceMaxDescription>
              <div>
                # of Uses or Resource Amount
              </div>
              <div class="text-caption">
                Most powers (especially combat powers) do not require anything beyond the a simple flat number of uses per short/long rest.
                However, it is possible to set up resources of other types of powers. For example, the hex shield and biotic sphere have hit points
                which you can define as a "resource" with a custom label "Hit Points". You <em>can</em> use the other types of calculated bonuses
                like proficiency bonus, ability mods, level, etc to customize the # of uses. However, this is rare for powers.
              </div>
            </template>
          </me-homebrew-input-resource>
        </v-card-text>
      </v-tab-item>
      <v-card-text />
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  name: 'MeHomebrewFormPowers',
  props: {
    mechanics: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      tab: 0,
      castingTimes: [
        { value: 'action', text: 'Action' },
        { value: 'attack', text: 'Attack' },
        { value: 'bonus_action', text: 'Bonus Action' },
        { value: 'reaction', text: 'Reaction' }
      ],
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
    attack: {
      get () {
        return this.mechanics.attack || false
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.mechanics, attack: value }))
      }
    },
    dc: {
      get () {
        return this.mechanics.dc || false
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.mechanics, dc: value }))
      }
    },
    damage: {
      get () {
        return this.mechanics.damage
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.mechanics, damage: value }))
      }
    },
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
    },
    resource: {
      get () {
        return this.mechanics.resource
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.mechanics, resource: value }))
      }
    }
  },
  methods: {
    update (data) {
      this.$emit('update', Object.assign({}, { ...this.mechanics, ...data }))
    },
    addOverride () {
      this.$emit('update', Object.assign({}, { ...this.baseMechanics || {} }))
    }
  }
}
</script>
