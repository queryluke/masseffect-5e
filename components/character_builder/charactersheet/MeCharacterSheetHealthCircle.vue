<template>
  <div>
    <div style="max-width: 130px; text-align: center;">
      <v-progress-circular
        :value="100 * current / maximum"
        color="red"
        :class="[$style.circle, $style.red]"
        size="100"
        rotate="270"
        width="10"
      >
        <div :class="$style.circle">
          <h2>{{ current }}<span class="text-caption text--accent-3 green--text ml-1" v-if="temporary">({{ temporary }})</span></h2>
          <v-divider width="80" :class="$style.divider"></v-divider>
          <h2>{{ maximum }}</h2>
        </div>
      </v-progress-circular>
      <v-progress-circular
        class="greenCircle"
        :value="100 * temporary / maximum"
        :color="'green accent-3'"
        :class="$style.circle"
        size="100"
        :rotate="360 * current / maximum - 90"
        width="10">
      </v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  props: ['current', 'temporary', 'maximum']
}
</script>

<style module lang="scss">
  .divider {
    visibility: visible;
  }

  .circle {
    transform: scaleX(-1);

    &.red {
      position: absolute;
      // z-index: 1;
    }
  }
</style>

<style lang="scss">
  .greenCircle .v-progress-circular__underlay {
    stroke: transparent;
  }
</style>
