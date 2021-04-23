<template>
  <div>
    <me-item-title
      v-if="title"
      :title="item.name"
      avatar
      :avatar-src="require(`~/assets/images/powers/${item.type}.svg`)"
    />
    <v-row>
      <v-col cols="6" md="3">
        <me-item-stat :label="$tc('level_title', 1)">
          <me-power-level :level="item.level" />
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <me-item-stat :label="$t('casting_time_title')">
          <me-power-casting-time :casting-times="item.castingTimes" />
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <me-item-stat :label="$t('duration_title')">
          <me-power-duration :duration="item.duration" :concentration="item.concentration" abbr />
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <me-item-stat :label="$t('range_area_title')">
          <me-power-range :range="item.range" :aoe="item.aoe" />
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <me-item-stat :label="$t('primes_detonates_title')">
          <me-power-primes-detonates :primes="item.primes" :detonates="item.detonates" />
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <me-item-stat :label="$t('attack_type_title')">
          <me-power-attack :attack="item.attack" :save="item.save" />
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <me-item-stat :label="$t('damage_effect_title')">
          <me-power-effect :damage-types="item.damageTypes" :tags="item.tags" />
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <div>
          <v-row justify="start" align-content="center" no-gutters>
            <v-col v-for="klass in item.availableClasses" :key="klass" cols="auto">
              <v-avatar size="45" tile>
                <v-img :src="require(`~/assets/images/classes/${klass}.svg`)" :alt="klass" />
              </v-avatar>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <div v-if="item.reactionQualifier" class="font-italic body-2 pt-2">
      * - {{ item.reactionQualifier }}
    </div>
    <v-progress-linear
      :value="100"
      color="secondary"
      class="my-3"
    />
    <me-html :content="item.html" />
    <!-- TODO: Move Advancements into the markdown via custom content (:::) -->
    <div v-if="item.advancementOptions">
      <p class="text-h6 mb-0">
        {{ $t('advancement_options_title') }}
      </p>
      <v-row justify="center">
        <v-col v-for="opt in item.advancementOptions" :key="opt.name" cols="12" md="6">
          <v-card outlined>
            <v-card-title class="text-subtitle-1">
              {{ opt.name }}
            </v-card-title>
            <v-card-text>
              <me-html :content="opt.description" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MePowerInfo',
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    title: {
      type: Boolean,
      default: false
    }
  }
}
</script>
