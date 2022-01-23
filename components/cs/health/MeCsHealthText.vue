<template>
  <v-row class="text-center" no-gutters>
    <v-col cols="12" class="text-caption text-md-subtitle-2" :class="csTextColor('shields')">
      {{ csMaxShields > 0 ? `${csCurrentShields} / ${csMaxShields}` : '-' }}
    </v-col>
    <v-col cols="12" class="text-body-1 font-weight-bold text-md-h6" :class="csTextColor('hp')">
      {{ csCurrentHp }} / {{ csMaxHp }}
    </v-col>
    <v-col cols="12" class="text-caption text-md-subtitle-2" :class="csTextColor('temp')">
      {{ csTempHp > 0 ? `${csCurrentTempHp} / ${csTempHp}` : '-' }}
    </v-col>
  </v-row>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers]
}
</script>
