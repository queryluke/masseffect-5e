<template>
  <v-sheet>
    <v-text-field v-model="name" />
  </v-sheet>
</template>

<script>
export default {
  computed: {
    name: {
      get () {
        return this.getValue('name')
      },
      set (value) {
        this.setValue('name', value)
      }
    }

  },
  methods: {
    setValue (attr, value) {
      this.$store.dispatch('npcs/SET_VALUE', { id, attr, value })
    },
    getValue (attr) {
      this.$store.getters['npcs/npc'][attr]
    }
  }
}
</script>
