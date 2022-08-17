<template>
  <div />
</template>

<script>
export default {
  name: 'MeHomebrewInputPowerAdvancement',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    title: {
      get () {
        return this.item.title
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, title: value }))
      }
    },
    level: {
      get () {
        return this.item.level
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, level: value }))
      }
    },
    type: {
      get () {
        return this.item.type
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, type: value }))
      }
    },
    classes: {
      get () {
        return this.item.classes
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, classes: value }))
      }
    },
    advancements: {
      get () {
        return this.item.advancements
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, advancements: value }))
      }
    },
    mechanics: {
      get () {
        return this.item.mechanics
      },
      set (value) {
        this.$emit('update', Object.assign({}, { ...this.item, mechanics: value }))
      }
    }
  }
}
</script>
