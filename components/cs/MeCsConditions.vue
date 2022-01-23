<template>
  <div @click="conditionDialog = true ">
    <div class="text-overline">
      Conditions
    </div>
    <me-cs-defense-item :item="immunities" class="my-1" />
    <div v-if="hasActiveConditions">
      <div v-if="csExhaustion">
        <me-condition id="exhaustion" label="Exhaustion" />: {{ csExhaustion }}
      </div>
      <div v-if="csIndoctrination">
        <me-condition id="indoctrination" label="Indoctrination" />: {{ csIndoctrination }}
      </div>
      <div v-for="cond in character.currentStats.conditions" :key="`active-condition-${cond}`">
        <me-condition :id="cond" :label="conditionsTextMap[cond]" />
      </div>
    </div>
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
        <v-card-text class="mt-6">
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
              <v-col :key="`con-toggle-${condition.id}`" cols="4" sm="3">
                <v-switch
                  :input-value="conditionValue(condition.id)"
                  messages="{}"
                  :disabled="hasImmunity(condition.id)"
                  @change="toggleCondition(condition.id, $event)"
                >
                  <template #message>
                    <div class="mt-n2 text-body-2">
                      <span v-if="hasImmunity(condition.id)" class="text-decoration-line-through">
                        {{ condition.name }}
                      </span>
                      <me-condition v-else :id="condition.id" :label="condition.name" />
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
      conditionDialog: false
    }
  },
  computed: {
    immunities () {
      return this.getIrvObject('condition-immunity')
    },
    hasActiveConditions () {
      return this.character.currentStats.conditions.length > 0 || this.csExhaustion > 0 || this.csIndoctrination > 0
    },
    toggleableConditions () {
      return this.conditions.filter(i => !['exhaustion', 'indoctrinated'].includes(i.id))
    },
    csExhaustion: {
      get () {
        return this.character.currentStats.exhaustion
      },
      set (value) {
        this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'currentStats.exhaustion', value })
      }
    },
    csIndoctrination: {
      get () {
        return this.character.currentStats.indoctrination
      },
      set (value) {
        this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'currentStats.indoctrination', value })
      }
    }
  },
  methods: {
    conditionValue (id) {
      return this.character.currentStats.conditions.includes(id) ? 1 : 0
    },
    hasImmunity (id) {
      return this.immunities.values.includes(id)
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
      this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'currentStats.conditions', value })
    }
  }
}
</script>
