<template>
  <div :class="'roll-container' + slotState ">
    <v-icon :class="'die-icon'" @click.stop="rollMe">
      {{ icon }}
    </v-icon>
    <span class="roll-text">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    input: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false,
      default () { return 'mdi-dice-multiple' }
    },
    data: {
      type: Object,
      required: false,
      default () { return {} }
    }
  },
  computed: {
    slotState () {
      return this.$slots.default ? '' : '-empty'
    },
    actions () {
      // Setting this up so we can expand on this to control / exclude certain actions later if needed
      const _actions = {
        rollAgain: {
          title: 'Roll Again',
          action: this.rollMe,
          type: 'btn'
        }
      }
      return {
        ..._actions,
        ...this.data.actions
      }
    }
  },
  methods: {
    rollMe (newRoll) {
      const roll = this.input
      this.$store.dispatch('character/ROLL',
        {
          title: this.data.title || 'Roll',
          type: 'dice-roll',
          actions: this.actions,
          roll
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.die-icon {
  display: inline;
}
.roll-text {
  display: inline;
}
.roll-container {
  .die-icon {
    display: none;
  }
}
.roll-container:hover {
  .roll-text {
    display: none;
  }
  .die-icon {
    display: inline;
  }
}
</style>
