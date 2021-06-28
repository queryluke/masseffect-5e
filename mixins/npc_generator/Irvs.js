export const Irvs = {
  data () {
    return {
      resistances: {
        0: [0, 0, 0, 0, 0, 0, 0, 0],
        1: [0, 0, 0, 0, 0, 1, 1, 1],
        2: [0, 0, 0, 1, 1, 1, 2, 2],
        3: [0, 1, 1, 1, 2, 2, 2, 2],
        4: [1, 1, 1, 2, 2, 2, 3, 3],
        5: [2, 2, 2, 2, 3, 3, 3, 3],
        6: [2, 2, 2, 3, 3, 3, 3, 3]
      },
      immunities: {
        0: [0, 0, 0, 0, 0, 0, 0, 0],
        1: [0, 0, 0, 0, 0, 0, 1, 1],
        2: [0, 0, 0, 0, 1, 1, 1, 1],
        3: [0, 0, 1, 1, 1, 1, 2, 2],
        4: [1, 1, 1, 1, 2, 2, 2, 2],
        5: [1, 1, 2, 2, 2, 2, 3, 3],
        6: [2, 2, 2, 2, 3, 3, 3, 3]
      },
      vulnerabilities: {
        0: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        1: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2],
        2: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2]
      }
    }
  },
  methods: {
    setIrvs () {
      const damageTypes = ['acid', 'cold', 'fire', 'force', 'lightning', 'necrotic', 'poison', 'psychic', 'radiant', 'thunder']
      const conditionOptions = ['blinded', 'charmed', 'deafened', 'frightened', 'grappled', 'lifted', 'paralyzed', 'poisoned', 'primed', 'prone', 'restrained', 'stunned']
      const irvs = {
        conImm: [],
        damImm: [],
        res: [],
        vul: []
      }
      if (this.options.offensiveScale <= 0) {
        if (this.options.offensiveScale === -2) {
          damageTypes.push('piercing', 'slashing', 'bludgeoning')
        }
        irvs.conImm = this.applyRandomRiv(this.immunities[this.defensiveCrMeta], conditionOptions)
        irvs.res = this.applyRandomRiv(this.resistances[this.defensiveCrMeta], damageTypes)
      }
      if (this.options.offensiveScale >= 0) {
        const vulTypes = damageTypes.filter(i => !irvs.damImm.includes(i) && !irvs.res.includes(i))
        irvs.vul = irvs.vul.concat(this.applyRandomRiv(this.vulnerabilities[this.options.offensiveScale], vulTypes))
      }
      for (const i in irvs) {
        if (irvs[i].length === 0) {
          delete irvs[i]
        }
      }
      this.npc.irv = Object.keys(irvs).length === 0 ? false : irvs
    },
    applyRandomRiv (set, items) {
      const riv = []
      const numRivs = this.randomValue(set)
      for (let i = 1; i <= numRivs; i++) {
        riv.push(this.randomValue(items))
      }
      return [...new Set(riv)]
    }
  }
}
