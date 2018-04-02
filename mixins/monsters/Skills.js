export const Skills = {
  methods: {
    setMonsterSkills (monster) {
      const monsterSkills = []
      const skills = this.getData('skills').filter(skill => skill.removed !== 'x')
      for (let skillId of monster.skills) {
        let bonus = false
        if (/\*/.test(skillId)) {
          skillId = skillId.substr(0, -1)
          bonus = true
        }
        const skill = skills.find(skill => skill.id === skillId)
        if (skill) {
          const skillLinkAbbr = skill.link.slice(0, 3).toLowerCase()
          const abilityScoreBonus = this.abilityScoreBonus(monster.abilityScores[skillLinkAbbr])
          skill.bonus = bonus ? abilityScoreBonus + parseInt(monster.profBonus, 10) : abilityScoreBonus
          monsterSkills.push(skill)
        } else {
          console.log(`Skill Not Found: ${monster.name} | ${skillId}`)
        }
      }
      monster.skills = monsterSkills
    }
  }
}
