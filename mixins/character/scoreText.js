export const ScoreText = {
  methods: {
    modText (score) {
      return score > 0 ? `+${score}` : score
    },
    rollText (score) {
      const isNegative = score < 0
      score = score.toString().match(/\d+/g)
      return !isNegative ? `+${score}` : `-${score}`
    },
    damageText (score) {
      return score > 0 ? ` + ${score}` : ` - ${score * -1}`
    },
    damageOfTypeText (type, values) {
      let bonus = false
      const dice = []
      for (const [dieType, dieCount] of Object.entries(values)) {
        if (dieType === 'bonus') {
          bonus = dieCount
          continue
        } else {
          const dieTypeText = dieType === 'none' ? '' : `d${dieType}`
          dice.push(`${dieCount}${dieTypeText}`)
        }
      }
      const bonusText = bonus ? ` + ${bonus}` : ''
      return `${dice.join(' + ')}${bonusText} ${type} damage`
    },
    fullDamageString (damage) {
      const toJoin = []
      for (const [type, values] of Object.entries(damage.types)) {
        toJoin.push(this.damageOfTypeText(type, values))
      }
      return toJoin.join(' and ')
    }
  }
}
