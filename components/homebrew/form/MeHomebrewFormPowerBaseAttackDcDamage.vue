<template>
  <v-card-text>
    <v-row>
      <!-- ATTACK -->
      <v-col cols="12">
        <me-homebrew-input-legend id="attack">
          Attack
        </me-homebrew-input-legend>
      </v-col>
      <v-col cols="12">
        <me-homebrew-input-attack :attack="mechanics.attack" default-wp="power" @update="attack = $event" />
      </v-col>

      <!-- DC -->
      <v-col cols="12">
        <me-homebrew-input-legend id="dc">
          DC
        </me-homebrew-input-legend>
      </v-col>
      <v-col cols="12">
        <me-homebrew-input-dc :dc="mechanics.dc" @update="dc = $event" />
      </v-col>

      <!-- DAMAGE -->
      <v-col cols="12">
        <me-homebrew-input-legend id="damage">
          Damage
        </me-homebrew-input-legend>
      </v-col>
      <v-col cols="12">
        <me-homebrew-input-damages :damages="mechanics.damage" @update="damage = $event" />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
export default {
  name: 'MeHomebrewFormPowerBaseAttackDcDamage',
  props: {
    mechanics: {
      type: Object,
      default: () => {}
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
    }
  },
  methods: {
    update (data) {
      this.$emit('update', Object.assign({}, { ...this.mechanics, ...data }))
    }
  }
}
</script>
