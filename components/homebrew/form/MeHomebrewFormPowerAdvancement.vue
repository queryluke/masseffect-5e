<template>
  <div>
    <v-text-field
      v-model="title"
      label="Advancement Name"
    />
    <me-homebrew-input-description :content="text" @update="text = $event" />
    <div class="text-subtitle-2">
      Mechanic Changes
    </div>
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="(mechanicLevel, index) in higherLevels" :key="`advOverrides-${index}`">
        <v-expansion-panel-header>
          {{ $t(`ordinal_numbers[${mechanicLevel}]`) }} level (advancement changes)
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <me-homebrew-form-power-mechanic-overrides :base-mechanics="baseMechanics[index]" :override-mechanics="mechanics[index]" @update="updateMechanics(index, $event)" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewFormPowerAdvancement',
  props: {
    advancement: {
      type: Object,
      required: true
    },
    baseMechanics: {
      type: Array,
      required: true
    },
    higherLevels: {
      type: Array,
      required: true
    }
  },
  computed: {
    title: {
      get () {
        return this.advancement.title
      },
      set (value) {
        const id = (value || '').replaceAll(/\W/g, '-')
        this.$emit('update', { ...this.advancement, title: value, id })
      }
    },
    text: {
      get () {
        return this.advancement.text
      },
      set (value) {
        this.$emit('update', { ...this.advancement, text: value })
      }
    },
    mechanics: {
      get () {
        return this.advancement.mechanics || []
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.advancement, mechanics: value }))
      }
    }
  },
  methods: {
    updateMechanics (index, value) {
      const newMechanics = this.mechanics.slice()
      newMechanics.splice(index, 1, value)
      this.mechanics = newMechanics
    }
  }
}
</script>
