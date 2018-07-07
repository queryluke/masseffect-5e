<template lang="pug">
  v-container(grid-list-md).pa-0
    v-layout(row justify-center wrap)
      v-flex(xs12 md6)
        v-select(:items="placementOptions" v-model="placementFilter" label="Placement" multiple max-height="400")
      v-flex(xs12 md6)
        v-select(:items="weaponTypeOptions" v-model="weaponTypeFilter" label="Weapon Availability" multiple max-height="400")
      v-flex(xs12).text-xs-center.hidden-md-and-up
        v-btn(@click="reset()") Reset
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('itemList')

  export default {
    computed: {
      ...mapGetters(['filters']),
      placementFilter: {
        get () {
          return this.filters[this.itemKey].placement
        },
        set (value) {
          this.updateFilter({key: this.itemKey, filterKey: 'placement', value})
        }
      },
      weaponTypeFilter: {
        get () {
          return this.filters[this.itemKey].weaponType
        },
        set (value) {
          this.updateFilter({key: this.itemKey, filterKey: 'weaponType', value})
        }
      }
    },
    data () {
      return {
        placementOptions: ['Body', 'Barrel', 'Ammo', 'Magazine'],
        weaponTypeOptions: [
          {value: 'assaultRifle', text: 'Assault Rifle'},
          {value: 'heavyPistol', text: 'Heavy Pistol'},
          {value: 'smg', text: 'SMG'},
          {value: 'shotgun', text: 'Shotgun'},
          {value: 'sniperRifle', text: 'Sniper Rifle'}
        ]
      }
    },
    methods: {
      ...mapActions(['updateFilter']),
      reset () {
        this.placementFilter = []
        this.weaponTypeFilter = []
      }
    },
    props: ['itemKey']
  }
</script>

