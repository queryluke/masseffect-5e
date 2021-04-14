export const SpeciesMixins = {
  computed: {
    traitsPreview () {
      let textArray = this.asiTextArray(this.item.abilityScoreIncrease)
      if (this.traits.length > 0) {
        textArray = textArray.concat(this.traits.map(i => i.name))
      }
      return this.renderedAsiText(textArray)
    },
    abilityScoreIncreaseText () {
      return this.renderedAsiText(this.asiTextArray(this.item.abilityScoreIncrease))
    },
    speedText () {
      return this.$t(`lists.comma_list[${this.item.speed.length}]`, this.item.speed.map((i) => {
        return this.$t('character.species.speed', {
          type: this.$t(`speeds.${i.type}.lc`),
          distance: `<me-distance length="${i.speed}" />`
        })
      }))
    }
  },
  methods: {
    asiTextArray (asi) {
      if (asi.length === 6 && asi.filter(i => i.amount === 1).length === 6) {
        return [this.$t('character.species.ability_bonus_all')]
      }
      return asi.map(i => this.asiText(i))
    },
    asiText (data) {
      return `+${data.amount} ${this.$t(`abilities.${data.ability}.title`)}`
    },
    renderedAsiText (array) {
      return this.$t(`lists.comma_list[${array.length}]`, array)
    }
  }
}
