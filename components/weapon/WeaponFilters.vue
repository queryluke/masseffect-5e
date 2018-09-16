<template lang="pug">
  v-container(grid-list-md).pa-0
    v-layout(row justify-center wrap)
      v-flex(xs12 md6)
        v-select(:items="typeOptions" v-model="typeFilter" label="Type" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12 md6)
        v-select(:items="rarityOptions" v-model="rarityFilter" label="Rarity" multiple menu-props="{maxHeight:'400'}")
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
      rarityFilter: {
        get () {
          return this.filters[this.itemKey].rarity
        },
        set (value) {
          this.updateFilter({key: this.itemKey, filterKey: 'rarity', value})
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
      ...mapActions(['updateFilter']),
      reset () {
        this.rarityFilter = []
        this.typeFilter = []
      }
    },
    props: ['itemKey']
  }
</script>

