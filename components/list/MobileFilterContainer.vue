<template lang="pug">
  v-dialog(v-model="mobileFilterDialog" fullscreen hide-overlay transition="dialog-bottom-transition")
    v-card
      v-toolbar(dark color="primary")
        v-btn(icon dark @click.native="toggleMobileFilterDialog") #[v-icon close]
        v-toolbar-title {{ title }}
      v-card-text
        slot(name="filters")
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('itemList')

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['mobileFilterDialog'])
  },
  methods: {
    ...mapActions(['toggleMobileFilterDialog'])
  }
}
</script>
