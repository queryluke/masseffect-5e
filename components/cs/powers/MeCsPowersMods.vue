<template>
  <div>
    <!-- Power Mod -->
    <v-row no-gutters justify="space-around" justify-md="center">
      <v-col v-for="stat in ['mod','attack','dc']" :key="`statDisplay-${stat}`" :cols="pcStatsCols" sm="4" class="d-flex mt-1">
        <v-card flat class="mx-auto" min-width="100">
          <div class="text-center d-flex justify-center">
            <div class="text-caption">
              <small>{{ statTitles[stat] }}</small>
            </div>
          </div>
          <div class="d-flex justify-center mt-n1">
            <div v-for="info of groupedPowercastingAbilityStats" :key="`${info.ability}-${stat}-display`" class="px-2">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <div v-bind="attrs" class="d-flex align-center" v-on="on">
                    <div class="text-h6 text-uppercase">
                      {{ info[stat] }}
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
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsPowersMods',
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
      klassPowercastingAbilities: 'powers/klassPowercastingAbilities',
      chaMod: 'abilities/chaMod',
      intMod: 'abilities/intMod',
      wisMod: 'abilities/wisMod'
    }),
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
            mod: this.modText(this[`${ability}Mod`]),
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
    }
  }
}
</script>
