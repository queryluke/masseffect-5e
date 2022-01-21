<template>
  <v-tabs
    v-model="tab"
    :align-with-title="mobile"
    :center-active="mobile"
    :centered="mobile"
    :show-arrows="mobile"
    :color="tabColor"
    :grow="!mobile && grow"
  >
    <v-tab v-for="item in tabs" :key="item">
      {{ item }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'MeTabbedPageTabs',
  props: {
    grow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tabThemes: {
        base: {
          dark: 'primary'
        },
        adept: {
          dark: 'deep-purple darken-1',
          light: 'deep-purple lighten-2'
        },
        engineer: {
          dark: 'amber darken-1'
        },
        infiltrator: {
          dark: 'deep-orange darken-4',
          light: 'deep-orange'
        },
        sentinel: {
          dark: 'brown',
          light: 'brown lighten-2'
        },
        soldier: {
          dark: 'red darken-4',
          light: 'red accent-2'
        },
        vanguard: {
          dark: 'pink darken-4',
          light: 'pink lighten-2'
        }
      }
    }
  },
  computed: {
    mobile () {
      return this.$vuetify.breakpoint.smAndDown
    },
    tab: {
      get () {
        return this.$store.getters['tabbedPage/activeTab']
      },
      set (value) {
        this.$store.commit('tabbedPage/SET_ACTIVE_TAB', value)
      }
    },
    tabs () {
      return this.$store.getters['tabbedPage/tabs']
    },
    tabColor () {
      const tabColors = this.$store.getters['config/classThemes'][this.$route.params.id] || { dark: 'indigo darken-4', light: 'light-blue darken-1' }
      if (this.mobile) {
        return tabColors.light || tabColors.dark
      } else {
        return this.$store.getters['user/darkMode'] ? tabColors.light || tabColors.dark : tabColors.dark
      }
    }
  }
}
</script>
