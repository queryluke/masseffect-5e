<template>
  <div>
    <me-character-sheet-card-title v-if="$vuetify.breakpoint.smAndDown">
      Settings
    </me-character-sheet-card-title>
    <v-chip-group v-model="tab" active-class="primary--text" column>
      <v-chip
        v-for="(cTab, index) in tabs"
        :key="`feature-chip-tab-${index}`"
        small
      >
        {{ cTab }}
      </v-chip>
    </v-chip-group>

    <!-- defensive -->
    <v-tabs-items v-model="tab" class="mt-5">
      <v-tab-item>
        <v-row class="mt-8 mt-md-0">
          <v-col cols="4" md="2">
            <v-text-field
              :value="character.settings.acOverride"
              hint="AC Override"
              clearable
              persistent-hint
              outlined
              dense
              @change="change('acOverride', $event)"
            />
          </v-col>
          <v-col cols="8" md="4" class="d-flex d-md-block align-end">
            <v-slider
              :value="character.settings.acBonus"
              max="5"
              hint="AC Bonus"
              persistent-hint
              :thumb-label="$vuetify.breakpoint.smAndDown ? 'always' : undefined"
              :tick-labels="$vuetify.breakpoint.smAndDown ? undefined : [0, '+1', '+2', '+3', '+4', '+5']"
              @change="change('acBonus', $event)"
            />
          </v-col>
          <v-col cols="4" md="2">
            <v-text-field
              outlined
              dense
              :value="character.settings.regen"
              hint="Regen"
              persistent-hint
              @change="change('regen', $event)"
            />
          </v-col>
          <v-col cols="8" md="4" class="d-flex d-md-block align-end">
            <v-slider
              :value="character.settings.shields"
              max="30"
              hint="Max Shields"
              persistent-hint
              :thumb-label="$vuetify.breakpoint.smAndDown ? 'always' : undefined"
              :tick-labels="$vuetify.breakpoint.smAndDown ? undefined : [0, 5, 10, 15, 20, 25, 30]"
              :step="5"
              @change="change('shields', $event)"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              label="Damage Resistances"
              :items="damageTypes"
              multiple
              chips
              deletable-chips
              small-chips
              :value="character.settings.damageRes"
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
              @change="change('damageSpellMod', $event)"
            />
          </v-col>
        </v-row>
      </v-tab-item>

      <!-- Ability scores -->
      <v-tab-item>
        <v-row>
          <template v-for="ability in ['str', 'dex', 'con', 'int', 'wis', 'cha']">
            <v-col :key="ability" cols="12" sm="6" md="4">
              <me-character-sheet-ability-edit :ability="ability" />
            </v-col>
          </template>
        </v-row>
      </v-tab-item>

      <!-- skills -->
      <v-tab-item>
        <v-autocomplete
          v-model="customSkills"
          item-text="name"
          item-value="id"
          :items="skills"
          label="Custom Skill Proficiencies"
          chips
          deletable-chips
          multiple
        />
        <v-autocomplete
          v-model="customExpertise"
          item-text="name"
          item-value="id"
          :items="skills"
          label="Custom Expertise"
          chips
          deletable-chips
          multiple
        />
      </v-tab-item>

      <!-- other profs -->
      <v-tab-item>
        <me-character-builder-prof-picker source="custom" :options="{ profType: 'armor', choices: { items: ['light', 'medium', 'heavy'], count: 999 }}" no-counter />
        <me-character-builder-prof-picker source="custom" :options="{ profType: 'weapon', choices: { items: ['assault_rifle', 'heavy_pistol', 'melee', 'shotgun', 'smg', 'sniper_rifle'], count: 999 }}" no-counter />
        <me-character-builder-prof-picker source="custom" :options="{ profType: 'tool', choices: { items: toolProfs.map(i => i.id), count: 999 }}" no-counter />
        <me-character-builder-prof-picker source="custom" :options="{ profType: 'savingThrow', choices: { items: ['str', 'dex', 'con', 'int', 'wis', 'cha'], count: 999 }}" no-counter />
      </v-tab-item>

      <!-- Speed and senses -->
      <v-tab-item>
        <v-text-field
          v-model="speedBonus"
          hint="Speed Bonus"
          clearable
          persistent-hint
          outlined
          dense
        />
        <template v-for="(senseValue, senseKey) of character.settings.senses">
          <v-row :key="`switch-${senseKey}`">
            <v-col cols="6">
              <v-switch
                :input-value="senseValue > 0"
                :label="$t(`senses.${senseKey}_title`)"
                @change="toggleSense(senseKey, $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="character.settings.senses[senseKey]"
                :value="$store.getters['user/imperial'] ? character.settings.senses[senseKey] : ftToM(character.settings.senses[senseKey])"
                :hint="`${$t(`senses.${senseKey}_title`)} Distance`"
                persistent-hint
                outlined
                dense
                @change="changeSense(senseKey, $event)"
              />
            </v-col>
          </v-row>
        </template>
      </v-tab-item>

      <v-tab-item>
        <me-character-sheet-homebrew />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      tab: 0,
      tabs: ['Defensive', 'Offensive', 'Ability Scores', 'Skills', 'Other Profs', 'Speed & Senses', 'Custom']
    }
  },
  computed: {
    speedBonus: {
      get () {
        if (this.$store.getters['user/imperial'] || this.character.settings.speedBonus === 0) {
          return this.character.settings.speedBonus
        } else {
          return this.ftToM(this.character.settings.speedBonus)
        }
      },
      set (value) {
        if (this.$store.getters['user/imperial']) {
          this.change('speedBonus', value)
        } else {
          this.change('speedBonus', this.mToFt(value))
        }
      }
    },
    customSkills: {
      get () {
        return this.character.settings.skills
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'settings.skills', value })
      }
    },
    customExpertise: {
      get () {
        return this.character.settings.expertise
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'settings.expertise', value })
      }
    }
  },
  methods: {
    change (stat, value) {
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `settings.${stat}`, value })
    },
    toggleSense (key, value) {
      const newValue = value ? 30 : false
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `settings.senses.${key}`, value: newValue })
    },
    changeSense (key, value) {
      const newValue = this.$store.getters['user/imperial'] ? value : this.mToFt(value)
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `settings.senses.${key}`, value: newValue })
    },
    ftToM (value) {
      if (value) {
        return (parseFloat(value) / 5) * 2
      }
      return 0
    },
    mToFt (value) {
      if (value) {
        return (parseFloat(value) / 2) * 5
      }
      return 0
    }
  }
}
</script>
