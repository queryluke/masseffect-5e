<template lang="pug">
  v-sheet(color="red lighten-4")
    div.text-xs-center
        v-btn(@click="clearRolls") Clear Log
    div(v-for="(roll, i) in rolls" v-bind:key="i")
      roll-set(:roll="roll")
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import RollSet from '~/components/dice_roller/RollSet.vue'

const { mapGetters, mapActions } = createNamespacedHelpers('diceRoller')

export default {
  components: { RollSet },
  computed: {
    ...mapGetters(['rolls'])
  },
  methods: {
    ...mapActions(['clearRolls'])
  }
}
</script>
