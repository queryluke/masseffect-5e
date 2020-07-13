<template>
  <v-dialog v-model="showSortDialog">
    <v-card>
      <v-card-text>
        <slot name="sortables" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MeMobileSort',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    showSortDialog: {
      get () {
        return this.$store.getters['listPage/showSortDialog']
      },
      set (value) {
        return this.$store.commit('listPage/TOGGLE_SORT_DIALOG', value)
      }
    }
  }
}
</script>
