
export const Skills = {
  computed: {
    skills () {
      return this.$store.getters.getData('skills')
    }
  },
  methods: {
    setGruntSkills () {
      this.grunt.skills = []
      const classSkills = this.options.klass.skillProfs.options.items.map((skill) => {
        return skill.toLowerCase().trim().replace('-', '_')
      })
      const skillOptions = this.skills.filter((skill) => {
        return classSkills.includes(skill.id)
      })

      const numProficient = this.randomValue(this.proficientWeights[this.crMetaLevel])
      for (let i = 1; i <= numProficient; i++) {
        const skill = this.randomValue(skillOptions)
        this.grunt.skills.push(skill.id)
      }

      if (['drell', 'geth'].includes(this.options.species.id)) {
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
