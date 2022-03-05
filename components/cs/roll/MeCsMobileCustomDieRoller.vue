<template>
  <v-dialog
    v-model="mobileRoller"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :transition="$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'"
    :scrollable="$vuetify.breakpoint.xsOnly"
    width="400px"
    :persistent="$vuetify.breakpoint.sm"
  >
    <v-card width="400px">
      <v-card-text class="pt-16 pt-sm-1">
        <div class="my-8">
          <me-cs-roll-custom-text />
        </div>
        <div class="text-subtitle text-center my-6">
          -- OR --
        </div>
        <v-container class="my-4">
          <v-row>
            <v-col cols="12" class="text-center">
              <me-cs-roll-die-select :die-type="'d20'" large />
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="dieType in dieTypes" :key="dieType" cols="4" class="text-center">
              <me-cs-roll-die-select :die-type="dieType" large />
            </v-col>
          </v-row>
        </v-container>
        <div class="text-center">
          <v-btn
            color="secondary"
            :disabled="!rollable"
            :block="$vuetify.breakpoint.xsOnly"
            class="mt-12 mt-sm-2"
            min-width="100"
            @click="roll"
          >
            Roll
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="closeRoller()"
        >
          Close
        </v-btn>
        <v-spacer />
        <v-btn text color="primary" @click="viewLogs">
          View Log
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MeCsMobileCustomDieRoller',
  computed: {
    mobileRoller: {
      get () {
        return this.$store.getters['character/navigation/mobileRoller']
      },
      set (value) {
        return this.$store.commit('character/navigation/SET', { key: 'mobileRoller', value })
      }
    },
    dieTypes () {
      return this.$store.state.character.roller.dieTypes.filter(i => i !== 'd20')
    },
    rollable () {
      return Object.values(this.$store.getters['character/roller/rollController']).some(i => i) || this.$store.getters['character/roller/customTextRoll']
    }
  },
  methods: {
    roll () {
      this.$store.dispatch('character/roller/CUSTOM_ROLL')
      this.closeRoller()
    },
    closeRoller () {
      this.$store.commit('character/roller/RESET_CONTROLLER')
      this.$store.commit('character/roller/SET_CUSTOM_TEXT_ROLL', null)
      this.mobileRoller = false
    },
    viewLogs () {
      this.closeRoller()
      this.$nextTick(() => {
        this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-logs-list')
      })
    }
  }
}
</script>
