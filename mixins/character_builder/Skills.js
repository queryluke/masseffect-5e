export const Skills = {
  computed: {
    allSkillAdvantageNotes () {
      return this.mechanicBag
        .filter(i => i.type === 'skill-check' && i.effect === 'advantage' && !i.limit && i.note)
        .reduce((acc, curr) => acc.concat(curr.note), [])
    },
    allSkillDisadvantageNotes () {
      return this.mechanicBag
        .filter(i => i.type === 'skill-check' && i.effect === 'disadvantage' && !i.limit && i.note)
        .reduce((acc, curr) => acc.concat(curr.note), [])
    },
    csSkillProficiencies () {
      const selected = [
        ...(this.character.settings.skills || []),
        ...this.proficiencies.skill
      ]
      return [...new Set(selected)]
    },
    csSkillExpertises () {
      const selected = [
        ...(this.character.settings.expertise || []),
        ...this.csDeprecatedSkillExpertise,
        ...this.mechanicBag.filter(i => i.type === 'prof' && i.profType === 'skill' && i.expertise)
      ]
      return [...new Set(selected)]
    },
    csDeprecatedSkillExpertise () {
      return this.selections.filter(i => i.type === 'expertise')
        .reduce((acc, curr) => {
          if (curr.has) {
            return acc.concat(curr.has)
          }
          if (curr.value) {
            return acc.concat(curr.value)
          }
          return acc.concat([])
        }, [])
    },
    csSkills () {
      const skills = []
      for (const skill of this.skills) {
        const proficient = this.csSkillProficiencies.includes(skill.id)
        const expertise = this.csSkillExpertises.includes(skill.id)
        const baseMod = this.csSkillMod(skill.link, proficient, expertise)
        const mechanics = this.mechanicBag.filter(i => i.type === 'skill-check' && (i.limit ? i.limit.includes(skill.id) : typeof i.effect === 'object'))
        const bonuses = mechanics.filter(i => typeof i.effect === 'object').reduce((acc, curr) => acc + this.mcBonus(curr.effect), 0)
        const mod = baseMod + bonuses
        const advantages = mechanics.filter(i => i.effect === 'advantage')
        const advantageNotes = advantages.filter(i => i.note).map(i => i.note)
        const disadvantages = mechanics.filter(i => i.effect === 'disadvantage')
        const disadvantageNotes = disadvantages.filter(i => i.note).map(i => i.note)
        const returnObj = {
          id: skill.id,
          name: skill.name,
          proficient,
          expertise,
          mod,
          modText: this.csSkillModText(mod),
          advantage: advantages.length > 0,
          advantageNotes,
          disadvantage: disadvantages.length > 0,
          disadvantageNotes
        }
        skills.push(returnObj)
      }
      return skills
    }
  },
  methods: {
    csSkillMod (ability, proficient = false, expertise = false) {
      let mod = this.absMod(ability)
      mod += expertise
        ? (this.profBonus * 2)
        : proficient
          ? this.profBonus
          : 0
      return mod
    },
    csSkillModText (mod) {
      return mod >= 0 ? `+${mod}` : `-${mod * -1}`
    },
    csPassiveScore (skill) {
      return 10 + this.csSkillMod(skill)
    }
  }
}
