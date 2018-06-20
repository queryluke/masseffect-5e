export const Senses = {
  methods: {
    setMonsterSenses (monster) {
      let pp = 10 + this.abilityScoreBonus(monster.abilityScores.wis)
      let ppProficient = false

      if (monster.skills.map(skill => skill.id).includes('perception')) {
        ppProficient = true
      }

      if (ppProficient) {
        pp += monster.profBonus
      }

      monster.senses.push(`passive Perception ${pp}`)
    }
  }
}
