<template lang="pug">
  v-container(grid-list-md).pa-0
    v-layout(row justify-center wrap)
      v-flex(xs12 md6)
        v-select(:items="typeOptions" v-model="typeFilter" label="Type" multiple max-height="400")
      v-flex(xs12 md6)
        v-select(:items="noteOptions" v-model="noteFilter" label="Benefits" multiple max-height="400")
      v-flex(xs12).text-xs-center.hidden-md-and-up
        v-btn(@click="reset()") Reset
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('itemList')

  export default {
    computed: {
      ...mapGetters(['filters']),
      typeFilter: {
        get () {
          return this.filters[this.itemKey].type
        },
        set (value) {
          this.updateFilter({key: this.itemKey, filterKey: 'type', value})
        }
      },
      noteFilter: {
        get () {
          return this.filters[this.itemKey].notes
        },
        set (value) {
          this.updateFilter({key: this.itemKey, filterKey: 'notes', value})
        }
      }
    },
    data () {
      return {
        typeOptions: ['Chest', 'Head', 'Arms', 'Legs']
      }
    },
    methods: {
      ...mapActions(['updateFilter']),
      reset () {
        this.typeFilter = []
        this.noteFilter = []
      }
    },
    props: ['itemKey', 'noteOptions']
  }
</script>

