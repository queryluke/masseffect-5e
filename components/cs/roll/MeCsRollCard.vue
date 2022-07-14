<template>
  <v-hover v-slot="{ hover }">
    <v-badge
      :value="hover"
      :icon="icon"
      overlap
      bottom
      color="red darken-4"
      @click.native.stop="rollMe"
    >
      <v-card outlined flat :min-width="minWidth" class="text-center" @click.stop="rollMe">
        <slot />
      </v-card>
    </v-badge>
  </v-hover>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'mdi-dice-multiple'
    },
    roll: {
      type: Object,
      required: true
    },
    minWidth: {
      type: [Number, String],
      default: 48
    }
  },
  methods: {
    rollMe () {
      this.$store.dispatch('character/roller/ROLL', this.roll)
    }
  }
}
</script>
