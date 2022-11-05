<template>
  <div>
    <v-row no-gutters>
      <v-col v-for="ability in ['str', 'dex', 'con', 'int', 'wis', 'cha']" :key="ability" cols="4" sm="2">
        <v-card outlined flat class="pa-2 text-center ma-2 mx-sm-1">
          <div class="text-caption">
            {{ $t(`abilities.${ability}.abbr`) }}
          </div>
          <div class="d-flex justify-center align-center">
            <div v-if="['str', 'dex'].includes(ability) && disadvantageFromHeavierArmor" class="ml-n5">
              <me-cs-ad-icon type="d">
                from Armor
              </me-cs-ad-icon>
            </div>
            <me-cs-roll-card :roll="roll(ability)">
              <div class="text-h6">
                {{ modText(abilityBreakdown[ability].mod) }}
              </div>
            </me-cs-roll-card>
          </div>
          <div>
            {{ abilityBreakdown[ability].total }}
          </div>
        </v-card>
      </v-col>
    </v-row>
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
  mixins: [ScoreText],
  data () {
    return {
      rollCardProps: {
        outlined: true,
        flat: true,
        class: 'pa-2 text-center ma-2 mx-sm-1'
      }
    }
  },
  computed: {
    ...mapGetters({ abilityBreakdown: 'abilities/abilityBreakdown', disadvantageFromHeavierArmor: 'profs/disadvantageFromHeavierArmor' })
  },
  methods: {
    roll (ability) {
      return {
        notation: `1d20${this.rollText(this.abilityBreakdown[ability].mod)}`,
        detail: this.$t(`abilities.${ability}.abbr`),
        type: 'check'
      }
    }
  }
}
</script>
