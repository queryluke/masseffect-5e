<template>
  <v-list-item :to="localePath(to)" nuxt>
    <v-list-item-action v-if="icon">
      <v-icon>
        {{ icon }}
      </v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>
        {{ displayText }}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-avatar v-if="avatar" :size="20" color="secondary">
      <span class="text-caption white--text" style="padding-left: 6px;">
        {{ avatar }}
      </span>
    </v-list-item-avatar>
  </v-list-item>
</template>

<script>
export default {
  name: 'MeNavListItem',
  props: {
    text: {
      type: [String, Object],
      required: true
    },
    to: {
      type: String,
      required: true
    },
    icon: {
      type: [String, Boolean],
      default: false
    },
    avatar: {
      type: [Number, Boolean],
      default: false
    }
  },
  computed: {
    displayText () {
      return this.text.count ? this.$tc(this.text.key, this.text.count) : this.$t(this.text)
    }
  }
}
</script>
