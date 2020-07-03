<template lang="pug">
  div
    v-tabs(v-model="activeTab" v-bind:slider-color="sliderColor" id="desktopTabs" grow).hidden-sm-and-down
      v-tab(v-for="tab in tabs" v-bind:key="tab.id" v-bind:href="`#${tab.id}`" v-bind:class="textColor" ripple) {{ tab.name }}
    v-tabs-items(v-model="activeTab")
      v-tab-item(v-for="tab in tabs" v-bind:key="tab.id" v-bind:value="tab.id")
        div.pa-2
          slot(:name="tab.slot")
</template>

<script>
// State
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('classPage')

export default {
  computed: {
    ...mapGetters(['active', 'tabs', 'colors']),
    activeTab: {
      get () {
        return this.active
      },
      set (value) {
        this.setActiveTab(value)
      }
    },
    sliderColor () {
      return this.colors[this.$route.params.id] ? this.colors[this.$route.params.id].primary : 'primary'
    },
    textColor () {
      const colorArray = this.sliderColor.split(' ')
      return `${colorArray[0]}--text ${colorArray[1] ? 'text--' + colorArray[1] : ''}`
    }
  },
  methods: {
    ...mapActions(['setActiveTab', 'toggleSidebar'])
  }
}
</script>

<style>
  #desktopTabs .v-tabs__item:not(.v-tabs__item--active) {
    color: rgba(0, 0, 0, .87)
  }
</style>
