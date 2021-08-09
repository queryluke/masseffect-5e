<template>
  <div>
    <div class="d-flex justify-center">
      <v-btn :disabled="!hasDefenses" x-small color="primary" class="mr-1" @click="defenseDialog = true">
        Defenses<span v-if="hasDefenses">*</span>
      </v-btn>
      <v-btn :color="hasActiveConditions ? 'secondary' : 'primary'" x-small @click="conditionDialog = true">
        Conditions<span v-if="hasActiveConditions">*</span>
      </v-btn>
    </div>
    <v-dialog v-model="defenseDialog" :fullscreen="$vuetify.breakpoint.xsOnly" max-width="500">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            Defenses
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon @click="defenseDialog = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <template v-for="(defenseValues, defenseType) of csDefenses">
            <v-list v-if="defenseValues.length > 0" :key="`def-title-${defenseType}`" dense>
              <v-subheader>
                {{ defenseTypes[defenseType] }}
              </v-subheader>
              <v-list-item v-for="defense of defenseValues" :key="`def-${defense}-${defenseType}`">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ defenseTypeText(defenseType, defense.id) }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="defense.note">
                    {{ defense.note }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </template>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="conditionDialog" :fullscreen="$vuetify.breakpoint.xsOnly" max-width="500">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            Active Conditions
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon @click="conditionDialog = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5">
          <v-row>
            <v-col cols="6">
              <v-slider
                v-model="csExhaustion"
                max="6"
                thumb-label="always"
                thumb-size="19"
                messages="{}"
              >
                <template #message>
                  <div class="mt-n3 text-body-2">
                    <me-condition id="exhaustion" label="Exhaustion" />
                  </div>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="6">
              <v-slider
                v-model="csIndoctrination"
                max="6"
                thumb-label="always"
                thumb-size="19"
                messages="{}"
                class="mb-0"
              >
                <template #message>
                  <div class="mt-n3 text-body-2">
                    <me-condition id="indoctrinated" label="Indoctrination" />
                  </div>
                </template>
              </v-slider>
            </v-col>
          </v-row>
          <v-row>
            <template v-for="condition of toggleableConditions">
              <v-col :key="`con-toggle-${condition.id}`" cols="3">
                <v-switch
                  :input-value="conditionValue(condition.id)"
                  messages="{}"
                  @change="toggleCondition(condition.id, $event)"
                >
                  <template #message>
                    <div class="mt-n2 text-body-2">
                      <me-condition :id="condition.id" :label="condition.name" />
                    </div>
                  </template>
                </v-switch>
              </v-col>
            </template>
          </v-row>
        </v-card-text>
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
      defenseDialog: false,
      conditionDialog: false,
      defenseTypes: {
        damageRes: 'Resistances',
        damageImm: 'Immunities',
        conditionImm: 'Condition Immunities',
        damageVul: 'Vulnerabilities'
      }
    }
  },
  computed: {
    hasDefenses () {
      return Object.entries(this.csDefenses).some(i => i[1].length > 0)
    },
    hasActiveConditions () {
      return this.character.currentStats.conditions.length > 0 || this.csExhaustion > 0 || this.csIndoctrination > 0
    },
    csDefenses () {
      const defenses = {
        damageImm: [],
        damageRes: [],
        conditionImm: [],
        damageVul: []
      }
      const selectionDefenses = this.character.selections.filter(i => i.type === 'defenses')
      for (const defense of selectionDefenses) {
        const item = { id: defense.has.id, note: defense.has.note || null }
        switch (defense.subType) {
          case 'resistance':
            defenses.damageRes.push(item)
            break
          case 'immunity':
            defenses.damageImm.push(item)
            break
          case 'condition':
            defenses.conditionImm.push(item)
            break
          case 'vulnerability':
            defenses.damageVul.push(item)
        }
      }
      for (const key in defenses) {
        if (this.character.settings[key] && this.character.settings[key].length > 0) {
          defenses[key] = defenses.key.concat(this.character.settings[key].map((i) => {
            return {
              id: i.id
            }
          }))
        }
      }
      return defenses
    },
    conditionsTextMap () {
      const text = {}
      for (const condition of this.conditions) {
        text[condition.id] = condition.name
      }
      return text
    },
    toggleableConditions () {
      return this.conditions.filter(i => !['exhaustion', 'indoctrinated'].includes(i.id))
    },
    csExhaustion: {
      get () {
        return this.character.currentStats.exhaustion
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'currentStats.exhaustion', value })
      }
    },
    csIndoctrination: {
      get () {
        return this.character.currentStats.indoctrination
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'currentStats.indoctrination', value })
      }
    }
  },
  methods: {
    defenseTypeText (type, id) {
      return type === 'conditionImm' ? this.conditionsTextMap[id] : this.$t(`damage_types.${id}_title`)
    },
    conditionValue (id) {
      return this.character.currentStats.conditions.includes(id) ? 1 : 0
    },
    toggleCondition (id, toggle) {
      const value = [...this.character.currentStats.conditions]
      const existingIndex = value.indexOf(id)
      if (existingIndex > -1 && !toggle) {
        value.splice(existingIndex, 1)
      }
      if (existingIndex === -1 && toggle) {
        value.push(id)
      }
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'currentStats.conditions', value })
    }
  }
}
</script>
