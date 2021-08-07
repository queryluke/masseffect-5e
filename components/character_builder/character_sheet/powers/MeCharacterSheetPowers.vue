<template>
  <div>
    <me-character-sheet-card-title>
      Powers
    </me-character-sheet-card-title>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between">
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
        <v-btn small color="primary" @click="managerDialog = true">
          Manage
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="4">
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
          <v-col cols="4">
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
          <v-col cols="4">
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
      </v-col>
    </v-row>

    <v-row>
      <v-col v-if="hasPowerSlots" cols="12">
        <div>
          Power Slots
        </div>
        <template v-for="(psMax, psIndex) of csPowerSlots">
          <div v-if="psMax > 0" :key="`ps-uses-${psIndex}`">
            <div class="text-caption">
              {{ $t('level_nth', {nth: $t(`ordinal_numbers[${psIndex + 1}]`)}) }}
            </div>
            <me-character-sheet-use-tracker
              :uses="psMax"
              :used="csGetPowerSlotsUsed(psIndex)"
              @increment="csSetPowerSlotsUsed(psIndex, csGetPowerSlotsUsed(psIndex) + 1)"
              @decrement="csSetPowerSlotsUsed(psIndex, csGetPowerSlotsUsed(psIndex) - 1)"
            />
          </div>
        </template>
      </v-col>
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

    <v-row>
      <v-col>
        <div>
          Powers
        </div>
        <template v-for="item in character.powers">
          <me-character-sheet-powers-add-card :key="item.id" :item="item" no-delete />
        </template>
      </v-col>
    </v-row>
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
          <me-character-sheet-powers-manager />
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
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'settings.powerModAbility', value })
      }
    },
    powersList () {
      return this.character.powers.map(i => this.powers.find(j => j.id === i.id)).sort((a, b) => a.level - b.level)
    }
  }
}
</script>
