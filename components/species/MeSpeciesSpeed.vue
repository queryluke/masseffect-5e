<template>
  <div>
    <span>
      {{ walking.text }} <me-distance :length="walking.speed" />.
    </span>
    <span
      v-for="(add, i) in additional"
      :key="i"
      class="pl-2"
    >
      {{ add.text }} <me-distance :length="add.speed" />.
    </span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    walking () {
      const walking = this.data.find(i => i.type === 'walk')
      return this.createText(walking)
    },
    hasAdditional () {
      return this.data.length > 1
    },
    additional () {
      return this.data.filter(i => i.type !== 'walk').map(i => this.createText(i))
    }
  },
  methods: {
    createText (object) {
      let text = ''
      if (object.color) {
        text = `${object.color} `
      }
      return {
        text: `${text}Your base ${object.type}ing speed is `,
        speed: object.speed
      }
    }
  }
}
</script>
