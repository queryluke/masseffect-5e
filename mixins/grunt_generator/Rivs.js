import DamageTypes from '~/components/rule_partials/DamageTypes.vue'
import conditions from '~/static/data/conditions'

export const Rivs = {
  data () {
    return {
      resistances: {
        0: [0, 0, 0, 0, 0, 0, 0, 0],
        1: [0, 0, 0, 0, 0, 1, 1, 1],
        2: [0, 0, 0, 1, 1, 1, 2, 2],
        3: [0, 1, 1, 2, 2, 2, 3, 3]
      },
      immunities: {
        0: [0, 0, 0, 0, 0, 0, 0, 0],
        1: [0, 0, 0, 0, 0, 0, 0, 0],
        2: [0, 0, 0, 0, 0, 1, 1, 1],
        3: [0, 0, 0, 1, 1, 1, 1, 2]
      },
      vulnerabilities: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2]
    }
  },
  methods: {
    setGruntRivs () {
      const damageTypes = this.damageTypes.map(dt => dt.type.toLowerCase())
      const conditionOptions = conditions.filter(c => !['targeting', 'incapacitated', 'unconscious'].includes(c.id)).map(c => c.id)
      this.grunt.conditionImmunities = this.applyRandomRiv(this.immunities[this.crMetaLevel], conditionOptions)
      this.grunt.damageImmunities = this.applyRandomRiv(this.immunities[this.crMetaLevel], damageTypes)
      this.grunt.damageResistances = this.applyRandomRiv(this.resistances[this.crMetaLevel], damageTypes)
      this.grunt.damageVulnerabilities = this.applyRandomRiv(this.vulnerabilities, damageTypes)
      switch (this.race.id) {
        case 'geth':
        case 'unshackled-ai':
          this.grunt.damageImmunities.push('poison', 'psychic')
          this.grunt.conditionImmunities.push('poisoned')
          this.grunt.damageImmunities = [...new Set(this.grunt.damageImmunities)]
          this.grunt.conditionImmunities = [...new Set(this.grunt.conditionImmunities)]
          break
        case 'angara':
          this.grunt.damageResistances.push('lightning')
          this.grunt.damageResistances = [...new Set(this.grunt.damageResistances)]
          break
        default:
          break
      }
    },
    applyRandomRiv (set, items) {
      const riv = []
      const numRivs = this.randomValue(set)
      for (let i = 1; i <= numRivs; i++) {
        riv.push(this.randomValue(items))
      }
      return [...new Set(riv)]
    }
  },
  mixins: [DamageTypes]
}
