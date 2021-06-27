
export const Skills = {
  computed: {
    skills () {
      return this.$store.getters.getData('skills')
    }
  },
  methods: {
    setSkills () {
      this.npc.skills = []
      const classSkills = this.options.klass.profs.skill.choices.items.slice()
      const skillOptions = this.skills.filter(skill => classSkills.includes(skill.id))

      const numProficient = this.randomValue([1, 1, 1, 2, 2, 2, 2, 3, 3])
      for (let i = 1; i <= numProficient; i++) {
        const skill = this.randomValue(skillOptions)
        this.npc.skills.push(skill.id)
      }
      this.npc.skills = [...new Set(this.npc.skills)]
    }
  }
}
