<template>
  <div>
    <div class="text-subtitle">
      Weapon Proficiency
    </div>
    <me-cb-choices-v-select
      :items="items"
      :label="label"
      :total-selections="selections"
      :value="currentValue.map(i => i.value)"
      :acquired="alreadyAcquired"
      @change="upsert"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/profs')
export default {
  props: {
    mechanic: {
      type: Object,
      required: true
    },
    currentValue: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(['profs']),
    selections () {
      return this.mechanic.selections || 1
    },
    label () {
      return `Choose ${this.$tc(`string_numbers[${this.selections}]`)}...`
    },
    profOptions () {
      return this.$i18n.messages.en.weapon_types.map((i) => {
        return {
          text: this.$tc(`weapon_types.${i}`, 2),
          value: i
        }
      })
    },
    items () {
      if (this.mechanic.limit) {
        return this.profOptions.filter(i => this.mechanic.limit.includes(i.value))
      } else {
        return this.profOptions
      }
    },
    appended () {
      return {
        type: 'weapon'
      }
    }
  },
  methods: {
    alreadyAcquired (value) {
      return this.profs.weapon.includes(value)
    },
    upsert (value) {
      this.$emit('upsert', value.map((i) => {
        return { value: i, ...this.appended }
      }))
    }
  }
}
</script>
