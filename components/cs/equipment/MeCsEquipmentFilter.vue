<template>
  <v-btn-toggle v-model="filterValue" color="primary" borderless>
    <v-btn v-for="item in types" :key="item" x-small :value="item">
      {{ item }}
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsEquipmentFilter',
  props: {
    adder: {
      type: Boolean,
      default: false
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      types: ['all', 'weapons', 'armor', 'gear']
    }
  },
  computed: {
    ...mapGetters({
      equipmentFilter: 'navigation/equipmentFilter',
      equipmentAdderFilter: 'navigation/equipmentAdderFilter',
      equipmentManagerFilter: 'navigation/equipmentManagerFilter'
    }),
    filterValue: {
      get () {
        return this.manager
          ? this.equipmentManagerFilter
          : this.adder
            ? this.equipmentAdderFilter
            : this.equipmentFilter
      },
      set (value) {
        this.manager
          ? this.$store.commit('character/navigation/SET', { key: 'equipmentManagerFilter', value })
          : this.adder
            ? this.$store.commit('character/navigation/SET', { key: 'equipmentAdderFilter', value })
            : this.$store.commit('character/navigation/SET', { key: 'equipmentFilter', value })
      }
    }
  }
}
</script>
