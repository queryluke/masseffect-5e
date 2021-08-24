export const Skills = {
  methods: {
    csSkillProficient (skill) {
      return this.character.settings.skills?.includes(skill) || this.proficiencies.skill.includes(skill)
    },
    csSkillExpertise (skill) {
      return this.character.settings.expertise?.includes(skill) || this.selections.filter(i => i.type === 'expertise')
        .reduce((acc, curr) => {
          if (curr.has) {
            return acc.concat(curr.has)
          }
          if (curr.value) {
            return acc.concat(curr.value)
          }
          return acc.concat([])
        }, [])
        .includes(skill)
    },
    csSkillMod (skill) {
      const skillData = this.skills.find(i => i.id === skill)
      let mod = this.absMod(skillData.link)
      if (this.csSkillProficient(skill)) {
        mod += this.csSkillExpertise(skill) ? this.profBonus * 2 : this.profBonus
      }
      return mod
    },
    csSkillModText (skill) {
      const mod = this.csSkillMod(skill)
      return mod >= 0 ? `+${mod}` : `-${mod * -1}`
    },
    csPassiveScore (skill) {
      return 10 + this.csSkillMod(skill)
    }
  }
}
