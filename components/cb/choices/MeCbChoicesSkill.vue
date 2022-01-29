<template>
  <div>
    <div v-if="!noLabel" class="text-subtitle">
      {{ expertise ? 'Skill Expertise' : 'Skill Proficiency' }}
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
    },
    expertise: {
      type: Boolean,
      default: false
    },
    noLabel: {
      type: Boolean,
      default: false
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
      return this.$store.getters.getData('skills').map((i) => {
        return {
          text: i.name,
          value: i.id
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
        type: 'skill',
        expertise: this.expertise
      }
    }
  },
  methods: {
    alreadyAcquired (value) {
      return this.profs.skill.includes(value)
    },
    upsert (value) {
      this.$emit('upsert', value.map((i) => {
        return { value: i, ...this.appended }
      }))
    }
  }
}
</script>
