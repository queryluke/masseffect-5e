<template>
  <span>
    <span>
      <me-distance v-if="numericRange" :length="range" abbr />
      <span v-else>{{ textRange }}</span>
    </span>
    <span v-if="aoe" class="text-caption" :class="{'d-block': split, 'ml-1': !split, 'mt-n1': split}">
      (<me-distance v-if="aoeSize" :length="aoe.size" abbr />
      <v-avatar v-if="filename" :size="size" tile style="margin-left: 2px">
        <v-img :src="require(`~/assets/images/aoe/${filename}.svg`)" :alt="$t(`aoe_types.${aoe.type}`)" />
      </v-avatar>)
    </span>
  </span>
</template>

<script>
export default {
  name: 'MePowerRange',
  props: {
    mechanic: {
      type: Object,
      default: () => {
        return {
          range: {
            short: 0,
            long: false,
            aoe: false
          }
        }
      }
    },
    size: {
      type: Number,
      default: 14
    },
    split: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    range () {
      return this.mechanic?.range?.short
    },
    aoe () {
      return this.mechanic?.range?.aoe
    },
    filename () {
      if (!this.aoe?.type) {
        return false
      }
      return this.$vuetify.theme.dark ? `${this.aoe.type}-white` : this.aoe.type
    },
    aoeSize () {
      return this.aoe?.size
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
