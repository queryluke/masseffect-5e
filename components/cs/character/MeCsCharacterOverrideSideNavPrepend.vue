<template>
  <v-list-item two-line>
    <v-list-item-content>
      <v-list-item-title>
        Overrides
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn small outlined color="error" @click="resetAll">
        Reset All
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>

export default {
  name: 'MeCsCharacterOverrideSideNavPrepend',
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    }
  },
  methods: {
    resetAll () {

    }
  }
}
</script>
