<template>
  <v-card-text>
    <v-text-field
      v-model="cachedName"
      label="Advancement Name"
      filled
      dense
      @blur="updateName"
    />
    <me-homebrew-input-description :content="cachedText" @update="cachedText = $event" @blur="updateText" />
    <me-homebrew-input-sub-legend class="mt-6">
      Mechanic Changes
    </me-homebrew-input-sub-legend>
    {{ levels }}
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="(mechanicLevel, index) in levels" :key="`advOverrides-${index}`">
        <v-expansion-panel-header>
          {{ $t(`ordinal_numbers[${mechanicLevel}]`) }} level (advancement changes)
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <me-homebrew-form-power-higher-level :previous-levels="mechanics.slice(0, index)" :mechanics="advMechanics[index]" @update="updateMechanics(index, $event)" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card-text>
</template>

<script>
export default {
  name: 'MeHomebrewFormPowerAdvancement',
  props: {
    advancement: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      required: true
    },
    mechanics: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      cachedName: null,
      cachedText: null
    }
  },
  computed: {
    name: {
      get () {
        return this.advancement.name
      },
      set (value) {
        const id = (value || '').replaceAll(/\W/g, '-')
        this.$emit('update', { ...this.advancement, name: value, id })
      }
    },
    text: {
      get () {
        console.log(this.advancement.text)
        return this.advancement.text
      },
      set (value) {
        this.$emit('update', { ...this.advancement, text: value })
      }
    },
    advMechanics: {
      get () {
        return this.advancement.mechanics || []
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.advancement, mechanics: value }))
      }
    },
    levels () {
      if (this.level === 0) {
        return [1, 5, 11, 17]
      } else {
        const max = this.type === 'tech' ? 7 : 6
        return [...Array(max - this.level).keys()].map(i => i + this.level)
      }
    }
  },
  watch: {
    active (newVal) {
      if (newVal) {
        this.cachedName = this.name
        this.cacheText = this.text
      } else {
        this.name = this.cachedName
        this.text = this.cachedText
      }
    }
  },
  created () {
    this.cachedName = this.name
    this.cacheText = this.text
  },
  methods: {
    updateName () {
      this.name = this.cachedName
    },
    updateText () {
      this.text = this.cachedText
    },
    updateMechanics (index, value) {
      const newMechanics = this.advMechanics.slice()
      newMechanics.splice(index, 1, value)
      this.advMechanics = newMechanics
    }
  }
}
</script>
