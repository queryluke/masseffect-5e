<template>
  <v-row class="text-center" no-gutters>
    <v-col cols="12" class="text-caption text-md-subtitle-2 d-flex align-center justify-center" :class="csTextColor('shields')">
      {{ csMaxShields > 0 ? `${csCurrentShields} / ${csMaxShields}` : '-' }}
      <v-icon :color="csBgColor('shields')" size="12" class="pl-1">
        mdi-shield
      </v-icon>
    </v-col>
    <v-col cols="12" class="text-body-1 font-weight-bold text-md-h6 d-flex align-center justify-center" :class="csTextColor('hp')">
      {{ csCurrentHp }} / {{ csMaxHp }}
      <v-icon :color="csBgColor('hp')" size="18" class="pl-1">
        mdi-heart-pulse
      </v-icon>
    </v-col>
    <v-col :cols="barrier ? 6 : 12" class="text-caption text-md-subtitle-2 d-flex align-center justify-center" :class="csTextColor('temp')">
      {{ csCurrentTempHp > 0 ? csCurrentTempHp : '-' }}
      <v-icon v-if="csCurrentTempHp > 0" :color="csBgColor('temp')" size="14" class="pl-1">
        mdi-heart-flash
      </v-icon>
    </v-col>
    <v-divider v-if="barrier" vertical />
    <v-col v-if="barrier && csMaxBarrierTicks > 0" cols="6" class="text-caption text-md-subtitle-2 d-flex align-center justify-center" :class="csTextColor('barrier')">
      {{ `${csBarrierTicksUsed} / ${csMaxBarrierTicks}` }}
      <v-icon :color="csBgColor('barrier')" size="12" class="pl-1">
        mdi-shield-sun-outline
      </v-icon>
    </v-col>
  </v-row>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    barrier: {
      type: Boolean,
      default: false
    }
  }
}
</script>
