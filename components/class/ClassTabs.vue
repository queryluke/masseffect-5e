<template lang="pug">
  div
    v-tabs(v-model="activeTab" v-bind:slider-color="colors[$route.params.id].primary" grow).hidden-sm-and-down
      v-tab(v-for="tab in tabs" v-bind:key="tab.id" v-bind:href="`#${tab.id}`" ripple) {{ tab.name }}
    v-tabs-items(v-model="active")
      v-tab-item(v-for="tab in tabs" v-bind:key="tab.id" v-bind:id="tab.id")
        div.pa-2
          slot(:name="tab.slot")
</template>

<script>
  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('classPage')

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
      }
    },
    methods: {
      ...mapActions(['setActiveTab', 'toggleSidebar'])
    }
  }
</script>

