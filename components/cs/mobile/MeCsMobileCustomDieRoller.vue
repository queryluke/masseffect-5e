<template>
  <v-dialog v-model="mobileRoller" overlay-opacity=".9" persistent content-class="ma-2">
    <v-card flat>
      <div class="d-flex justify-space-between">
        <v-btn
          icon
          @click="closeRoller()"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-btn text @click="viewLogs">
          View Log
        </v-btn>
      </div>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-center">
            <me-cs-roll-die-select :die-type="'d20'" large />
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="dieType in dieTypes" :key="dieType" cols="4" class="text-center">
            <me-cs-roll-die-select :die-type="dieType" />
          </v-col>
        </v-row>
        <div class="mt-8">
          <div class="text-subtitle text-center">
            -- OR --
          </div>
          <me-cs-roll-custom-text />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="secondary" :disabled="!rollable" @click="roll">
          Roll
        </v-btn>
        <v-spacer />
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
        this.$store.dispatch('character/navigation/SHOW_SIDE_NAVBAR', 'me-cs-logs-list')
      })
    }
  }
}
</script>
