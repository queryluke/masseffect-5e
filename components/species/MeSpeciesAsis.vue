<template>
  <me-species-trait v-if="asis.length || item.abilityScoreIncrease" :label="$t('ability_score_increase_title')">
    {{ abilityScoreIncreaseText }}
  </me-species-trait>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    asis () {
      return (this.item.mechanics || []).filter(i => i.type === 'asi')
    },
    abilityScoreIncreaseText () {
      if (this.item.abilityScoreIncrease) {
        return this.item.abilityScoreIncrease
      }
      const array = this.asis.map((i) => {
        return `+${i.amount} ${this.$t(`abilities.${i.ability}.title`)}`
      })
      return this.$t(`lists.comma_list[${array.length}]`, array)
    }
  }
}
</script>
