<template lang="pug">
  v-container(grid-list-md).pa-0
    v-layout(row justify-center wrap)
      v-flex(xs12 md6)
        v-select(:items="typeOptions" v-model="typeFilter" label="Spell Type" multiple max-height="400")
      v-flex(xs12 md6)
        v-select(:items="classOptions" v-model="classFilter" label="Classes" multiple max-height="400")
      v-flex(xs12).text-xs-center.hidden-md-and-up
        v-btn(@click="reset()") Reset
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters('spellList', {
        type: 'type',
        availableClasses: 'availableClasses'
      }),
      typeFilter: {
        get () {
          return this.type
        },
        set (value) {
          this.updateSpellList({key: 'type', value})
        }
      },
      classFilter: {
        get () {
          return this.availableClasses
        },
        set (value) {
          this.updateSpellList({key: 'availableClasses', value})
        }
      }
    },
    data () {
      return {
        typeOptions: [
          {value: 'biotic', text: 'Biotic'},
          {value: 'tech', text: 'Tech'},
          {value: 'combat', text: 'Combat'}
        ],
        classOptions: [
          {value: 'adept', text: 'Adept'},
          {value: 'engineer', text: 'Engineer'},
          {value: 'infiltrator', text: 'Infiltrator'},
          {value: 'sentinel', text: 'Sentinel'},
          {value: 'soldier', text: 'Soldier'},
          {value: 'vanguard', text: 'Vanguard'}
        ]
      }
    },
    methods: {
      ...mapActions('spellList', ['updateSpellList']),
      reset () {
        this.classFilter = []
        this.typeFilter = []
      }
    },
    props: ['spells']
  }
</script>

