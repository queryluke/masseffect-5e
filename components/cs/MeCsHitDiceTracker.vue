<template>
  <div :class="{'d-flex align-center': small}">
    <div :class="{'text-caption': small}">
      {{ klass.data.name }} (d{{ klass.data.hitDie }})
    </div>
    <me-cs-action-resource-display-checkbox
      :max="klass.levels"
      :current="hitDiceUsed"
      @add="hitDiceUsed++"
      @remove="hitDiceUsed--"
      @set="hitDiceUsed = $event"
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
    },
    small: {
      type: Boolean,
      default: false
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
