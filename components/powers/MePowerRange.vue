<template>
  <span>
    <span>
      <me-distance v-if="numericRange" :length="range" abbr />
      <span v-else>{{ textRange }}</span>
    </span>
    <span v-if="aoe" class="ml-1 text-caption">
      (<me-distance :length="aoe.size" abbr />
      <v-avatar :size="size" tile class="ml-1">
        <v-img :src="require(`~/assets/images/aoe/${filename}.svg`)" :alt="$t(`aoe_types.${aoe.type}`)" />
      </v-avatar>)
    </span>
  </span>
</template>

<script>
export default {
  name: 'MePowerRange',
  props: {
    range: {
      type: [Number, String, Boolean],
      default: false
    },
    aoe: {
      type: [Object, Boolean],
      default: false
    },
    size: {
      type: Number,
      default: 14
    }
  },
  computed: {
    filename () {
      return this.$vuetify.theme.dark ? `${this.aoe.type}-white` : this.aoe.type
    },
    numericRange () {
      return this.range > 1
    },
    textRange () {
      return this.range === 0
        ? this.$t('self_title')
        : this.$t('touch_title')
    }
  }
}
</script>
