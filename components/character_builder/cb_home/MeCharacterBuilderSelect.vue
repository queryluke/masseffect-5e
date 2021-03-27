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
        return this.$store.getters['cb/characters'][this.$route.query.cid].character[this.attr]
      },
      set (value) {
        console.log(this.$route.query.cid)
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.$route.query.cid, attr: this.attr, value })
      }
    }
  }
}
</script>
