<template>
  <div>
    <v-card v-for="(damage, index) of damages" :key="`damage-${index}`" shaped outlined class="pa-2 my-2">
      <div class="d-flex justify-space-between">
        <div class="text-caption mb-2">
          Damage #{{ index + 1 }}
        </div>
        <v-btn v-if="!preventDeleteZeroIndex && index === 0" icon small color="error" @click="removeDamage(index)">
          <v-icon small>
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
      <me-homebrew-input-damage
        :damage="damage"
        :addable="index > 0"
        :allow-custom-die-type="allowCustomDieType"
        :prevent-ability-mod-override="preventAbilityModOverride"
        @update="updateDamage(index, $event)"
      />
    </v-card>
    <div class="text-center">
      <v-btn color="primary" @click="addDamage">
        Add Damage
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewInputDamages',
  props: {
    damages: {
      type: [Boolean, Array],
      default: false
    },
    allowCustomDieType: {
      type: Boolean,
      default: false
    },
    preventAbilityModOverride: {
      type: [String, Boolean],
      default: false
    },
    preventDeleteZeroIndex: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultDamage: {
        dieCount: 1,
        dieType: 4,
        mod: false,
        type: 'piercing',
        bonus: false
      }
    }
  },
  computed: {
    damagesArray: {
      get () {
        return this.damages || []
      },
      set (value) {
        this.$emit('update', value)
      }
    }
  },
  methods: {
    addDamage () {
      const newDamages = this.damagesArray.slice()
      newDamages.push({ ...this.defaultDamage })
      this.damagesArray = newDamages
    },
    removeDamage (index) {
      const newDamages = this.damagesArray.slice()
      newDamages.splice(index, 1)
      if (newDamages.length === 0) {
        this.damagesArray = false
      } else {
        this.damagesArray = newDamages
      }
    },
    updateDamage (index, value) {
      const newDamages = this.damagesArray.slice()
      newDamages.splice(index, 1, value)
      this.damagesArray = newDamages
    }
  }
}
</script>
