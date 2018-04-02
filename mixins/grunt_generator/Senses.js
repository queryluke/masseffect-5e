export const Senses = {
  methods: {
    setGruntSenses(config, grunt) {
      let pp = 10 + this.abilityScoreBonus(grunt.abilityScores.wis)
      let ppProficient = false
      if (grunt.race.id === 'quarian' && !config.quarianCybEn) {
        if (this.randomValue([1, 2]) === 1) {
          grunt.senses.unshift('darkvision 20m')
        } else {
          ppProficient = true
        }
      }

      if (grunt.race.id === 'drell') {
        grunt.senses.unshift('darkvision 20m')
      }

      if (['drell', 'unshackled_ai', 'geth'].includes(grunt.race.id)) {
        ppProficient = true
      }

      if (grunt.skills.map(skill => skill.id).includes('perception')) {
        ppProficient = true
      }

      if (ppProficient) {
        pp += config.cr.profBonus
      }

      grunt.senses.push(`passive Perception ${pp}`)
    }
  }
}
