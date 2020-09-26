<template>

</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapGetters } = createNamespacedHelpers('gruntGenerator')

export default {
  props: {
    itemKey: {
      type: String,
      default: ''
    },
    unitOptions: {
      type: Object,
      default: () => { return {} }
    },
    crOptions: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    ...mapGetters(['cr', 'race', 'sc']),
    selectedCr: {
      get () {
        return this.cr
      },
      set (value) {
        this.setCr(value)
      }
    },
    selectedRace: {
      get () {
        return this.race
      },
      set (value) {
        this.setRace(value)
      }
    },
    selectedClass: {
      get () {
        return this.sc
      },
      set (value) {
        this.setClass(value)
      }
    },
    races () {
      return this.$store.getters.getData('species')
    },
    classes () {
      return this.$store.getters.getData('classes')
    },
    crs () {
      return this.$store.getters.getData('stats-by-cr')
    }
  },
  methods: {
    ...mapActions(['setCr', 'setRace', 'setClass']),
    reset () {
      this.selectedCr = {}
      this.selectedRace = {}
      this.selectedClass = {}
    }
  }
}
</script>
