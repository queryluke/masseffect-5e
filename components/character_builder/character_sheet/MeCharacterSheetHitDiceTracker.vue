<template>
  <div>
    <div>
      {{ klassData.name }} (d{{ klassData.hitDie }})
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
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    classIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    hitDiceUsed: {
      get () {
        return this.character.currentStats.hitDiceUsed[this.klass.id] || 0
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `currentStats.hitDiceUsed.${this.klass.id}`, value })
      }
    }
  }
}
</script>
