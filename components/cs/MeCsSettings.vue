<template>
  <v-tabs-items v-model="tab" class="mt-5">
    <!-- defensive -->
    <v-tab-item>
      <v-row>
        <v-col>
          <v-text-field
            :value="character.settings.hp"
            hint="HP Override"
            clearable
            persistent-hint
            outlined
            dense
            type="number"
            :disabled="viewOnly"
            @change="change('hp', $event)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field
            :value="character.settings.acOverride"
            hint="AC Override"
            clearable
            persistent-hint
            outlined
            dense
            type="number"
            @change="change('acOverride', $event)"
          />
        </v-col>
        <v-col cols="8" class="d-flex d-md-block align-end">
          <v-slider
            :value="character.settings.acBonus"
            max="5"
            hint="AC Bonus"
            persistent-hint
            :thumb-label="$vuetify.breakpoint.smAndDown ? 'always' : undefined"
            :tick-labels="$vuetify.breakpoint.smAndDown ? undefined : [0, '+1', '+2', '+3', '+4', '+5']"
            :disabled="viewOnly"
            @end="change('acBonus', $event)"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            outlined
            dense
            :value="character.settings.regen"
            hint="Regen"
            persistent-hint
            type="number"
            :disabled="viewOnly"
            @change="change('regen', $event)"
          />
        </v-col>
        <v-col cols="8" class="d-flex d-md-block align-end">
          <v-slider
            :value="character.settings.shields"
            max="30"
            hint="Max Shields"
            persistent-hint
            :thumb-label="$vuetify.breakpoint.smAndDown ? 'always' : undefined"
            :tick-labels="$vuetify.breakpoint.smAndDown ? undefined : [0, 5, 10, 15, 20, 25, 30]"
            :step="5"
            :disabled="viewOnly"
            @change="change('shields', $event)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            label="Damage Resistances"
            :items="damageTypes"
            multiple
            chips
            deletable-chips
            small-chips
            :value="character.settings.damageRes"
            :disabled="viewOnly"
            @change="change('damageRes', $event)"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            label="Damage Immunities"
            :items="damageTypes"
            multiple
            chips
            deletable-chips
            small-chips
            :value="character.settings.damageImm"
            :disabled="viewOnly"
            @change="change('damageImm', $event)"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            label="Condition Immunities"
            :items="conditions"
            item-text="name"
            item-value="id"
            multiple
            chips
            deletable-chips
            small-chips
            :value="character.settings.conditionImm"
            :disabled="viewOnly"
            @change="change('conditionImm', $event)"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            label="Damage Vulnerabilities"
            :items="damageTypes"
            multiple
            chips
            deletable-chips
            small-chips
            :value="character.settings.damageVul"
            :disabled="viewOnly"
            @change="change('damageVul', $event)"
          />
        </v-col>
      </v-row>
    </v-tab-item>

    <!-- offensive -->
    <v-tab-item>
      <v-row>
        <v-col cols="12">
          <div>Attack Mods</div>
        </v-col>
        <v-col cols="12">
          <v-text-field
            :value="character.settings.attackMod"
            hint="All"
            clearable
            persistent-hint
            outlined
            dense
            :disabled="viewOnly"
            type="number"
            @change="change('attackMod', $event)"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            :value="character.settings.attackRangedMod"
            hint="Ranged"
            clearable
            persistent-hint
            outlined
            dense
            :disabled="viewOnly"
            type="number"
            @change="change('attackRangedMod', $event)"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            :value="character.settings.attackMeleeMod"
            hint="Melee"
            clearable
            persistent-hint
            outlined
            dense
            :disabled="viewOnly"
            type="number"
            @change="change('attackMeleeMod', $event)"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            :value="character.settings.attackSpellMod"
            hint="Spell"
            clearable
            persistent-hint
            outlined
            dense
            :disabled="viewOnly"
            type="number"
            @change="change('attackSpellMod', $event)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div>Damage Mods</div>
        </v-col>
        <v-col cols="12">
          <v-text-field
            :value="character.settings.damageMod"
            hint="All"
            clearable
            persistent-hint
            outlined
            dense
            :disabled="viewOnly"
            type="number"
            @change="change('damageMod', $event)"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            :value="character.settings.damageRangedMod"
            hint="Ranged"
            clearable
            persistent-hint
            outlined
            dense
            :disabled="viewOnly"
            type="number"
            @change="change('damageRangedMod', $event)"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            :value="character.settings.damageMeleeMod"
            hint="Melee"
            clearable
            persistent-hint
            outlined
            dense
            :disabled="viewOnly"
            type="number"
            @change="change('damageMeleeMod', $event)"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            :value="character.settings.damageSpellMod"
            hint="Spell"
            clearable
            persistent-hint
            outlined
            dense
            :disabled="viewOnly"
            type="number"
            @change="change('damageSpellMod', $event)"
          />
        </v-col>
      </v-row>
    </v-tab-item>

    <!-- powercasting -->
    <v-tab-item>
      <p>Assign whatever powercasting abilities you want to each class</p>
      <v-row>
        <v-col v-for="klass of character.classes" :key="`klass-pc-override-${klass.id}`" cols="12" sm="6">
          <div class="d-flex">
            <v-avatar tile size="52">
              <v-img
                :src="require(`~/assets/images/classes/${klass.id}.svg`)"
                position="right"
              />
            </v-avatar>
            <v-select
              :value="character.settings.powercasting[klass.id] || null"
              :items="powercastingOptions"
              :disabled="viewOnly"
              class="pl-2"
              clearable
              @change="change(`powercasting.${klass.id}`, $event)"
            >
              <template #label>
                <span class="text-capitalize">
                  {{ klass.id }}
                </span>
              </template>
            </v-select>
          </div>
        </v-col>
      </v-row>
    </v-tab-item>

    <!-- Ability scores -->
    <v-tab-item>
      <v-row>
        <v-col v-for="ability in ['str', 'dex', 'con', 'int', 'wis', 'cha']" :key="ability" cols="12" sm="6" md="4">
          <div class="text-subtitle-2">
            {{ $t(`abilities.${ability}.title`) }}
          </div>
          <div class="d-flex justify-space-around">
            <div>
              <v-text-field
                :value="character.abilityScores[ability].other"
                label="Bonus"
                outlined
                clearable
                dense
                type="number"
                :disabled="viewOnly"
                hide-details
                @change="updateAbility($event, ability, 'other')"
              />
            </div>
            <div>
              <v-text-field
                :value="character.abilityScores[ability].override"
                label="Override"
                outlined
                clearable
                dense
                type="number"
                :disabled="viewOnly"
                hide-details
                @change="updateAbility($event, ability, 'override')"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-tab-item>

    <!-- skills -->
    <v-tab-item>
      <template v-for="profSetting in profSettings">
        <v-select
          :key="profSetting.setting"
          :value="character.settings[profSetting.setting]"
          :items="profSetting.items"
          :label="profSetting.name"
          chips
          deletable-chips
          :disabled="viewOnly"
          multiple
          @change="change(profSetting.setting, $event)"
        />
      </template>
    </v-tab-item>

    <!-- Speed and senses -->
    <v-tab-item>
      <div class="text-h6 mb-3">
        Speed Overrides
      </div>
      <template v-for="(value, key) in character.settings.speeds">
        <v-slider
          :key="`speed-setting-${key}`"
          :value="value"
          :label="$t(`speeds.${key}.title`)"
          :step="5"
          :max="60"
          :disabled="viewOnly"
          @end="change(`speeds.${key}`, $event)"
        >
          <template #append>
            <me-distance v-if="value > 0" :length="value" abbr />
          </template>
          <template #thumb-label="{ value: newValue }">
            <me-distance v-if="newValue > 0" :length="newValue" abbr />
          </template>
        </v-slider>
      </template>

      <div class="text-h6 mb-3">
        Sense Overrides
      </div>
      <template v-for="(value, key) in character.settings.senses">
        <v-slider
          :key="`speed-sense-${key}`"
          :value="value"
          :step="30"
          :max="120"
          :disabled="viewOnly"
          @end="change(`senses.${key}`, $event)"
        >
          <template #label>
            <span class="text-capitalize">
              {{ key.replace('-', ' ') }}
            </span>
          </template>
          <template #append>
            <me-distance v-if="value > 0" :length="value" abbr />
          </template>
          <template #thumb-label="{ value: newValue }">
            <me-distance v-if="newValue > 0" :length="newValue" abbr />
          </template>
        </v-slider>
      </template>
    </v-tab-item>

    <v-tab-item>
      <me-cs-homebrew />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { DamageTypes } from '~/mixins/labels/DamageTypes'
