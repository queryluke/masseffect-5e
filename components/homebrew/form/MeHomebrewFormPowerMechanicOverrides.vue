<template>
  <v-card outlined flat>
    <v-tabs v-model="tab">
      <v-tab>
        <v-badge dot color="secondary" :value="overrides['castingTime'] || overrides['duration'] || overrides['primes'] || overrides['range']">
          Base Mechanics
        </v-badge>
      </v-tab>
      <v-tab>
        <v-badge dot color="secondary" :value="overrides['attack']">
          Attack
        </v-badge>
      </v-tab>
      <v-tab>
        <v-badge dot color="secondary" :value="overrides['dc']">
          DC
        </v-badge>
      </v-tab>
      <v-tab>
        <v-badge dot color="secondary" :value="overrides['damage']">
          Damage
        </v-badge>
      </v-tab>
      <v-tab>
        <v-badge dot color="secondary" :value="overrides['resource']">
          Uses / Pool
        </v-badge>
      </v-tab>
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
              <me-homebrew-input-add-override-btn :overridden="overrides['castingTime']" @override="addOverride(['castingTime', 'altCasting'])" @reset="removeOverride(['castingTime', 'altCasting'])">
                Change Casting Time
              </me-homebrew-input-add-override-btn>
              <me-homebrew-input-casting-times v-if="overrides['castingTime']" :casting-time="overrideMechanics.castingTime" :alt-casting="overrideMechanics.altCasting" @update="update($event)" />
            </v-col>

            <!-- DURATION -->
            <v-col cols="12">
              <me-homebrew-input-legend>Duration</me-homebrew-input-legend>
            </v-col>
            <v-col cols="12" sm="6">
              <me-homebrew-input-add-override-btn :overridden="overrides['duration']" @override="addOverride(['duration', 'concentration'])" @reset="removeOverride(['duration', 'concentration'])">
                Change Duration
              </me-homebrew-input-add-override-btn>
              <me-homebrew-input-durations v-if="overrides['duration']" :selected-duration="duration" @update="duration = $event" />
            </v-col>
            <v-col v-if="overrides['duration']" cols="12" sm="6">
              <v-checkbox v-model="concentration" label="Concentration?" />
            </v-col>

            <!-- RANGE -->
            <v-col cols="12">
              <me-homebrew-input-legend>Range</me-homebrew-input-legend>
            </v-col>
            <v-col cols="12">
              <me-homebrew-input-add-override-btn :overridden="overrides['range']" @override="addOverride(['range'])" @reset="removeOverride(['range'])">
                Change Range
              </me-homebrew-input-add-override-btn>
              <me-homebrew-input-range v-if="overrides['range']" ignore-long :range="range" @update="range = $event" />
            </v-col>

            <!-- CONDITIONS -->
            <v-col cols="12">
              <me-homebrew-input-legend>Conditions</me-homebrew-input-legend>
            </v-col>
            <v-col cols="12" sm="4">
              <me-homebrew-input-add-override-btn :overridden="overrides['primes']" @override="addOverride(['conditions', 'primes', 'detonates'])" @reset="removeOverride(['conditions', 'primes', 'detonates'])">
                Change Duration
              </me-homebrew-input-add-override-btn>
              <v-select v-if="overrides['primes']" v-model="primes" :items="primers" label="Primes?" />
            </v-col>
            <v-col cols="12" sm="4">
              <v-checkbox v-if="overrides['detonates']" v-model="detonates" label="Detonates?" />
            </v-col>
            <v-col cols="12" sm="4">
              <me-homebrew-input-conditions v-if="overrides['conditions'] " multiple :selected-conditions="conditions" @update="conditions = $event" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <me-homebrew-input-add-override-btn :overridden="overrides['attack']" @override="addOverride(['attack'])" @reset="removeOverride(['attack'])">
            Change Attack
          </me-homebrew-input-add-override-btn>
          <me-homebrew-input-attack v-if="overrides['attack']" :attack="attack" default-wp="power" @update="attack = $event" />
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <me-homebrew-input-add-override-btn :overridden="overrides['dc']" @override="addOverride(['dc'])" @reset="removeOverride(['dc'])">
            Change DC
          </me-homebrew-input-add-override-btn>
          <me-homebrew-input-dc v-if="overrides['dc']" :dc="dc" @update="dc = $event" />
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <me-homebrew-input-add-override-btn :overridden="overrides['damage']" @override="addOverride(['damage'])" @reset="removeOverride(['damage'])">
            Change Damage
          </me-homebrew-input-add-override-btn>
          <me-homebrew-input-damages v-if="overrides['damage']" :damages="damage" @update="damage = $event" />
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <me-homebrew-input-add-override-btn :overridden="overrides['resource']" @override="addOverride(['resource'])" @reset="removeOverride(['resource'])">
            Change Limited Use
          </me-homebrew-input-add-override-btn>
          <me-homebrew-input-resource v-if="overrides['resource']" :resource="resource" castable :excluded-display-types="['gear-consumable', 'hit-dice', 'omni-gel', 'barrier-ticks']" @update="resource = $event">
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
    overrideMechanics: {
      type: Object,
      default: () => {
        return {}
      }
    },
    baseMechanics: {
      type: Object,
      default: () => {}
    },
    isBase: {
      type: Boolean,
      default: false
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
    overrides () {
      const overrides = {}
      for (const key of ['attack', 'dc', 'castingTime', 'damage', 'concentration', 'range', 'conditions', 'detonates', 'primes', 'resource', 'duration']) {
        overrides[key] = typeof this.overrideMechanics[key] !== 'undefined'
      }
      return overrides
    },
    attack: {
      get () {
        return this.overrideMechanics?.attack || false
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.overrideMechanics, attack: value }))
      }
    },
    dc: {
      get () {
        return this.overrideMechanics?.dc || false
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.overrideMechanics, dc: value }))
      }
    },
    damage: {
      get () {
        return this.overrideMechanics?.damage || undefined
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.overrideMechanics, damage: value }))
      }
    },
    duration: {
      get () {
        return this.overrideMechanics?.duration || undefined
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.overrideMechanics, duration: value }))
      }
    },
    concentration: {
      get () {
        return this.overrideMechanics?.concentration || undefined
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.overrideMechanics, concentration: value }))
      }
    },
    range: {
      get () {
        return this.overrideMechanics?.range || undefined
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.overrideMechanics, range: value }))
      }
    },
    conditions: {
      get () {
        return this.overrideMechanics?.conditions || undefined
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.overrideMechanics, conditions: value }))
      }
    },
    detonates: {
      get () {
        return this.overrideMechanics?.detonates || undefined
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.overrideMechanics, detonates: value }))
      }
    },
    primes: {
      get () {
        return this.overrideMechanics?.primes || undefined
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.overrideMechanics, primes: value }))
      }
    },
    resource: {
      get () {
        return this.overrideMechanics?.resource || undefined
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.overrideMechanics, resource: value }))
      }
    }
  },
  methods: {
    update (data) {
      this.$emit('update', Object.assign({}, { ...this.overrideMechanics, ...data }))
    },
    addOverride (keys) {
      const newMechanics = { ...this.overrideMechanics }
      for (const key of keys) {
        if (typeof this.overrideMechanics[key] !== 'undefined') {
          continue
        }
        newMechanics[key] = this.baseMechanics[key] || null
      }
      this.$emit('update', Object.assign({}, newMechanics))
    },
    removeOverride (keys) {
      const newMechanics = { ...this.overrideMechanics }
      for (const key of keys) {
        if (typeof this.overrideMechanics[key] !== 'undefined') {
          delete newMechanics[key]
        }
      }
      this.$emit('update', Object.assign({}, newMechanics))
    }
  }
}
</script>
