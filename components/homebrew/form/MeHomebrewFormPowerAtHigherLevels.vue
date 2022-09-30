<template>
  <v-card-text>
    <div v-for="(hLevel, index) in higherLevels" :key="`higher-level-${hLevel}`">
      <me-homebrew-input-legend id="cast">
        At {{ $t(`ordinal_numbers[${hLevel}]`) }} level
      </me-homebrew-input-legend>
      <me-homebrew-form-power-higher-level :previous-levels="mechanics.slice(0, index + 1)" :mechanics="mechanics[index + 1]" @update="update(index + 1, $event)" />
    </div>
  </v-card-text>
</template>

<script>
export default {
  name: 'MeHomebrewFormPowerAtHigherLevels',
  props: {
    level: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      required: true
    },
    mechanics: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    higherLevels () {
      if (this.level === 0) {
        return [5, 11, 17]
      } else {
        const max = this.type === 'tech' ? 7 : 6
        return [...Array(max - (this.level + 1)).keys()].map(i => i + this.level + 1)
      }
    }
  },
  methods: {
    update (index, value) {
      const newMechanics = this.mechanics.slice()
      newMechanics.splice(index, 1, value)
      this.$emit('update', newMechanics)
    }
  }
}
</script>
