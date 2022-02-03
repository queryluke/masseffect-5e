<template>
  <div>
    <div>
      {{ klass.data.name }} (d{{ klass.data.hitDie }})
    </div>
    <me-character-sheet-use-tracker
      :uses="klass.levels"
      :used="hitDiceUsed"
      @increment="hitDiceUsed++"
      @decrement="hitDiceUsed--"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  props: {
    classIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      character: 'character',
      klasses: 'klasses/klasses'
    }),
    klass () {
      return this.klasses[this.classIndex]
    },
    // TODO: only apply these when short rest is done
    hitDiceUsed: {
      get () {
        return this.character.currentStats.hitDiceUsed[this.klass.id] || 0
      },
      set (value) {
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.hitDiceUsed.${this.klass.id}`, value })
      }
    }
  }
}
</script>
