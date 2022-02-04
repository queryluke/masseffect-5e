<template>
  <v-card flat outlined max-width="700px" class="mx-auto">
    <v-card flat color="transparent" @click="show = !show">
      <v-card-text>
        <v-list-item two-line class="px-0 px-sm-3">
          <v-list-item-avatar v-if="$vuetify.breakpoint.smAndUp" tile>
            <v-img :src="require(`~/assets/images/classes/${klass.id}.svg`)" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ klass.data.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $t('level_nth', { nth: $t(`ordinal_numbers[${klassLevel}]`) }) }}{{ subclassLabel }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action v-if="$vuetify.breakpoint.smAndUp">
            <me-cb-class-remove-btn :item="klass" />
          </v-list-item-action>
        </v-list-item>
      </v-card-text>
    </v-card>
    <v-expand-transition>
      <v-card-text v-show="show">
        <v-row>
          <v-col>
            <v-btn class="mr-2" :to="`/classes/${klass.id}`" target="_blank">
              View Class Details
            </v-btn>
          </v-col>
          <v-col>
            <div class="text-h6">
              Number of Levels in this Class
            </div>
            <v-select
              v-model="klassLevel"
              class="ms-2 flex"
              :items="availableLevels"
            />
          </v-col>
          <v-col v-if="$vuetify.breakpoint.xsOnly" class="text-right">
            <me-cb-class-remove-btn :item="klass" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-expansion-panels>
              <!-- levels -->
              <me-cb-aspect-card>
                <template #title>
                  Hit Points
                </template>
                <template #subtitle>
                  1st Level
                </template>
                <template #description>
                  <me-class-hit-points :item="klass.data" />
                </template>
                <v-switch
                  v-model="klassHpOverride"
                  label="Rolled HP"
                />
                <div v-if="klassHpOverride">
                  <v-row class="hpSlots">
                    <v-col
                      v-for="(hp, index) in klass.hitPoints"
                      :key="index"
                      cols="2"
                    >
                      <v-select
                        :items="hpArray"
                        :value="klass.hitPoints[index]"
                        :label="'Lvl. ' + (index + 1)"
                        :readonly="index === 0"
                        :disabled="index === 0"
                        @change="updateHp($event, index)"
                      />
                    </v-col>
                  </v-row>
                </div>
              </me-cb-aspect-card>
              <!-- Profs -->
              <me-cb-aspect-card :asm-override="{ has: true, value: allProfSelectionsMade }">
                <template #title>
                  Proficiencies
                </template>
                <template #subtitle>
                  1st Level
                </template>
                <v-row v-for="(profObj, profKey) in klass.data.profs" :key="profKey">
                  <v-col v-if="profObj.has || profObj.choices">
                    <div class="text-subtitle">
                      {{ profLabel(profKey) }}
                    </div>
                    <div class="d-flex flex-wrap align-">
                      <div v-if="profObj.has">
                        <template v-for="prof in profObj.has">
                          <v-chip
                            :key="prof"
                            class="mr-3 mt-5"
                            small
                          >
                            {{ profText(profKey, prof) }}
                          </v-chip>
                        </template>
                      </div>
                      <div class="flex-grow-1 mt-n1">
                        <me-cb-aspect-selectable
                          v-if="profObj.choices"
                          :mechanic="{type: `${profKey}-choice`, limit: profObj.choices.items, selections: profObj.choices.count}"
                          :path="`klass/${klass.id}`"
                          no-label
                        />
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </me-cb-aspect-card>
              <!-- Sentinel Pc Ability Choice -->
              <me-cb-aspect-card v-if="klass.id === 'sentinel'" :asm-override="{ has: true, value: sentinelPcSelection }">
                <template #title>
                  Sentinel Powercasting Ability
                </template>
                <template #subtitle>
                  1st Level
                </template>
                <template #description>
                  &nbsp;
                </template>
                <v-select
                  v-model="sentinelPcSelection"
                  :items=" [{ text: 'Intelligence', value: 'int'}, { text: 'Wisdom', value: 'wis'}]"
                  dense
                  label="Choose Intelligence or Wisdom"
                />
              </me-cb-aspect-card>

              <template v-for="(aspect, index) of klassAspects">
                <me-cb-class-asi-picker
                  v-if="aspect.type === 'klass-asi'"
                  :key="`api-picker-${index}`"
                  :klass-index="klassIndex"
                  :level="aspect.level"
                />
                <me-cb-aspect-card
                  v-else-if="aspect.type === 'klass-subclass'"
                  :key="`subclass-picker-${index}`"
                  :asm-override="{ has: true, value: !!subklass }"
                  :aspect="aspect"
                >
                  <v-select v-model="subklass" :items="availableSubclasses" dense item-text="name" item-value="id" />
                </me-cb-aspect-card>
                <me-cb-aspect-card v-else :key="`aspect-${index}`" :aspect="aspect" />
              </template>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ProfLabels } from '~/mixins/labels/ProfLabels'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCbClassCard',
  mixins: [ProfLabels],
  props: {
    klassIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      klasses: 'klasses/klasses',
      level: 'klasses/level',
      selected: 'selections/selected',
      klassesFeatures: 'klasses/klassesFeatures',
      subklassesList: 'klasses/subklassesList',
      character: 'character'
    }),
    klass () {
      return this.klasses[this.klassIndex]
    },
    availableLevels () {
      const posLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      return posLevels.slice(0, posLevels.length - this.level + this.klassLevel)
    },
    allProfSelectionsMade () {
      const profs = ['skill', 'weapon', 'tool']
      for (const prof of profs) {
        const count = this.klass.data.profs[prof]?.choices?.count
        if (!count) {
          continue
        }
        const made = this.selected.find(i => i.path === `klass/${this.klass.id}/${prof}`)
        if (!made || made?.value.length < count) {
          return false
        }
      }
      return true
    },
    klassLevel: {
      get () {
        return this.klass.levels
      },
      set (value) {
        let hp = this.klass.hitPoints.slice()
        if (this.klassLevel < value) {
          let i = value
          const adder = Math.ceil((this.klass.data.hitDie + 1) / 2)
          while (this.klassLevel <= i) {
            hp.push(adder)
            i--
          }
        } else {
          hp = hp.slice(0, value)
        }
        this.updateKlass('levels', value)
        this.updateKlass('hitPoints', hp)
      }
    },
    klassHpOverride: {
      get () {
        return this.klass.hpOverride
      },
      set (value) {
        this.updateKlass('hpOverride', value)
      }
    },
    subklass: {
      get () {
        return this.klass.subclass
      },
      set (value) {
        this.updateKlass('subclass', value)
      }
    },
    availableSubclasses () {
      return this.subklassesList.filter(i => i.klass === this.klass.id)
    },
    hpArray () {
      const hpArr = []
      for (let i = 1; i <= this.klass.data.hitDie; i++) {
        hpArr.push(i)
      }
      return hpArr
    },
    subclassLabel () {
      return this.klass.subclass ? `, ${this.klass.subclassData.name}` : ''
    },
    features () {
      return this.klassesFeatures[this.klassIndex]
    },
    klassAspects () {
      const klassAsis = this.klass.data.progression.abi
      const finalArray = []
      const klassFirstSubclassLevel = this.klass.data.progression.subclass[0]
      for (let i = 1; i <= this.klassLevel; i++) {
        const subtitle = `${this.$t(`ordinal_numbers[${i}]`)} Level`
        // ASIs
        if (klassAsis.includes(i)) {
          finalArray.push({
            type: 'klass-asi',
            level: i,
            subtitle
          })
        }
        // Subclass
        if (klassFirstSubclassLevel === i) {
          finalArray.push({
            type: 'klass-subclass',
            level: i,
            subtitle,
            mechanics: [],
            name: 'Subclass',
            html: '<p>Choose a subclass</p>'
          })
        }
        const featuresAtLevel = this.features.filter(feature => feature.level === i).map((feature) => {
          return {
            ...feature,
            subtitle
          }
        })
        finalArray.push(...featuresAtLevel)
      }
      return finalArray
    },
    sentinelPcSelection: {
      get () {
        return this.character.settings.powercasting.sentinel
      },
      set (value) {
        return this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'settings.powercasting.sentinel', value })
      }
    }
  },
  methods: {
    updateHp (value, index) {
      this.updateKlass(`hitPoints.${index}`, value)
    },
    updateKlass (attr, value) {
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `classes.${this.klassIndex}.${attr}`, value })
    }
  }
}
</script>
