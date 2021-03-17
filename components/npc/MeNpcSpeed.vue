<template>
  <span>
    {{ type }} <me-distance :length="speed.range" abbr /><span v-if="!last">, </span>
  </span>
</template>

<script>
export default {
  name: 'MeNpcSpeed',
  props: {
    speed: {
      type: Object,
      default: () => {
        return {
          type: 'walk',
          range: 30,
        }
      }
    },
    last: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    type () {
      return this.speed.type === 'walk' ? '' : this.speed.type
    }
  }
}
</script>
