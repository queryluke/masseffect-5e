<template>
  <div :class="'roll-container' + slotState ">
    <v-icon :class="'die-icon'" @click.stop="roll">{{icon}}</v-icon>
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
    }
  },
  methods: {
    roll () {
      console.log('rolling damage', this.data)
      const roll = this.input
      this.$store.dispatch('character/ROLL',
        {
          title: this.data.title || 'Roll',
          subtitle: this.data.subtitle || this.$store.getters['character/character'].name,
          type: 'dice-roll',
          /*
          actions: [{
            title: 'Roll Again',
            action: this.roll,
            params: [this],
            type: 'btn'
          }], */
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
