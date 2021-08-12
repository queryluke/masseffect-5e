<template>
  <div>
    <div class="text-subtitle-2">
      {{ $t(`abilities.${ability}.title`) }}
    </div>
    <div class="d-flex justify-space-around">
      <div>
        <v-text-field
          v-model="otherValue"
          label="Bonus"
          outlined
          clearable
          dense
          hide-details
        />
      </div>
      <div>
        <v-text-field
          v-model="overrideValue"
          label="Override"
          outlined
          clearable
          dense
          hide-details
        />
      </div>
    </div>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    ability: {
      type: String,
      required: true
    }
  },
  computed: {
    otherValue: {
      get () {
        return this.getAbsOther(this.ability)
      },
      set (value) {
        this.setAbsOther({ ability: this.ability, value })
      }
    },
    overrideValue: {
      get () {
        return this.getAbsOverride(this.ability)
      },
      set (value) {
        this.setAbsOverride({ ability: this.ability, value })
      }
    }
  }
}
</script>
