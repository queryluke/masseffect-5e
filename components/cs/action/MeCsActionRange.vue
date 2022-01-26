<template>
  <v-card flat class="text-center" color="transparent">
    <div class="text-subtitle-2">
      <span v-if="!item.long">
        <span v-if="item.short === 0">
          Self
        </span>
        <span v-else-if="item.short === 1">
          Touch
        </span>
        <me-distance v-else :length="item.short" abbr />
      </span>
      <span v-else>
        <span>
          <me-distance :length="item.short" num-only />
        </span>
        <span class="text-caption font-weight-light">
          (<me-distance :length="item.long" num-only />)
        </span>
      </span>
    </div>
    <div v-if="item.note || item.aoe" class="text-caption mt-n1 font-weight-light">
      <small>
        <div v-if="item.aoe">
          (<span>
            <me-distance :length="item.aoe.size" abbr />
            <v-avatar :size="9" tile style="margin-left: 1px">
              <v-img :src="require(`~/assets/images/aoe/${filename}.svg`)" :alt="$t(`aoe_types.${item.aoe.type}`)" />
            </v-avatar>
          </span>)
        </div>
        <div v-else>
          {{ item.note }}
        </div>
      </small>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'MeCsActionRange',
  props: {
    range: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      defaults: {
        short: 0,
        long: null,
        note: false,
        aoe: false
      }
    }
  },
  computed: {
    item () {
      return { ...this.defaults, ...this.range }
    },
    filename () {
      return this.$vuetify.theme.dark ? `${this.item.aoe.type}-white` : this.item.aoe.type
    }
  }
}
</script>
