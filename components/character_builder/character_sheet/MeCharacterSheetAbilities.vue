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
              {{ absModText(ability) }}
            </div>
            <div>
              {{ absTotal(ability) }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers]
}
</script>
