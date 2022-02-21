<template>
  <v-row class="text-center" no-gutters>
    <v-col cols="12" class="text-caption text-md-subtitle-2 d-flex align-center justify-center" :class="csTextColor('shields')">
      {{ shields.max ? `${shields.current} / ${shields.max}` : '-' }}
      <v-icon :color="csBgColor('shields')" size="12" class="pl-1">
        mdi-shield
      </v-icon>
    </v-col>
    <v-col cols="12" class="text-body-1 font-weight-bold text-md-h6 d-flex align-center justify-center" :class="csTextColor('hp')">
      {{ hp.current }} / {{ hp.max }}
      <v-icon :color="csBgColor('hp')" size="18" class="pl-1">
        mdi-heart-pulse
      </v-icon>
    </v-col>
    <v-col :cols="showBarrier ? 6 : 12" class="text-caption text-md-subtitle-2 d-flex align-center justify-center" :class="csTextColor('temp')">
      {{ tempHp.value || '-' }}
      <v-icon v-if="tempHp.value" :color="csBgColor('temp')" size="14" class="pl-1">
        mdi-heart-flash
      </v-icon>
    </v-col>
    <v-divider v-if="showBarrier" vertical />
    <v-col v-if="showBarrier" cols="6" class="text-caption text-md-subtitle-2 d-flex align-center justify-center" :class="csTextColor('barrier')">
      {{ `${barrier.ticks.used} / ${barrier.ticks.max}` }}
      <v-icon :color="csBgColor('barrier')" size="12" class="pl-1">
        mdi-shield-sun-outline
      </v-icon>
    </v-col>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { CsColors } from '~/mixins/character/csColors'
const { mapGetters } = createNamespacedHelpers('character/hp')

export default {
  mixins: [CsColors],
  props: {
    hideBarrier: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['hp', 'hasBarrier', 'barrier', 'tempHp', 'shields']),
    showBarrier () {
      return !this.hideBarrier && this.barrier.uses.max
    }
  }
}
</script>
