<template>
  <v-card height="100%" flat>
    <v-expansion-panels flat>
      <v-expansion-panel v-for="group in csOverrides" :key="group.name">
        <v-expansion-panel-header>
          {{ group.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-for="item in group.items" :key="item.key">
            <v-text-field
              v-if="['text', 'number'].includes(item.type)"
              :value="settings[item.key]"
              :hint="item.label"
              persistent-hint
              clearable
              outlined
              dense
              :type="item.type"
              :disabled="viewOnly"
              @change="change(item.key, $event)"
            />
            <v-slider
              v-if="item.type === 'slider'"
              :value="settings[item.key]"
              :max="item.max"
              :hint="item.label"
              persistent-hint
              :disabled="viewOnly"
              @end="change('acBonus', $event)"
            />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- consumables manager
    <template v-for="group in csOverrides">
      <v-list-item :key="`${group.name}-toggle`" @click="expand(group.name)">
        <v-list-item-content>
          <v-list-item-title>
            {{ group.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon>
            mdi-chevron-{{ expanded === group.name ? 'up' : 'down' }}
          </v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-expand-transition :key="`${group.name}-transition`">
        <div v-if="expanded === group.name">
          <div v-for="item in group.items" :key="item.key">
            <v-text-field
              v-if="['text', 'number'].includes(item.type)"
              :value="settings[item.key]"
              :label="item.label"
              clearable
              outlined
              dense
              :type="item.type"
              :disabled="viewOnly"
              @change="change(item.key, $event)"
            />
          </div>
          <div />
        </div>
      </v-expand-transition>
      <v-divider :key="`${group.name}-divider`" />
    </template>
    -->
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { CsOverrides } from '~/mixins/character/csOverrides'
import { DamageTypes } from '~/mixins/labels/DamageTypes'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsCharacterOverrideSideNav',
  mixins: [CsOverrides, DamageTypes],
  data () {
    return {
      expanded: null
    }
  },
  computed: {
    ...mapGetters(['settings']),
    viewOnly () {
      return this.$store.state.character.viewOnly
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
    expand (value) {
      this.expanded = this.expanded === value ? null : value
    },
    getItems (key) {
      return this[key]
    },
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
