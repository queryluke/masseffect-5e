<template>
  <v-dialog
    v-model="showFilterDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon @click.native="showFilterDialog = !showFilterDialog">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <slot name="filters" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MeMobileFilters',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    showFilterDialog: {
      get () {
        return this.$store.getters['listPage/showFilterDialog']
      },
      set (value) {
        return this.$store.commit('listPage/TOGGLE_FILTER_DIALOG', value)
      }
    }
  }
}
</script>
