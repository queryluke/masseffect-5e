<template>
  <div>
    <v-select
      v-model="selection"
      :items="items"
      item-text="name"
      item-value="id"
      :label="label"
      outlined
      dense
      clearable
    />
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    source: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    label () {
      return this.options.id.startsWith('cantrip') ? 'Cantrip' : '1st-Level Power'
    },
    items () {
      const levelFilter = this.options.id.startsWith('cantrip') ? 0 : 1
      return this.powers.filter(i => i.level === levelFilter && i.classes.some(j => ['adept', 'vanguard'].includes(j) && i.type === 'biotic'))
    },
    selection: {
      get () {
        const selection = this.character.selections.find(i => i.source === `${this.source}-${this.options.id}`)
        return selection?.has?.id || null
      },
      set (value) {
        this.$store.dispatch('cb/DELETE_SELECTIONS', {
          cid: this.cid,
          id: `${this.source}-${this.options.id}`
        })
        const selectionValue = {
          source: `${this.source}-${this.options.id}`,
          type: 'action',
          subType: 'power',
          has: {
            id: value,
            mod: 'cha',
            max: 0
          },
          value
        }
        if (this.options.id === 'power') {
          selectionValue.has.max = 1
          selectionValue.has.recharge = 'long'
        }
        this.$store.dispatch('cb/UPDATE_SELECTIONS', { cid: this.cid, selection: selectionValue })
      }
    }
  }
}
</script>
