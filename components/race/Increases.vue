<template lang="pug">
  span {{ text }}
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => { return [] }
    }
  },
  computed: {
    text () {
      return this.data.map(i => this.increase(i)).join(', ')
    }
  },
  methods: {
    increase (data) {
      return `+${data.amount} ${data.ability}`
    }
  }
}
</script>
