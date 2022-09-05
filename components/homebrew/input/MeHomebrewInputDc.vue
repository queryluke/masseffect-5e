<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-switch v-model="isDc" label="DC?" />
      </v-col>
      <v-col v-if="isDc" cols="12" sm="6">
        <me-homebrew-input-ability :ability="save" label="Save" exclude-none @update="save = $event" />
      </v-col>
    </v-row>
    <v-row v-if="isDc">
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="base"
          type="number"
          min="0"
          label="Base"
          hide-details
          filled
          dense
        />
      </v-col>
      <v-col cols="12" sm="4">
        <me-homebrew-input-ability :ability="mod" include-pc-mod label="Add Ability Mod to DC" @update="mod = $event" />
      </v-col>
      <v-col cols="12" sm="4">
        <v-checkbox v-model="proficient" label="Add Prof Bonus?" dense />
      </v-col>
      <v-col cols="12">
        <me-homebrew-input-bonus :bonus="bonus" label="Additional DC Bonus?" @update="bonus = $event" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewInputDc',
  props: {
    dc: {
      type: [Object, Boolean],
      default: false
    }
  },
  computed: {
    isDc: {
      get () {
        return !!this.dc
      },
      set (value) {
        const baseDc = value ? { base: 8, proficient: true, mod: false, bonus: false, save: 'str' } : false
        this.$emit('update', baseDc)
      }
    },
    base: {
      get () {
        return this.dc?.base
      },
      set (value) {
        const parsed = parseInt(value)
        if (parsed) {
          this.$emit('update', { ...this.dc, base: parsed })
        }
      }
    },
    proficient: {
      get () {
        return this.dc?.proficient
      },
      set (value) {
        this.$emit('update', { ...this.dc, proficient: value })
      }
    },
    mod: {
      get () {
        return this.dc?.mod
      },
      set (value) {
        this.$emit('update', { ...this.dc, mod: value })
      }
    },
    save: {
      get () {
        return this.dc?.save
      },
      set (value) {
        this.$emit('update', { ...this.dc, save: value })
      }
    },
    bonus: {
      get () {
        return this.dc?.bonus
      },
      set (value) {
        this.$emit('update', { ...this.dc, bonus: value })
      }
    }
  }
}
</script>
