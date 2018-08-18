export const Senses = {
  methods: {
    setMonsterSenses (monster) {
      let pp = 10 + this.abilityScoreBonus(monster.abilityScores.wis)
      let ppProficient = false

      if (monster.skills.map(skill => skill.id).includes('perception')) {
        ppProficient = true
      }

      if (ppProficient) {
        pp += Number.parseInt(monster.profBonus, 10)
      }

      monster.senses.push(`passive Perception ${pp}`)
    }
  }
}
