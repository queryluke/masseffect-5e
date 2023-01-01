<template>
  <v-card flat class="mb-10">
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
                  <me-cs-companion-debounced-text-input :value="companion.currentHp" label="Set HP" @set="updateCompanion('currentHp', $event)" />
                </div>
                <me-cs-companion-debounced-text-input :value="companion.currentShields" label="Set Shields" @set="updateCompanion('currentShields', $event)" />
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
        <div v-if="companionSkills" class="text-body-2 d-flex align-center flex-wrap mt-2">
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
        <div v-if="companionSenses" class="text-body-2 d-flex align-center flex-wrap mt-2">
          <div class="font-weight-bold">
            Senses
          </div>
          <div class="d-flex align-center flex-wrap">
            <div v-for="(distance, sense) in companion.senses" :key="`sense-${sense}`" class="d-flex px-2 align-center">
              <div class="mr-1 text-capitalize">
                {{ sense.replace('-', ' ') }}
              </div>
              <me-distance :length="distance" abbr />
            </div>
          </div>
        </div>
        <!-- Defenses -->
        <div v-for="irv of ['dmgRes', 'dmgImm', 'conImm', 'dmgVul']" :key="`irv=${irv}`">
          <div v-if="companion[irv].length" class="text-body-2 d-flex align-center flex-wrap mt-2">
            <div class="font-weight-bold">
              {{ irvNames[irv] }}
            </div>
            <div class="ml-1 text-capitalize">
              {{ companion[irv].join(', ') }}
            </div>
          </div>
        </div>
      </v-card>
      <me-hr />

      <!-- Actions -->
      <div v-for="actionType of actionTypes" :key="`actionType-${actionType}`" class="mb-3">
        <div v-if="actions[actionType].length">
          <div class="text-subtitle-1">
            {{ actionType }}
          </div>
          <me-hr />
          <div v-for="(aot, index) of actions[actionType]" :key="`companion-${actionType.toLowerCase().replace(' ', '')}-${index}`">
            <v-card outlined>
              <div class="mx-1">
                <v-row no-gutters align="baseline">
                  <v-col cols="4" sm="6">
                    <v-card flat color="transparent">
                      <div class="mb-n1 text-body-1">
                        <small class="text-truncate font-weight-bold">
                          {{ aot.name }}
                        </small>
                      </div>
                    </v-card>
                    <div v-if="aot.description && $vuetify.breakpoint.smAndUp" class="text-caption mb-4">
                      {{ aot.description }}
                    </div>
                  </v-col>

                  <!-- RANGE -->
                  <v-col cols="3" sm="2" class="text-center">
                    <me-cs-action-range v-if="aot.shortRange || aot.aoeSize" :range="{ short: aot.shortRange, long: aot.longRange, aoe: { size: aot.aoeSize, type: aot.aoeType, filename: $vuetify.theme.dark ? `${aot.aoeType}-white` : aot.aoeType } }" />
                  </v-col>

                  <!-- HIT/DC -->
                  <v-col cols="2" sm="1" class="text-center">
                    <me-cs-action-stat v-if="aot.hit || aot.hit === 0">
                      <me-cs-roll-card :roll="{ notation: `1d20${rollText(aot.hit)}`, detail: aot.name, subDetail: `${companion.name} (companion)`, type: 'to hit' }" min-width="36">
                        <div class="my-1">
                          {{ modText(aot.hit) }}
                        </div>
                      </me-cs-roll-card>
                    </me-cs-action-stat>
                    <me-cs-action-stat v-else-if="aot.dc && $vuetify.breakpoint.xsOnly">
                      {{ aot.dc }}
                      <template #subtitle>
                        <span class="text-uppercase">
                          {{ aot.dcSave }}
                        </span>
                      </template>
                    </me-cs-action-stat>
                    <me-cs-action-stat v-else>
                      --
                    </me-cs-action-stat>
                  </v-col>

                  <v-col v-if="$vuetify.breakpoint.smAndUp" cols="2" sm="1" class="text-center">
                    <me-cs-action-stat v-if="aot.dc">
                      {{ aot.dc }}
                      <template #subtitle>
                        <span class="text-uppercase">
                          {{ aot.dcSave }}
                        </span>
                      </template>
                    </me-cs-action-stat>
                    <me-cs-action-stat v-else>
                      --
                    </me-cs-action-stat>
                  </v-col>

                  <!-- Damages -->
                  <v-col cols="3" sm="2">
                    <me-cs-action-stat v-if="aot.dmgDieCount || aot.dmgDieType || aot.dmgType">
                      <me-cs-action-damage :damage="damageObject(aot)" />
                    </me-cs-action-stat>
                  </v-col>

                  <!-- NOTES -->
                  <v-col v-if="$vuetify.breakpoint.xsOnly" cols="12" class="text-caption mb-4">
                    {{ aot.description }}
                  </v-col>
                </v-row>
                <v-card v-if="aot.resourceMax || aot.resourceDisplay" style="position: absolute; bottom: -9px" outlined @click.stop>
                  <div class="d-flex align-center">
                    <component
                      :is="`me-cs-action-resource-display-${resourceComponent[aot.resourceDisplay]}`"
                      :current="aot.remainingResources"
                      :max="aot.resourceMax"
                      :max-width="75"
                      @add="addResource(aot.uuid)"
                      @remove="removeResource(aot.uuid)"
                      @reset="resetResource(aot.uuid)"
                      @set="setResource(aot.uuid, $event)"
                    />
                    <v-btn
                      v-if="aot.resourceDisplay !== 'Heat Tracker'"
                      x-small
                      class="mr-1"
                      color="primary"
                      icon
                      @click.stop="resetResource(aot.uuid)"
                    >
                      <v-icon size="18">
                        mdi-refresh
                      </v-icon>
                    </v-btn>
                  </div>
                </v-card>
              </div>
            </v-card>
          </div>
        </div>
      </div>
      <me-hr />
      <div>
        {{ companion.notes }}
      </div>
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
      healthMenu: false,
      irvNames: {
        dmgImm: 'Immunities',
        dmgRes: 'Resistances',
        conImm: 'Condition Immunities',
        dmgVul: 'Vulnerabilities'
      },
      actionTypes: [
        'Attack',
        'Action',
        'Bonus Action',
        'Reaction',
        'Other'
      ],
      resourceComponent: {
        Checkboxes: 'checkbox',
        'Heat Tracker': 'heat',
        Counter: 'counter'
      }
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    actions () {
      const actions = {}
      for (const actionType of this.actionTypes) {
        actions[actionType] = this.companion.features.filter(i => i.type === actionType)
      }
      return actions
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
    },
    companionSenses () {
      return JSON.stringify(this.companion.senses) !== '{}'
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
      const score = this.companionSkills[skill]
      const append = score.mod !== 0 ? score.modText : ''
      return {
        notation: `1d20${append}`,
        detail: score.name,
        subDetail: `${this.companion.name} (companion)`,
        type: 'Skill Check'
      }
    },
    damageObject (action) {
      const bonusText = action.dmgBonus ? this.modText(action.dmgBonus) : ''
      return {
        detail: action.name,
        subDetail: `${this.companion.name} (companion)`,
        healing: false,
        label: false,
        reroll: 0,
        text: `${action.dmgDieCount}d${action.dmgDieType} ${bonusText}} ${action.dmgType} damage`,
        types: {
          [action.dmgType]: {
            [action.dmgDieType]: action.dmgDieCount,
            bonus: action.dmgBonus || false
          }
        }
      }
    },
    resetResource (uuid) {
      const matchingFeature = this.companion.features.find(i => i.uuid === uuid)
      if (matchingFeature) {
        this.setResource(uuid, 0)
      }
    },
    addResource (uuid) {
      const matchingFeature = this.companion.features.find(i => i.uuid === uuid)
      if (matchingFeature) {
        this.setResource(uuid, matchingFeature.remainingResources + 1)
      }
    },
    removeResource (uuid) {
      const matchingFeature = this.companion.features.find(i => i.uuid === uuid)
      if (matchingFeature) {
        this.setResource(uuid, matchingFeature.remainingResources - 1)
      }
    },
    setResource (uuid, value) {
      const updatedFeatures = JSON.parse(JSON.stringify(this.companion.features))
      const index = updatedFeatures.findIndex(i => i.uuid === uuid)
      if (index > -1) {
        const newFeature = Object.assign({}, updatedFeatures[index])
        newFeature.remainingResources = value
        updatedFeatures.splice(index, 1, newFeature)
      }
      this.updateCompanion('features', updatedFeatures)
    }
  }
}
</script>
