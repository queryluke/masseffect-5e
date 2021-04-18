<template>
  <v-navigation-drawer
    v-model="jumpNav"
    app
    clipped
    right
  >
    <v-list dense>
      <v-subheader>Jump to</v-subheader>
      <v-list-item v-for="rule in rules" :key="rule.id" @click="goToRule(`#${rule.id}`)">
        <v-list-item-content>
          <v-list-item-title>
            {{ rule.title }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-chip v-if="rule.new" x-small color="info">
            new
          </v-chip>
          <v-chip v-if="rule.change" x-small color="warning" text-color="black">
            change
          </v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MeJumpNav',
  computed: {
    rules () {
      return this.$store.getters.rules
    },
    jumpNav: {
      get () {
        return this.$store.getters.jumpNav
      },
      set (value) {
        this.$store.commit('jumpNav', value)
      }
    }
  },
  methods: {
    goToRule (rule) {
      this.$vuetify.goTo(rule, { offset: 10 })
      if (this.$vuetify.breakpoint.mdAndDown) {
        this.jumpNav = false
      }
    }
  }
}
</script>
