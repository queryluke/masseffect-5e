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
    classId: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    tabs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    tabColor () {
      return this.$store.getters['config/classThemeTabColor'](this.classId)
    },
    tabsColor () {
      return this.$store.getters['config/classThemeTabsColor'](this.classId)
    },
    tabsMode () {
      return this.$store.getters['config/classThemeTabsMode'](this.classId)
    }
  },
  methods: {
    change (value) {
      this.$emit('change', value)
    }
  }
}
</script>
