<template>
  <div>
    <v-row no-gutters>
      <v-col v-for="ability in ['str', 'dex', 'con', 'int', 'wis', 'cha']" :key="ability" cols="4" sm="2">
        <v-card outlined flat class="pa-2 text-center ma-2 mx-sm-1">
          <div class="text-caption">
            {{ $t(`abilities.${ability}.abbr`) }}
          </div>
          <div class="text-h6">
            {{ modText(abilityBreakdown[ability].mod) }}
          </div>
          <div>
            {{ abilityBreakdown[ability].total }}
          </div>
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
