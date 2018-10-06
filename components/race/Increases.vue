<template lang="pug">
  span {{ text }}
</template>

<script>
  export default {
    computed: {
      text () {
        return this.data.map(i => this.increase(i)).join(', ')
      }
    },
    props: ['data'],
    methods: {
      increase (data) {
        return `+${data.amount} ${data.ability}`
      }
    }
  }
</script>


