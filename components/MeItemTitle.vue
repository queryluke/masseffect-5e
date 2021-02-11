<template>
  <v-row align-content="start" justify="start">
    <v-col v-if="icon || avatar" cols="auto">
      <v-icon v-if="icon" :size="size">
        {{ icon }}
      </v-icon>
      <v-avatar v-if="avatar" :size="size">
        <slot name="avatarBody">
          <v-img v-if="avatarSrc" :src="avatarSrc" />
        </slot>
      </v-avatar>
    </v-col>
    <v-col cols="auto">
      <div class="text-h6 text-md-h4">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div v-if="subtitle" class="text-overline">
        <slot name="subtitle">
          {{ subtitle }}
        </slot>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MeItemTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: [Boolean, String],
      default: false
    },
    icon: {
      type: [Boolean, String],
      default: false
    },
    avatar: {
      type: [Boolean, String],
      default: false
    },
    avatarSrc: {
      type: [Boolean, String],
      default: false
    },
    iconSize: {
      type: Number,
      default: 45
    },
    iconMobileSize: {
      type: Number,
      default: 35
    }
  },
  computed: {
    size () {
      return this.$vuetify.breakpoint.mobile ? this.iconMobileSize : this.iconSize
    }
  }
}
</script>
