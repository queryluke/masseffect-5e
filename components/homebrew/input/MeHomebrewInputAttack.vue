<template>
  <div>
    <v-row>
      <v-col cols="12" md="2">
        <v-switch v-model="isAttack" label="Attack?" />
      </v-col>
      <v-col v-if="isAttack" cols="12" sm="4" md="3">
        <v-radio-group v-model="wpType" mandatory hide-details label="Attack Source">
          <v-radio label="Weapon" value="weapon" />
          <v-radio label="Power" value="power" />
        </v-radio-group>
      </v-col>
      <v-col v-if="isAttack" cols="12" sm="4" md="3">
        <v-radio-group v-model="attackType" mandatory hide-details label="Attack Type">
          <v-radio label="Melee" value="melee" />
          <v-radio label="Ranged" value="ranged" />
        </v-radio-group>
      </v-col>
      <v-col v-if="isAttack" cols="12" sm="4">
        <v-checkbox v-model="proficient" label="Proficient?" />
        <me-homebrew-input-ability :ability="mod" include-pc-mod label="Add Ability Mod to Attack Roll" @update="mod = $event" />
      </v-col>
      <v-col v-if="isAttack" cols="12">
        <me-homebrew-input-bonus :bonus="bonus" label="Additional Attack Bonus?" @update="bonus = $event" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewInputAttack',
  props: {
    attack: {
      type: [Object, Boolean],
      default: false
    },
    defaultWp: {
      type: String,
      default: 'weapon'
    }
  },
  computed: {
    isAttack: {
      get () {
        return !!this.attack
      },
      set (value) {
        const baseAttack = value ? { type: 'melee', wp: this.defaultWp, proficient: false, mod: false, bonus: false } : false
        this.$emit('update', baseAttack)
      }
    },
    attackType: {
      get () {
        return this.attack?.type
      },
      set (value) {
        this.$emit('update', { ...this.attack, type: value })
      }
    },
    wpType: {
      get () {
        return this.attack?.wp
      },
      set (value) {
        this.$emit('update', { ...this.attack, wp: value })
      }
    },
    proficient: {
      get () {
        return this.attack?.proficient
      },
      set (value) {
        this.$emit('update', { ...this.attack, proficient: value })
      }
    },
    mod: {
      get () {
        return this.attack?.mod
      },
      set (value) {
        this.$emit('update', { ...this.attack, mod: value })
      }
    },
    bonus: {
      get () {
        return this.attack?.bonus
      },
      set (value) {
        this.$emit('update', { ...this.attack, bonus: value })
      }
    }
  }
}
</script>
