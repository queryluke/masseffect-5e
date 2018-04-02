export const Skills = {
  methods: {
    setGruntSkills(config, grunt) {
      const numSkills = parseFloat(config.cr.cr) <= 1 ? 0 : Math.ceil(parseFloat(config.cr.cr) / 4)
      let skills = this.getMutableData('skills').filter(skill => skill.removed !== 'x')

      // Set possible quarian cybernetic enhancement
      if (grunt.race.id === 'quarian') {
        if (this.randomValue([1, 2, 3]) === 3 && !config.quarianCybEn) {
          const abilityScoreBonus = this.abilityScoreBonus(grunt.abilityScores.wis)
          if (abilityScoreBonus > 0) {
            const skill = skills.find(skill => skill.id === 'perception')
            skill.bonus = abilityScoreBonus
            grunt.skills.push(skill)
            skills.splice(skills.indexOf(skill), 1)
          }
          config.quarianCybEn = true
        }
      }

      // Set krogan intimidation
      if (grunt.race.id === 'krogan') {
        const abilityScoreBonus = this.abilityScoreBonus(grunt.abilityScores.cha)
        if (abilityScoreBonus > 0) {
          const skill = skills.find(skill => skill.id === 'intimidation')
          skill.bonus = abilityScoreBonus
          grunt.skills.push(skill)
          skills.splice(skills.indexOf(skill), 1)
        }
      }

      if (grunt.sc.id !== 'none') {
        const classSkills = grunt.sc.skill.replace(/choose three from/gi, '').split(',').map(skill => {
          return skill.toLowerCase().trim().replace(/ /g, '_')
        })
        skills = skills.filter(skill => {
          return classSkills.includes(skill.id)
        })
      }

      let numProficient = this.randomValue(this.proficientWeights[numSkills])
      for (let i = 1 i <= numSkills i++) {
        const skill = this.randomValue(skills)
        const skillLinkAbbr = skill.link.slice(0, 3).toLowerCase()
        let abilityScoreBonus = this.abilityScoreBonus(grunt.abilityScores[skillLinkAbbr])
        if (numProficient > 0) {
          abilityScoreBonus += config.cr.profBonus
          numProficient--
        }
        if (abilityScoreBonus > 0) {
          skills.splice(skills.indexOf(skill), 1)
          skill.bonus = abilityScoreBonus
          grunt.skills.push(skill)
        }
      }

      // Set expertise for salaraians
      if (grunt.race.id === 'salarian') {
        for (const skill of grunt.skills) {
          if (['engineering', 'hacking', 'history', 'medicine', 'nature', 'piloting'].includes(skill.id)) {
            skill.bonus += config.cr.profBonus
          }
        }
      }
    }
  },
  data() {
    return {
      proficientWeights: {
        0: [0, 0, 1, 1],
        1: [1, 1, 1, 2],
        2: [1, 2, 2, 2],
        3: [2, 2, 3, 3]
      }
    }
  }
}