const { mapGetters } = createNamespacedHelpers('character')

export default {
  name: 'MeCsSettings',
  mixins: [DamageTypes],
  computed: {
    ...mapGetters({ character: 'character', profs: 'profs/profs' }),
    tab: {
      get () {
        return this.$store.getters['character/navigation/settingsTab']
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'settingsTab', value })
      }
    },
    conditions () {
      return this.$store.getters.getData('conditions')
    },
    skills () {
      return this.$store.getters.getData('skills').map((i) => {
        return {
          text: i.name,
          value: i.id
        }
      })
    },
    toolProfs () {
      const items = []
      for (const prof of this.$store.getters.getData('tool-profs')) {
        if (prof.id === 'vehicles') {
          for (const vehicleType of ['air', 'land', 'space', 'water']) {
            const id = `vehicle-${vehicleType}`
            items.push({
              value: id,
              group: 'vehicle',
              text: `Vehicles: ${this.$options.filters.titlecase(vehicleType)}`
            })
          }
        } else {
          items.push({
            value: prof.id,
            text: prof.name,
            group: prof.type
          })
        }
      }
      return items
    },
    profSettings () {
      return [
        {
          name: 'Skill',
          items: this.skills,
          setting: 'skill'
        },
        {
          name: 'Expertise',
          items: this.skills,
          setting: 'expertise'
        },
        {
          name: 'Tool',
          items: this.toolProfs,
          setting: 'tool'
        },
        {
          name: 'Armor',
          items: Object.keys(this.$i18n.messages.en.armor_types)
            .filter(i => !i.endsWith('_title') && !i.endsWith('_armor'))
            .map((i) => {
              return {
                text: this.$t(`armor_types.${i}`),
                value: i
              }
            }),
          setting: 'armor'
        },
        {
          name: 'Weapon',
          items: Object.keys(this.$i18n.messages.en.weapon_types)
            .map((i) => {
              return {
                text: this.$tc(`weapon_types.${i}`, 2),
                value: i
              }
            }),
          setting: 'weapon'
        },
        {
          name: 'Saving Throw',
          items: ['str', 'dex', 'con', 'int', 'wis', 'cha']
            .map((i) => {
              return {
                text: this.$t(`abilities.${i}.title`),
                value: i
              }
            }),
          setting: 'savingThrow'
        }
      ]
    },
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    powercastingOptions () {
      return ['int', 'wis', 'cha'].map((i) => {
        return {
          value: i,
          text: this.$t(`abilities.${i}.title`)
        }
      })
    }
  },
  methods: {
    change (stat, value) {
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `settings.${stat}`, value })
    },
    updateAbility (value, ability, which) {
      let intVal = parseInt(value, 10)
      intVal = isNaN(intVal) ? 0 : intVal
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `abilityScores.${ability}.${which}`, value: intVal })
    }
  }
}
</script>
