<template>
  <v-chip-group v-model="tab" active-class="primary--text" :show-arrows="$vuetify.breakpoint.xsOnly || showArrows" mandatory>
    <v-chip
      v-for="(cTab, index) in tabs"
      :key="`action-chip-tab-${index}`"
      small
    >
      {{ cTab }}
    </v-chip>
  </v-chip-group>
</template>

<script>
export default {
  name: 'MeCsCardNavChips',
  props: {
    chipSet: {
      type: String,
      required: true
    },
    showArrows: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tabs () {
      return this.$store.state.character.navigation[`${this.chipSet}Tabs`]
    },
    tab: {
      get () {
        return this.$store.getters[`character/navigation/${this.chipSet}Tab`]
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: `${this.chipSet}Tab`, value })
      }
    }
  }
}
</script>
