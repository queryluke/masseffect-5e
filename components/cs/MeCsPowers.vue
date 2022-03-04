<template>
  <div>
    <!-- Power Mod -->
    <v-row no-gutters justify="space-around" justify-md="center">
      <v-col v-for="stat in ['mod','attack','dc']" :key="`statDisplay-${stat}`" :cols="pcStatsCols" sm="4" class="d-flex mt-1">
        <v-card outlined flat class="mx-auto" min-width="100">
          <div class="text-center d-flex justify-center">
            <div class="text-caption">
              <small>{{ statTitles[stat] }}</small>
            </div>
          </div>
          <div class="d-flex justify-center">
            <div v-for="info of groupedPowercastingAbilityStats" :key="`${info.ability}-${stat}-display`" class="px-2">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <div v-bind="attrs" class="d-flex align-center" v-on="on">
                    <div class="text-h6 text-uppercase">
                      <me-cs-die-roller v-if="stat == 'attack'" :input="'1d20'+rollText(info[stat])" :data="{title: statTitles[stat]}">
                        {{ info[stat] }}
                      </me-cs-die-roller>
                      <template v-else>
                        {{ info[stat] }}
                      </template>
                    </div>
                    <div v-if="groupedPowercastingAbilityStats.length > 1">
                      <v-avatar v-for="pcKlass in info.klasses" :key="`${info.ability}-${stat}-${pcKlass}-icon`" title size="22">
                        <v-img :src="require(`~/assets/images/classes/${pcKlass}.svg`)" />
                      </v-avatar>
                    </div>
                  </div>
                </template>
                <span class="text-capitalize">{{ info.klasses.join(', ') }}</span>
              </v-tooltip>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Points and slots -->
    <v-container>
      <v-row>
        <v-col v-if="powerSlots[1].max" cols="12" md="8">
          <div>Power Slots</div>
          <template v-for="(value, level) of powerSlots">
            <v-row
              v-if="value.max"
              :key="`powerslots-${level}`"
              align="center"
            >
              <v-col cols="2">
                {{ $t(`ordinal_numbers[${level}]`) }}
              </v-col>
              <v-col cols="10">
                <me-cs-action-resource-display-checkbox
                  :current="value.used"
                  :max="value.max"
                  @add="addPs(level)"
                  @remove="removePs(level)"
                  @set="setPs($event, level)"
                />
              </v-col>
            </v-row>
          </template>
        </v-col>
        <v-col v-if="techPoints.max" cols="12" md="4">
          <div>
            Tech Points (Limit {{ techPoints.limit }})
          </div>
          <me-cb-debounced-number-input
            :current="currentTp"
            :max="techPoints.max"
            @add="addTp"
            @remove="removeTp"
            @set="setTp"
          />
        </v-col>
      </v-row>
    </v-container>

    <div class="text-right">
      <v-btn
        color="primary"
        class="ma-0"
        x-small
        :disabled="viewOnly"
        @click="managerDialog = true"
      >
        Manage
      </v-btn>
    </div>

    <!-- Powers -->
    <v-row no-gutters>
      <v-col>
        <template v-for="(powerList, index) in powersByLevel">
          <div v-if="powerList.powers.length" :key="`powers-at-level-${index}`">
            <div class="d-flex justify-space-between align-center">
              <div class="text-subtitle-2 mt-5">
                {{ powerList.title }}
              </div>
            </div>
            <me-hr size="1" />
            <me-cs-action-card
              v-for="(item, itemIndex) in powerList.powers"
              :key="`powerslist-at-level-${itemIndex}`"
              show-casting-time
              :item="item"
              class="mt-1"
            />
          </div>
        </template>
      </v-col>
    </v-row>

    <!-- manage dialog -->
    <me-standard-dialog :shown="managerDialog" max-height="700" @close="managerDialog = false">
      <template #title>
        Manage Powers
      </template>
      <v-expansion-panels>
        <template v-for="klass in klasses">
          <me-cs-klass-power-select :key="klass.id" :klass="klass" />
        </template>
        <!-- TEMP: old builder -->
        <v-expansion-panel v-if="unlinkedPowers.length">
          <v-expansion-panel-header>
            Powers Not Linked To a Class ({{ unlinkedPowers.length }})
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <template v-for="item in unlinkedPowers">
              <me-cs-power-select-card
                :key="item.id"
                :item="item"
                @togglePower="removeUnlinkedPower"
              />
            </template>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </me-standard-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsPowers',
  mixins: [ScoreText],
  data () {
    return {
      managerDialog: false,
      statTitles: {
        mod: 'Modifier',
        attack: 'Power Attack',
        dc: 'Save DC'
      }
    }
  },
  computed: {
    ...mapGetters({
      character: 'character',
      profBonus: 'profBonus',
      techPoints: 'powers/techPoints',
      powerSlots: 'powers/powerSlots',
      powers: 'powers/powers',
      klassPowercastingAbilities: 'powers/klassPowercastingAbilities',
      chaMod: 'abilities/chaMod',
      intMod: 'abilities/intMod',
      wisMod: 'abilities/wisMod',
      klasses: 'klasses/klasses'
    }),
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    powercastingAbilityOptions () {
      return ['wis', 'int', 'cha'].map((i) => {
        return {
          text: this.$t(`abilities.${i}.title`),
          value: i
        }
      })
    },
    groupedPowercastingAbilityStats () {
      const pca = {}
      for (const [klass, ability] of Object.entries(this.klassPowercastingAbilities)) {
        if (!ability) {
          continue
        }
        if (pca[ability]) {
          pca[ability].klasses.push(klass)
        } else {
          const base = this.profBonus + this[`${ability}Mod`]
          pca[ability] = {
            ability,
            mod: this.modText(base),
            attack: this.modText(base + this.character.settings.attackSpellMod),
            dc: base + 8,
            klasses: [klass]
          }
        }
      }
      return Object.values(pca)
    },
    pcStatsCols () {
      const length = this.groupedPowercastingAbilityStats.length
      return length > 2 ? 12 : length > 1 ? 6 : 4
    },
    powerAttackMod () {
      return this.profBonus + this.pcMod + this.character.settings.attackSpellMod
    },
    powerDc () {
      return 8 + this.powerAttackMod
    },
    currentTp () {
      return this.techPoints.max - this.techPoints.used
    },
    powersByLevel () {
      const pbl = {}
      for (const [level, title] of this.$store.state.character.powers.levelText.entries()) {
        pbl[level] = {
          title,
          powers: this.powers.filter(i => i.level === level)
        }
      }
      return pbl
    },
    unlinkedPowers () {
      return this.character.powers.filter(i => !i.klass).map((i) => {
        return {
          ...this.$store.getters.getItem('powers', i.id),
          ...i,
          learned: true
        }
      })
    }
  },
  methods: {
    // These are technically "backwards" because adding TP = removing tp used
    addTp () {
      const value = Math.max(0, this.techPoints.used - 1)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.tpUsed', value })
    },
    removeTp () {
      const value = Math.min(this.techPoints.max, this.techPoints.used + 1)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.tpUsed', value })
    },
    setTp (v) {
      // set value is 5...meaning they want current tp (max - used) to = 5
      // so we want 7 - x = 5
      // x = (value - max) * -1
      const value = Math.max(0, ((v - this.techPoints.max) * -1))
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.tpUsed', value })
    },
    addPs (level) {
      const value = Math.min(this.powerSlots[level].max, this.powerSlots[level].used + 1)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.psUsed.${level - 1}`, value })
    },
    removePs (level) {
      const value = Math.max(0, this.powerSlots[level].used - 1)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.psUsed.${level - 1}`, value })
    },
    setPs (value, level) {
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.psUsed.${level - 1}`, value })
    },
    upsertKlassPowercastingAbility (value, klass) {
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `settings.powercasting.${klass}`, value })
    },
    removeUnlinkedPower (id) {
      const cloned = this.character.powers.slice()
      const index = cloned.findIndex(i => i.id === id && !i.klass)
      if (index > -1) {
        cloned.splice(index, 1)
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'powers', value: cloned })
      }
    }
  }
}
</script>
