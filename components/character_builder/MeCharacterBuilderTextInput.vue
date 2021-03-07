<template>
  <v-text-field
    v-model="model"
    :label="label"
    :class="className"
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
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    model: {
      get () {
        return this.$store.getters['user/character'][this.attr]
      },
      set (value) {
        return this.$store.commit('user/UPDATE_CHARACTER', { attr: this.attr, value })
      }
    }
  }
}
</script>
