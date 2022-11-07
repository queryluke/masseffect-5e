<template>
  <div>
    <v-row>
      <v-col v-if="addable" cols="12">
        <v-select v-model="addTo" :items="addToOptions" persistent-hint :hint="addToHint" label="Append or Add damage?" />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          v-model="dieCount"
          label="Die Count"
          hide-details
          filled
          dense
          append-icon="mdi-function-variant"
          @click:append.stop="showDialog = true"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <me-homebrew-input-die-type :die-type="dieType" :include-custom="allowCustomDieType" @update="dieType = $event" />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <me-homebrew-input-damage-types :selected="type" @update="type = $event" />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <me-homebrew-input-ability
          :ability="mod"
          include-pc-mod
          label="+ Ability Mod"
          :disabled="preventAbilityModOverride"
          @update="mod = $event"
        />
      </v-col>
      <v-col cols="12" class="mt-n10">
        <me-homebrew-input-bonus :bonus="bonus" @update="bonus = $event" />
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" max-width="700">
      <v-card>
        <v-card-title>
          Base Die Type on a Character Stat
        </v-card-title>
        <v-card-text>
          <me-homebrew-input-bonus label="Die Type Selection" always-on :bonus="customDieCount" @update="customDieCount = $event" />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="showDialog = false">
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn text color="primary" @click="setCustomDieCount">
            Set
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewInputDamage',
  props: {
    damage: {
      type: Object,
      required: true
    },
    allowCustomDieType: {
      type: Boolean,
      default: false
    },
    addable: {
      type: Boolean,
      default: false
    },
    preventAbilityModOverride: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      addToOptions: [
        { text: 'Append', hint: 'This damage is independent of other damage (e.g. versatile 1-handed vs 2-handed damage)', value: false },
        { text: '+Base', hint: 'This damage will be added to the base damage (i.e., Damage #1)', value: 'base' },
        { text: '+All', hint: 'This damage will added to all damages (Damage #1 and any appended damages', value: 'all' }
      ],
      showDialog: false,
      customDieCount: {
        type: 'flat',
        value: 4
      }
    }
  },
  computed: {
    dieCount: {
      get () {
        return typeof this.damage.dieCount === 'object' ? 'X' : this.damage.dieCount
      },
      set (value) {
        const parsed = typeof value === 'object' ? value : parseInt(value)
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
    },
    addTo: {
      get () {
        return this.damage.addTo
      },
      set (value) {
        this.$emit('update', { ...this.damage, addTo: value })
      }
    },
    addToHint () {
      return (this.addToOptions.find(i => i.value === this.addTo) || { hint: '' }).hint
    }
  },
  created () {
    if (this.dieCount === 'X') {
      this.customDieCount = this.damage.dieCount
    }
  },
  methods: {
    setCustomDieCount () {
      this.dieCount = this.customDieCount
      this.showDialog = false
    }
  }
}
</script>
