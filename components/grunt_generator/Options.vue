<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 sm6 md4).px-2
      v-select(
      v-bind:items="crs"
      v-model="selectedCr"
      label="Select a Challenge Rating"
      item-text="cr"
      item-value="cr"
      return-object
      single-line
      menu-props="bottom"
      hint="Challenge Rating"
      persistent-hint
      )
    v-flex(xs12 sm6 md4).px-2
      v-select(
      v-bind:items="classes"
      v-model="selectedClass"
      label="Select a Class"
      item-text="name"
      item-value="id"
      return-object
      single-line
      menu-props="bottom"
      hint="Class"
      persistent-hint
      )
    v-flex(xs12 sm6 md4).px-2
      v-select(
      v-bind:items="races"
      v-model="selectedRace"
      label="Select a Race"
      item-text="name"
      item-value="id"
      return-object
      single-line
      menu-props="bottom"
      hint="Race"
      persistent-hint
      )
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import races from '~/static/data/races'
import crs from '~/static/data/stats_by_cr'
import classes from '~/static/data/classes'

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
  data () {
    return {
      races,
      classes,
      crs
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
