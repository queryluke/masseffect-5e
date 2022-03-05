<template>
  <v-badge
    :value="count > 0"
    bottom
    left
    overlap
    icon="mdi-close"
    :offset-x="overlay ? 17 : undefined"
    :offset-y="overlay ? 17 : undefined"
    @click.native.stop="count = 0"
  >
    <v-badge
      :value="count > 0"
      color="red darken-4"
      :content="count"
      overlap
      bottom
      :offset-x="overlay ? 17 : undefined"
      :offset-y="overlay ? 16 : undefined"
    >
      <v-btn
        fab
        :small="!large"
        color="black"
        @click.stop="count++"
      >
        <v-icon :size="large ? 36 : 24">
          {{ dieType === 'd100' ? 'mdi-percent' : `mdi-dice-${dieType}` }}
        </v-icon>
      </v-btn>
    </v-badge>
  </v-badge>
</template>

<script>
export default {
  name: 'MeCsRollDieSelect',
  props: {
    large: {
      type: Boolean,
      default: false
    },
    dieType: {
      type: String,
      required: true
    },
    overlay: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    count: {
      get () {
        return this.$store.getters['character/roller/rollController'][this.dieType] || 0
      },
      set (value) {
        this.$store.commit('character/roller/SET_CONTROLLER_DIE_COUNT', { dieType: this.dieType, value })
      }
    }
  }
}
</script>
