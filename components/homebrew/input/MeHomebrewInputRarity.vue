<template>
  <v-select
    v-model="selectedRarity"
    :items="options"
    label="Rarity"
    filled
    dense
  />
</template>

<script>
export default {
  name: 'MeHomebrewInputAbility',
  props: {
    rarity: {
      type: String,
      default: 'common'
    }
  },
  data () {
    return {
      options: [
        { text: 'Common', value: 'common' },
        { text: 'Uncommon', value: 'uncommon' },
        { text: 'Rare', value: 'rare' },
        { text: 'Very Rare', value: 'very_rare' },
        { text: 'Spectre', value: 'spectre' }
      ]
    }
  },
  computed: {
    selectedRarity: {
      get () {
        return this.rarity
      },
      set (value) {
        this.$emit('update', value)
      }
    }
  }
}
</script>
