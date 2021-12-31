<template>
  <div>
    <me-character-sheet-card-title v-if="$vuetify.breakpoint.smAndDown">
      Powers
    </me-character-sheet-card-title>

    <!-- Power Mod -->
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="powerModAbility"
          hint="Powercasting Ability"
          :items="abilityOptions"
          persistent-hint
          outlined
          :clearable="character.settings.powerModAbility !== null && character.settings.powerModAbility !== csStartingClassPowerAbility"
          dense
          class="mr-3"
        />
      </v-col>
      <v-col cols="4" md="2" offset-md="1">
        <v-card outlined flat>
          <div class="ma-auto text-center">
            <div class="text-caption">
              <small>Mod</small>
            </div>
            <div class="text-h6">
              {{ absModText(powerModAbility) }}
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4" md="2">
        <v-card outlined flat>
          <div class="ma-auto text-center">
            <div class="text-caption">
              <small>Attack</small>
            </div>
            <div class="text-h6">
              +{{ powerAttackMod }}
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4" md="2">
        <v-card outlined flat>
          <div class="ma-auto text-center">
            <div class="text-caption">
              <small>DC</small>
            </div>
            <div class="text-h6">
              {{ powerDc }}
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tech points -->
    <v-row>
      <v-col v-if="hasTechPoints" cols="12">
        <div>
          Tech Points
        </div>
        <me-character-sheet-use-tracker
          :uses="csMaxTechPoints"
          :used="csTechPointsUsed"
          progress
          @decrement="csTechPointsUsed++"
          @increment="csTechPointsUsed--"
        />
      </v-col>
    </v-row>

    <!-- powers -->
    <v-row>
      <v-col>
        <div class="d-flex justify-space-between">
          <div class="text-subtitle-1">
            Powers
          </div>
          <v-btn x-small color="primary" @click="managerDialog = true">
            Manage
          </v-btn>
        </div>
        <template v-for="powerLevel in [0, 1, 2, 3, 4, 5]">
          <me-character-sheet-powers-at-level-list :key="`powers-at-level-${powerLevel}`" :power-level="powerLevel" />
        </template>
      </v-col>
    </v-row>

    <!-- manage dialog -->
    <v-dialog v-model="managerDialog" fullscreen>
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            Manage Powers
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon @click="managerDialog = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="mt-5">
          <v-container class="max-width: 1200px">
            <me-character-sheet-powers-manager />
          </v-container>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      managerDialog: false
    }
  },
  computed: {
    abilityOptions () {
      return ['str', 'dex', 'con', 'wis', 'int', 'cha'].map((i) => {
        return {
          text: this.$t(`abilities.${i}.title`),
          value: i
        }
      })
    },
    powerAttackMod () {
      return this.profBonus + this.absMod(this.powerModAbility) + this.character.settings.attackSpellMod
    },
    powerDc () {
      return 8 + this.powerAttackMod
    },
    powerModAbility: {
      get () {
        return this.character.settings.powerModAbility || this.csStartingClassPowerAbility
      },
      set (value) {
        this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'settings.powerModAbility', value })
      }
    }
  }
}
</script>
