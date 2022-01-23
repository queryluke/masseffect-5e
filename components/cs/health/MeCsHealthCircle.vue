<template>
  <v-progress-circular
    :value="csTempHp ? Math.ceil(csCurrentTempHp / csTempHp * 100) : 0"
    :color="csBgColor('temp')"
    :size="190"
    rotate="270"
    :width="csTempHp ? 10 : 0"
  >
    <v-progress-circular
      :value="csMaxShields ? Math.ceil(csCurrentShields / csMaxShields * 100) : 0"
      :color="csBgColor('shields')"
      :size="175"
      rotate="270"
      :width="csMaxShields ? 15 : 0"
    >
      <v-progress-circular
        :value="Math.ceil(csCurrentHp / csMaxHp * 100)"
        :color="csBgColor('hp')"
        :size="150"
        rotate="270"
        width="20"
      >
        <me-cs-health-text />
      </v-progress-circular>
    </v-progress-circular>
  </v-progress-circular>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers]
}
</script>
