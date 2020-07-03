import skills from '~/static/data/skills'

export const Skills = {
  methods: {
    setGruntSkills () {
      this.grunt.skills = []
      const classSkills = this.sc.skillProficiencies.map((skill) => {
        return skill.toLowerCase().trim().replace(/ /g, '_')
      })
      const skillOptions = skills.filter((skill) => {
        return classSkills.includes(skill.id)
      })

      const numProficient = this.randomValue(this.proficientWeights[this.crMetaLevel])
      for (let i = 1; i <= numProficient; i++) {
        const skill = this.randomValue(skillOptions)
        this.grunt.skills.push(skill.id)
      }

      if (['drell', 'unshackled_ai', 'geth'].includes(this.race.id)) {
        this.grunt.skills.push('perception')
      }
      this.grunt.skills = [...new Set(this.grunt.skills)]
    }
  },
  data () {
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
