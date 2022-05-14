<template>
  <v-row class="text-center" no-gutters>
    <v-col cols="12" class="text-caption text-md-subtitle-2 d-flex align-center justify-center" :class="csTextColor('shields')">
      {{ shields.max ? `${shields.current} / ${shields.max}` : '-' }}
      <v-icon :color="csBgColor('shields')" size="12" class="pl-1">
        mdi-shield
      </v-icon>
    </v-col>
    <v-col cols="12" class="text-body-1 font-weight-bold text-md-h6 d-flex align-center justify-center" :class="csTextColor('hp')">
      {{ hp.current }}/{{ hp.max }}
      <v-icon :color="csBgColor('hp')" size="18" class="pl-1">
        mdi-heart-pulse
      </v-icon>
    </v-col>
    <v-col cols="12" class="text-caption text-md-subtitle-2 d-flex justify-center">
      <div v-if="tempHp.value" class="align-center justify-center" :class="csTextColor('temp')">
        {{ tempHp.value }}
        <v-icon :color="csBgColor('temp')" size="14">
          mdi-heart-flash
        </v-icon>
      </div>
      <v-divider v-if="tempHp.value && techArmor" vertical style="margin: 0 2px 0 2px" />
      <div v-if="techArmor" class="align-center justify-center" :class="csTextColor('techArmor')">
        {{ techArmor }}
        <v-icon :color="csBgColor('techArmor')" size="14">
          mdi-shield-star
        </v-icon>
      </div>
      <v-divider v-if="techArmor && showBarrier" vertical style="margin: 0 2px 0 2px" />
      <div v-if="showBarrier" class="align-center justify-center" :class="csTextColor('barrier')">
        {{ `${ticksRemaining} / ${barrier.ticks.max}` }}
        <v-icon :color="csBgColor('barrier')" size="12">
          mdi-shield-sun-outline
        </v-icon>
      </div>
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
    ...mapGetters(['hp', 'barrier', 'tempHp', 'shields', 'techArmor']),
    showBarrier () {
      return !this.hideBarrier && this.barrier.uses.max
    },
    ticksRemaining () {
      return this.barrier.ticks.max - this.barrier.ticks.used
    },
    tempColSize () {
      return this.showBarrier
        ? this.techArmor
          ? 3
          : 6
        : this.techArmor
          ? 6
          : 12
    }
  }
}
</script>
