<template>
  <v-card flat>
    <v-btn
      v-if="!viewOnly"
      fab
      x-small
      absolute
      top
      right
      color="primary"
      @click="editCompanion = true"
    >
      <v-icon>
        mdi-pencil
      </v-icon>
    </v-btn>
    <div>
      <v-row no-gutters class="pt-5">
        <v-col cols="12" sm="9">
          <v-row no-gutters>
            <v-col v-for="(values, ability) in abilities" :key="`companion-ability-${ability}`" cols="4" sm="2">
              <v-card outlined flat class="mx-1 text-center">
                <div class="text-caption">
                  {{ $t(`abilities.${ability}.abbr`) }}
                </div>
                <div class="d-flex justify-center align-center">
                  <me-cs-roll-card :roll="rollAbility(ability)">
                    <div class="text-h6">
                      {{ values.modText }}
                    </div>
                  </me-cs-roll-card>
                </div>
                <div>
                  {{ values.score }}
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="3" class="px-2">
          <v-menu
            v-model="healthMenu"
            :close-on-click="false"
            :close-on-content-click="false"
            offset-y
            style="max-width: 600px"
          >
            <template #activator="{ on, attrs }">
              <v-card outlined v-bind="attrs" v-on="on">
                <v-row class="text-center" no-gutters>
                  <v-col cols="12" class="text-caption text-md-subtitle-2 d-flex align-center justify-center" :class="csTextColor('shields')">
                    {{ companion.shields ? `${companion.currentShields} / ${companion.shields}` : '-' }}
                    <v-icon :color="csBgColor('shields')" size="12" class="pl-1">
                      mdi-shield
                    </v-icon>
                  </v-col>
                  <v-col cols="12" class="text-body-1 font-weight-bold text-md-h6 d-flex align-center justify-center" :class="csTextColor('hp')">
                    {{ companion.currentHp }}/{{ companion.hp }}
                    <v-icon :color="csBgColor('hp')" size="18" class="pl-1">
                      mdi-heart-pulse
                    </v-icon>
                  </v-col>
                  <v-col cols="12" class="text-caption text-md-subtitle-2 d-flex justify-center">
                    <div class="align-center justify-center">
                      AC: {{ companion.ac }}
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </template>
            <v-card>
              <v-card-text>
                <div class="mb-3">
                  <me-cs-companion-debounced-text-input :value="companion.currentHp" label="Set HP" is-integer @set="updateCompanion('currentHp', $event)" />
                </div>
                <me-cs-companion-debounced-text-input :value="companion.currentShields" label="Set Shields" is-integer @set="updateCompanion('currentShields', $event)" />
                <div class="text-caption">
                  Regen: {{ companion.regen }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn x-small text @click="healthMenu = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
      <!-- Senses, Skills, & Defenses -->
      <me-hr />
      <v-card color="transparent" class="pb-4">
        <div v-if="savingThrows" class="text-body-2 d-flex align-center flex-wrap">
          <div class="font-weight-bold">
            Saving Throws
          </div>
          <div class="d-flex align-center">
            <div v-for="(st, stAbility) in savingThrows" :key="`st-${stAbility}`" class="d-flex px-2 align-center flex-wrap">
              <div class="mr-1">
                {{ $t(`abilities.${stAbility}.title`) }}
              </div>
              <me-cs-roll-card :roll="rollSavingThrow(stAbility)" :min-width="24">
                <div class="py-1">
                  {{ st.modText }}
                </div>
              </me-cs-roll-card>
            </div>
          </div>
        </div>
        <div v-if="companionSkills" class="text-body-2 d-flex align-center flex-wrap">
          <div class="font-weight-bold">
            Skills
          </div>
          <div class="d-flex align-center flex-wrap">
            <div v-for="(skillValues, skill) in companionSkills" :key="`skill-${skill}`" class="d-flex px-2 align-center">
              <div class="mr-1">
                {{ skillValues.name }}
              </div>
              <me-cs-roll-card :roll="rollSkill(skill)" :min-width="24">
                <div class="py-1">
                  {{ skillValues.modText }}
                </div>
              </me-cs-roll-card>
            </div>
          </div>
        </div>
        <!-- Senses -->
        <div />
        <!-- Defenses -->
        <div />
      </v-card>
      <me-hr />

      <!-- Actions -->
      <v-row />
      <me-hr />
      <!-- Notes -->
      <v-row />
    </div>
    <me-cs-companion-edit-dialog :companion="companion" :show="editCompanion" @close="editCompanion = false" @delete="deleteCompanion" />
  </v-card>
</template>

<script>
import { CsColors } from '~/mixins/character/csColors'
import { ScoreText } from '~/mixins/character/scoreText'

export default {
  name: 'MeCsCompanionStatBlock',
  mixins: [CsColors, ScoreText],
  props: {
    companion: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      editCompanion: false,
      healthMenu: false
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    skills () {
      return this.$store.getters.getData('skills')
    },
    abilities () {
      const abilities = {}
      for (const ability of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
        const score = this.companion[ability]
        const mod = score ? Math.floor((score - 10) / 2) : null
        abilities[ability] = {
          score,
          mod,
          modText: mod < 0 ? mod : `+${mod}`
        }
      }
      return abilities
    },
    savingThrows () {
      if (!this.companion.savingThrows.length) {
        return false
      }
      const sts = {}
      for (const ability of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
        if (this.companion.savingThrows.includes(ability)) {
          const mod = this.companion.profBonus + this.abilities[ability].mod
          sts[ability] = {
            mod,
            modText: mod > 0 ? `+${mod}` : mod
          }
        }
      }
      return sts
    },
    companionSkills () {
      if (!this.companion.skills.length) {
        return false
      }
      const skills = {}
      for (const skill of this.skills) {
        if (this.companion.skills.includes(skill.id)) {
          const mod = this.companion.profBonus + this.abilities[skill.link].mod
          skills[skill.id] = {
            name: skill.name,
            mod,
            modText: mod > 0 ? `+${mod}` : mod
          }
        }
      }
      return skills
    }
  },
  methods: {
    deleteCompanion () {
      this.$store.dispatch('character/companion/REMOVE_COMPANION', this.companion.uuid)
      this.editCompanion = false
    },
    updateCompanion (attr, value) {
      const updatedCompanion = JSON.parse(JSON.stringify(this.companion))
      updatedCompanion[attr] = value
      this.$store.dispatch('character/companion/UPDATE_COMPANION', updatedCompanion)
    },
    rollAbility (ability) {
      if (!ability) {
        return
      }
      const score = this.abilities[ability]
      const append = score.mod !== 0 ? score.modText : ''
      return {
        notation: `1d20${append}`,
        detail: this.$t(`abilities.${ability}.abbr`),
        subDetail: `${this.companion.name} (companion)`,
        type: 'check'
      }
    },
    rollSavingThrow (ability) {
      if (!ability) {
        return
      }
      const score = this.savingThrows[ability]
      const append = score.mod !== 0 ? score.modText : ''
      return {
        notation: `1d20${append}`,
        detail: this.$t(`abilities.${ability}.abbr`),
        subDetail: `${this.companion.name} (companion)`,
        type: 'Saving Throw'
      }
    },
    rollSkill (skill) {
      if (!skill) {
        return
      }
      console.log(skill, this.companionSkills)
      const score = this.companionSkills[skill]
      console.log(score)
      const append = score.mod !== 0 ? score.modText : ''
      return {
        notation: `1d20${append}`,
        detail: score.name,
        subDetail: `${this.companion.name} (companion)`,
        type: 'Skill Check'
      }
    }
  }
}
</script>
