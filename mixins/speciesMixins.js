export const SpeciesMixins = {
  computed: {
    traitsPreview () {
      let textArray = this.abilityScoreText(this.item.abilityScoreIncrease)
      if (this.traits.length > 0) {
        textArray = textArray.concat(this.traits.map(i => i.name))
      }
      return this.$t(`lists.comma_list[${textArray.length}]`, textArray)
    }
  },
  methods: {
    abilityScoreText (asi) {
      if (asi.length === 6 && asi.filter(i => i.amount === 1).length === 6) {
        return [this.$t('character.species.ability_bonus_all')]
      }
      return asi.map(i => this.abilityScoreIncreaseText(i))
    },
    abilityScoreIncreaseText (data) {
      return `+${data.amount} ${this.$t(`abilities.${data.ability}.title`)}`
    }
  }
}
