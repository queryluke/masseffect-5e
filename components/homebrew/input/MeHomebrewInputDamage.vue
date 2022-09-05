<template>
  <v-row>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        v-model="dieCount"
        type="number"
        min="1"
        label="Die Count"
        hide-details
        filled
        dense
      />
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <me-homebrew-input-die-type :die-type="dieType" @update="dieType = $event" />
    </v-col>
    <v-col cols="12" sm="4" md="3">
      <me-homebrew-input-damage-types :selected="type" @update="type = $event" />
    </v-col>
    <v-col cols="12" sm="4" md="3">
      <me-homebrew-input-ability :ability="mod" include-pc-mod label="+ Ability Mod" @update="mod = $event" />
    </v-col>
    <v-col cols="12" class="mt-n10">
      <me-homebrew-input-bonus :bonus="bonus" @update="bonus = $event" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MeHomebrewInputDamage',
  props: {
    damage: {
      type: Object,
      required: true
    }
  },
  computed: {
    dieCount: {
      get () {
        return this.damage.dieCount
      },
      set (value) {
        const parsed = parseInt(value)
        if (parsed) {
          this.$emit('update', { ...this.damage, dieCount: parsed })
        }
      }
    },
    dieType: {
      get () {
        return this.damage.dieType
      },
      set (value) {
        this.$emit('update', { ...this.damage, dieType: value })
      }
    },
    mod: {
      get () {
        return this.damage.mod
      },
      set (value) {
        this.$emit('update', { ...this.damage, mod: value })
      }
    },
    type: {
      get () {
        return this.damage.type
      },
      set (value) {
        this.$emit('update', { ...this.damage, type: value })
      }
    },
    bonus: {
      get () {
        return this.damage.bonus
      },
      set (value) {
        this.$emit('update', { ...this.damage, bonus: value })
      }
    }
  }
}
</script>
