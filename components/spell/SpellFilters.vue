<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 md6 lg4)
      v-select(:items="typeOptions" v-model="typeFilter" label="Spell Type" multiple max-height="400")
    v-flex(xs12 md6 lg4)
      v-select(:items="classOptions" v-model="classFilter" label="Classes" multiple max-height="400")
    v-flex(xs12 lg4).text-xs-center
      v-btn(@click="reset()") Reset
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  //

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

