<template>
  <v-tabs
    :value="value"
    :[tabsMode]="true"
    :color="tabColor"
    :background-color="tabsColor"
    @change="change"
  >
    <v-tab v-for="tabItem in tabs" :key="tabItem">
      {{ tabItem }}
    </v-tab>
  </v-tabs>
</template>

<script>

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      default: null
    },
    tabs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    tabColor () {
      return this.$store.getters['config/classThemeTabColor'](this.id)
    },
    tabsColor () {
      return this.$store.getters['config/classThemeTabsColor'](this.id)
    },
    tabsMode () {
      return this.$store.getters['config/classThemeTabsMode'](this.id)
    }
  },
  methods: {
    change (value) {
      this.$emit('change', value)
    }
  }
}
</script>
