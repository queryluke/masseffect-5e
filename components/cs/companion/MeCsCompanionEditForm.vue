<template>
  <v-tabs-items v-model="activeTab" class="pt-5">
    <!-- Name & Image -->
    <v-tab-item>
      <v-row>
        <v-col
          v-if="companion.image"
          cols="12"
          class="text-center"
        >
          <v-avatar size="100">
            <v-img :src="companion.image" />
          </v-avatar>
        </v-col>
        <v-col cols="12" md="6">
          <me-cs-companion-debounced-text-input :value="companion.name" label="Name" clearable @set="updateCompanion('name', $event)" />
        </v-col>
        <v-col cols="12" md="6">
          <me-cs-companion-debounced-text-input :value="companion.image" label="Image URL" clearable @set="updateCompanion('image', $event)" />
        </v-col>
        <v-col cols="12">
          <me-cs-companion-debounced-text-area-input :value="companion.notes" label="Notes" @set="updateCompanion('notes', $event)" />
        </v-col>
      </v-row>
    </v-tab-item>

    <!-- Abilities & Skills -->
    <v-tab-item>
      <div class="text-subtitle-1 mt-5">
        Abilities
      </div>
      <v-divider class="mb-4" />
      <v-row>
        <v-col v-for="ability in ['str', 'dex', 'con', 'int', 'wis', 'cha']" :key="ability" cols="6" md="4">
          <me-cs-companion-debounced-text-input :value="companion[ability]" :label="ability.toUpperCase()" is-integer @set="updateCompanion(ability, $event)" />
        </v-col>
      </v-row>
      <div class="text-subtitle-1 mt-5">
        Saving Throws
      </div>
      <v-divider class="mb-4" />
      <v-row>
        <v-col cols="12">
          <me-cs-companion-select-input :items="abilities" :value="companion.savingThrows" multiple @set="updateCompanion('savingThrows', $event)" />
        </v-col>
      </v-row>
      <div class="text-subtitle-1 mt-5">
        Proficiency Bonus
      </div>
      <v-divider class="mb-4" />
      <v-row>
        <v-col cols="6">
          <me-cs-companion-debounced-text-input :value="companion.profBonus" is-integer @set="updateCompanion('profBonus', $event)" />
        </v-col>
      </v-row>
      <div class="text-subtitle-1 mt-5">
        Skills
      </div>
      <v-divider class="mb-4" />
      <v-row>
        <v-col cols="12">
          <me-cs-companion-select-input :items="skills" :value="companion.skills" multiple @set="updateCompanion('skills', $event)" />
        </v-col>
      </v-row>
    </v-tab-item>

    <!-- Defenses -->
    <v-tab-item>
      <div class="text-subtitle-1 mt-5">
        AC, HP & Shields
      </div>
      <v-divider class="mb-4" />
      <v-row>
        <v-col cols="6" md="3">
          <me-cs-companion-debounced-text-input :value="companion.ac" label="AC" is-integer @set="updateCompanion('ac', $event)" />
        </v-col>
        <v-col cols="6" md="3">
          <me-cs-companion-debounced-text-input :value="companion.hp" label="Hit Points" is-integer @set="updateCompanion('hp', $event)" />
        </v-col>
        <v-col cols="6" md="3">
          <me-cs-companion-debounced-text-input :value="companion.shields" label="Shields" is-integer @set="updateCompanion('shields', $event)" />
        </v-col>
        <v-col cols="6" md="3">
          <me-cs-companion-debounced-text-input :value="companion.regen" label="Shield Regen" is-integer @set="updateCompanion('regen', $event)" />
        </v-col>
      </v-row>
      <div class="text-subtitle-1 mt-5">
        Resistances, Vulnerabilities, and Immunities
      </div>
      <v-divider class="mb-4" />
      <v-row>
        <v-col cols="12" md="6">
          <me-cs-companion-select-input :items="damageTypes" label="Damage Resistances" :value="companion.dmgRes" multiple @set="updateCompanion('dmgRes', $event)" />
        </v-col>
        <v-col cols="12" md="6">
          <me-cs-companion-select-input :items="damageTypes" label="Damage Immunities" :value="companion.dmgImm" multiple @set="updateCompanion('dmgImm', $event)" />
        </v-col>
        <v-col cols="12" md="6">
          <me-cs-companion-select-input :items="conditions" label="Condition Immunities " :value="companion.conImm" multiple @set="updateCompanion('conImm', $event)" />
        </v-col>
        <v-col cols="12" md="6">
          <me-cs-companion-select-input :items="damageTypes" label="Damage Vulnerabilities " :value="companion.dmgVul" multiple @set="updateCompanion('dmgVul', $event)" />
        </v-col>
      </v-row>
    </v-tab-item>

    <!-- Speeds & Senses -->
    <v-tab-item>
      <div class="text-subtitle-1 mt-5">
        Speeds
      </div>
      <v-divider class="mb-4" />
      <v-row>
        <v-col cols="12">
          <template v-for="key in ['walk', 'swim', 'fly', 'burrow', 'climb']">
            <me-cs-companion-distance-input :key="`companion-speed-setting-${key}`" :value="companion.speed[key]" :label="$t(`speeds.${key}.title`)" @set="updateSpeed(key, $event)" />
          </template>
        </v-col>
      </v-row>
      <div class="text-subtitle-1 mt-5">
        Senses
      </div>
      <v-divider class="mb-4" />
      <v-row>
        <v-col cols="12">
          <template v-for="key in ['darkvision', 'tremorsense', 'blindsight', 'infrared-vision', 'truesight']">
            <me-cs-companion-distance-input :key="`companion-sense-setting-${key}`" :value="companion.senses[key]" :label="key.replace('-', ' ')" @set="updateSenses(key, $event)" />
          </template>
        </v-col>
      </v-row>
    </v-tab-item>

    <!-- Actions -->
    <v-tab-item>
      <div class="text-right">
        <v-btn @click="addFeature">
          Add Action
        </v-btn>
      </div>
      <v-expansion-panels focusable>
        <v-expansion-panel v-for="action in companion.features" :key="action.uuid">
          <v-expansion-panel-header>{{ action.name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="pa-2">
              <me-cs-companion-action-form :action="action" @update="updateFeatures(action.uuid, $event)" @remove="removeFeature(action.uuid)" />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-tab-item>

    <!-- Relevant Class Features -->
    <v-tab-item>
      <v-alert type="info" outlined>
        You must configure all companion attributes and attacks manually. This list is only displays features related to your companion.
      </v-alert>
      <me-cs-companion-features />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
import { DamageTypes } from '~/mixins/labels/DamageTypes'
export default {
  name: 'MeCsCompanionEditForm',
  mixins: [DamageTypes],
  props: {
    companion: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      abilities: [
        { text: 'Strength', value: 'str' },
        { text: 'Dexterity', value: 'dex' },
        { text: 'Constitution', value: 'con' },
        { text: 'Intelligence', value: 'int' },
        { text: 'Wisdom', value: 'wis' },
        { text: 'Charisma', value: 'cha' }
      ]
    }
  },
  computed: {
    activeTab: {
      get () {
        return this.$store.getters['character/navigation/companionTab']
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'companionTab', value })
      }
    },
    conditions () {
      return this.$store.getters.getData('conditions').filter(i => !['primed', 'indoctrinated', 'exhaustion', 'targeting', 'invisible'].includes(i.id)).map((i) => {
        return {
          text: i.name,
          value: i.id
        }
      })
    },
    skills () {
      return this.$store.getters.getData('skills').map((i) => {
        return {
          text: i.name,
          value: i.id
        }
      })
    }
  },
  methods: {
    updateCompanion (attr, value) {
      const updatedCompanion = JSON.parse(JSON.stringify(this.companion))
      updatedCompanion[attr] = value
      this.$store.dispatch('character/companion/UPDATE_COMPANION', updatedCompanion)
    },
    updateSpeed (key, value) {
      const updatedSpeed = JSON.parse(JSON.stringify(this.companion.speed))
      updatedSpeed[key] = value
      this.updateCompanion('speed', updatedSpeed)
    },
    updateSenses (key, value) {
      const updatedSenses = JSON.parse(JSON.stringify(this.companion.senses))
      updatedSenses[key] = value
      this.updateCompanion('senses', updatedSenses)
    },
    updateFeatures (uuid, newFeature) {
      const updatedFeatures = JSON.parse(JSON.stringify(this.companion.features))
      const index = updatedFeatures.findIndex(i => i.uuid === uuid)
      if (index > -1 && newFeature) {
        updatedFeatures.splice(index, 1, newFeature)
      }
      this.updateCompanion('features', updatedFeatures)
    },
    removeFeature (uuid) {
      const updatedFeatures = JSON.parse(JSON.stringify(this.companion.features))
      const index = updatedFeatures.findIndex(i => i.uuid === uuid)
      if (index > -1) {
        updatedFeatures.splice(index, 1)
      }
      console.log(updatedFeatures)
      this.updateCompanion('features', updatedFeatures)
    },
    addFeature () {
      const updatedFeatures = JSON.parse(JSON.stringify(this.companion.features))
      const baseFeature = {
        name: 'New Action',
        type: 'Action',
        dc: null,
        hit: null,
        shortRange: null,
        longRange: null,
        aoeType: null,
        aoeSize: null,
        dmgDieCount: null,
        dmgDieType: null,
        dmgType: null,
        resourceMax: null,
        resourceDisplay: null,
        remainingResources: null,
        description: null
      }
      const now = new Date()
      const uuid = `companion-feature-${now.getTime()}`
      baseFeature.uuid = uuid
      updatedFeatures.push(baseFeature)
      this.updateCompanion('features', updatedFeatures)
    }
  }
}
</script>
