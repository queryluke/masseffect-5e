<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <div class="d-flex justify-center align-center" v-bind="attrs" :style="{ 'height': size }" v-on="on">
        <v-icon
          :color="iconColor"
          :size="size"
        >
          {{ icon }}
        </v-icon>
      </div>
    </template>
    <span>
      {{ text }}
    </span>
  </v-tooltip>
</template>

<script>

export default {
  name: 'MeCsAdIcon',
  props: {
    bonus: {
      type: Object,
      default: () => {}
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dieType () {
      return this.bonus.dieType || 4
    },
    text () {
      return this.bonus.note || ''
    },
    iconColor () {
      return this.$vuetify.theme.dark ? 'green' : 'green darken-3'
    },
    icon () {
      return `mdi-dice-d${this.dieType}${this.$vuetify.theme.dark ? '-outline' : ''}`
    },
    size () {
      return this.small ? '16px' : '20px'
    }
  }
}
</script>
