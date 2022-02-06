<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <div class="d-flex justify-center align-center" v-bind="attrs" :style="{ 'height': size }" v-on="on">
        <v-icon
          :color="(dark || type === 'd') ? 'white' : 'grey darken-3'"
          style="position: absolute; z-index: 1;"
          :size="size"
        >
          mdi-alpha-{{ type }}
        </v-icon>
        <v-icon :color="iconColor" :size="size">
          mdi-hexagon
        </v-icon>
      </div>
    </template>
    <span>
      <span>
        {{ toolTipText }}
      </span>
      <span>
        <slot />
      </span>
    </span>
  </v-tooltip>
</template>

<script>

export default {
  name: 'MeCsAdIcon',
  props: {
    type: {
      type: String,
      default: 'a'
    },
    color: {
      type: [String, Boolean],
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    text: {
      type: [String, Boolean],
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconColor () {
      return this.color || (this.type === 'a' ? 'lime darken-2' : 'red darken-4')
    },
    toolTipText () {
      return this.text || (this.type === 'a' ? 'Advantage' : 'Disadvantage')
    },
    size () {
      return this.small ? '16px' : '20px'
    }
  }
}
</script>
