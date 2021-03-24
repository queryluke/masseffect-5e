<template>
  <v-select
    v-model="model"
    :label="label"
    :items="items"
    item-text="name"
    return-object
  />
</template>

<script>
export default {
  props: {
    attr: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    model: {
      get () {
        return this.$store.getters['cb/character'][this.attr]
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTER', { attr: this.attr, value })
      }
    }
  }
}
</script>
