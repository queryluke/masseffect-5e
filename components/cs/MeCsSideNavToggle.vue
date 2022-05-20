<template>
  <v-slide-x-reverse-transition hide-on-leave mode="in-out">
    <v-btn
      fab
      shaped
      small
      fixed
      bottom
      right
      color="red darken-4"
      :style="nudge"
      style="transition: margin-right 0.2s cubic-bezier(0.4, 0, 0.2, 1); z-index: 10"
      @click="sideNav = !sideNav"
    >
      <v-icon>
        mdi-chevron-{{ sideNav ? 'right' : 'left' }}
      </v-icon>
    </v-btn>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  name: 'MeCsSideNav',
  computed: {
    nudge () {
      if (!this.sideNav && this.$vuetify.breakpoint.smAndDown) {
        return {
          'margin-right': '-300px'
        }
      }
      if (this.sideNav) {
        return {
          'margin-right': this.$vuetify.breakpoint.xsOnly ? '244px' : '304px'
        }
      }
      return undefined
    },
    sideNav: {
      get () {
        return this.$store.getters['character/navigation/sideNav']
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'sideNav', value })
      }
    }
  }
}
</script>
