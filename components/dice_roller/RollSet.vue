<template lang="pug">
  div.mb-3
    div {{ roll.from }}
    div(v-for="(set, index) in roll.rolls" v-bind:key="index")
      roll-text(:roll="set")
    div(style="line-height: 3px;") ---
    div #[strong Total]: {{ roll.total }}
</template>

<script>
import RollText from '~/components/dice_roller/RollText.vue'

export default {
  components: { RollText },
  props: {
    roll: {
      type: Object,
      default: () => { return {} }
    }
  },
  methods: {
    text (set) {
      let text = set.values.join(' + ')
      if (set.bonus !== 0) {
        if (set.bonus > 0) {
          text += ` + ${set.bonus}`
        } else {
          text += ` - ${set.bonus * -1}`
        }
      }
      return text
    }
  }
}
</script>
