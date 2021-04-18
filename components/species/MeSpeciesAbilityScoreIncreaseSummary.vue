<template>
  <span>{{ text }}</span>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    text () {
      if (this.data.length === 6 && this.data.filter(i => i.amount === 1).length === 6) {
        return '+1 to all ability scores'
      }
      return this.data.map(i => this.increase(i)).join(', ')
    }
  },
  methods: {
    increase (data) {
      return `+${data.amount} ${this.$store.getters['config/abilityName'](data.ability)}`
    }
  }
}
</script>
