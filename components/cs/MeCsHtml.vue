<template>
  <div />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  mixins: [ScoreText],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['profBonus']),
    range () {
      return `<me-distance length="${this.item.range.short}" />`
    }
  }
}
</script>
