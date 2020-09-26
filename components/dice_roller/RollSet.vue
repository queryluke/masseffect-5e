<template>
  <div>
    <div>
      {{ roll.from }}
    </div>
    <div v-for="(set, index) in roll.rolls" :key="index">
      <roll-text :roll="set" />
    </div>
    <div class="text-caption">
      ---
    </div>
    <div>
      <strong>Total:</strong> {{ roll.total }}
    </div>
  </div>
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
