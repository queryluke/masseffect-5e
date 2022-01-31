<template>
  <div>
    <v-row>
      <v-col v-for="ability in ['str', 'dex', 'con', 'int', 'wis', 'cha']" :key="ability" cols="4" md="2" class="px-md-2">
        <v-card outlined elevation="0">
          <v-card-text class="pa-2 text-center">
            <div class="text-caption">
              {{ $t(`abilities.${ability}.abbr`) }}
            </div>
            <div class="text-h6">
              {{ modText(abilityBreakdown[ability].mod) }}
            </div>
            <div>
              {{ abilityBreakdown[ability].total }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'
const { mapGetters } = createNamespacedHelpers('character/abilities')
export default {
  mixins: [ScoreText],
  computed: {
    ...mapGetters(['abilityBreakdown'])
  }
}
</script>
