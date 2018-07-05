<template lang="pug">
  v-container(grid-list-md).pa-0
    v-layout(row justify-center wrap)
      v-flex(xs12 md6)
        v-select(:items="typeOptions" v-model="typeFilter" label="Type" multiple max-height="400")
      v-flex(xs12 md6)
        v-select(:items="rarityOptions" v-model="rarityFilter" label="Rarity" multiple max-height="400")
      v-flex(xs12).text-xs-center.hidden-md-and-up
        v-btn(@click="reset()") Reset
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('weaponList')

  export default {
    computed: {
      ...mapGetters(['type', 'rarity']),
      typeFilter: {
        get () {
          return this.type
        },
        set (value) {
          this.updateList({key: 'type', value})
        }
      },
      rarityFilter: {
        get () {
          return this.rarity
        },
        set (value) {
          this.updateList({key: 'rarity', value})
        }
      }
    },
    data () {
      return {
        typeOptions: [ 'Assault Rifle', 'Heavy Pistol', 'Heavy Weapon', 'Melee', 'SMG', 'Shotgun', 'Sniper Rifle' ],
        rarityOptions: [ 'Common', 'Uncommon', 'Rare', 'Very Rare' ]
      }
    },
    methods: {
      ...mapActions(['updateList']),
      reset () {
        this.rarityFilter = []
        this.typeFilter = []
      }
    }
  }
</script>

