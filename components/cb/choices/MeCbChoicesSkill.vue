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
  name: 'MeCbChoicesSkill',
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
      if (this.mechanic.newIf) {
        if (!this.currentValue.find(i => i.value === this.mechanic.newIf) && this.alreadyAcquired({ value: this.mechanic.newIf })) {
          return this.profOptions.filter(i => i.value !== this.mechanic.newIf)
        } else {
          return this.profOptions.filter(i => i.value === this.mechanic.newIf)
        }
      } else if (this.mechanic.limit) {
        // for expertise, if limit === acquired, only current profs
        if (this.expertise && this.mechanic.limit === 'acquired') {
          const acquired = this.$store.getters['character/profs/profs'].skill
          return this.profOptions.filter(i => acquired.includes(i.value))
        }
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
    alreadyAcquired (item) {
      if (this.expertise) {
        return this.$store.getters['character/skills/expertises'].includes(item.value)
      }
      return this.profs.skill.includes(item.value)
    },
    upsert (value) {
      this.$emit('upsert', value.map((i) => {
        return { value: i, ...this.appended }
      }))
    }
  }
}
</script>
