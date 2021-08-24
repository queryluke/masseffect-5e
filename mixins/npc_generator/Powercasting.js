export const Powercasting = {
  data () {
    return {
      powerLevelDamage: {
        0: 4,
        1: 9,
        2: 16,
        3: 34,
        4: 40,
        5: 44,
        6: 50
      }
    }
  },
  computed: {
    powers () {
      return this.$store.getters.getData('powers').filter(i => i.classes.includes(this.options.klass.id) && i.type !== 'combat')
    }
  },
  methods: {
    getCantrips (level) {
      let num = this.options.klass.id === 'vanguard' ? Math.ceil(level / 8) : Math.ceil(level / 4)
      num = num === 0 ? 1 : num
      const baseOptions = this.powers.filter(i => i.level === 0).map((i) => {
        let damage = 0
        if (i.damage) {
          damage = this.averageFromDie(i.damage.dieType, i.damage.dieCount)
        }
        const dmgObject = {
          type: 'power',
          damage,
          uses: 5
        }
        return {
          dmgObject,
          power: i
        }
      })
      let i = 0
      const list = []
      while (i < num) {
        const options = baseOptions.filter((i) => {
          return !list.includes(i.power.id) &&
            this.isDamageAddable(i.dmgObject)
        })
        if (options.length > 0) {
          const option = this.randomValue(options)
          list.push(option.power.id)
          this.addDamage(option.dmgObject)
        }
        i++
      }
      return list
    },
    techCasterInfo (level) {
      const points = this.klass.progression.columns.find(i => i.label === 'tech_points').values[level - 1]
      const limit = this.klass.progression.columns.find(i => i.label === 'tech_point_limit').values[level - 1]
      const baseOptions = this.powers.map((i) => {
        let damage = 0
        const uses = Math.floor(points / limit)
        if (i.damage) {
          let addDice = 0
          if (i.damage.higherLevel) {
            addDice = i.damage.higherLevel.dieCount * (limit - i.level)
          }
          damage = this.averageFromDie(i.damage.dieType, i.damage.dieCount + addDice)
        }
        const dmgObject = {
          type: 'power',
          damage,
          uses
        }
        return {
          dmgObject,
          power: i
        }
      })
      const numPowers = this.numPowers(level)
      let num = 0
      const list = []
      let damaging = this.options.damageFocus === 'powers'
      while (num < numPowers) {
        const options = baseOptions.filter((i) => {
          return i.power.level <= limit &&
            !list.includes(i.power.id) &&
            this.isDamageAddable(i.dmgObject) &&
            (num === 0 ? i.power.level === 1 : true) &&
            (damaging ? i.power.damage : true)
        })
        if (options.length > 0) {
          const option = this.randomValue(options)
          list.push(option.power.id)
          this.addDamage(option.dmgObject)
          num++
        } else if (options.length === 0 && !damaging) {
          num++
        } else {
          damaging = false
        }
      }
      return { list, tech: { points, limit } }
    },
    bioticCasterInfo (level) {
      const slots = this.klass.progression.columns.find(i => i.label === 'power_slots_by_power_level').values.filter(i => i[level - 1] > 0).map(i => i[level - 1])
      const maxLevel = slots.length
      const baseOptions = this.powers.map((i) => {
        let damage = 0
        if (i.damage) {
          let casts = 0
          let totalDamage = 0
          const addDice = i.damage.higherLevel ? i.damage.higherLevel.dieCount : 0
          const reversedSlots = JSON.parse(JSON.stringify(slots)).reverse()
          for (const slotLevelIndex in reversedSlots) {
            if (casts > 5) {
              continue
            }
            const slotLevel = reversedSlots.length - parseInt(slotLevelIndex)
            const castsAtSlotLevel = reversedSlots[slotLevelIndex]
            const remainingCasts = castsAtSlotLevel + casts > 5 ? 5 - casts : castsAtSlotLevel
            totalDamage += remainingCasts * this.averageFromDie(i.damage.dieType, i.damage.dieCount + (addDice * (slotLevel - i.level)))
            casts += remainingCasts
          }
          damage = Math.floor(totalDamage / 5)
        }
        const dmgObject = {
          type: 'power',
          damage,
          uses: 5,
          id: i.id
        }
        return {
          dmgObject,
          power: i
        }
      })
      const numPowers = this.numPowers(level)
      let num = 0
      const list = []
      let damaging = this.options.damageFocus === 'powers'
      while (num < numPowers) {
        const options = baseOptions.filter((i) => {
          return i.power.level <= maxLevel &&
            i.power.level > 0 &&
            !list.includes(i.power.id) &&
            this.isDamageAddable(i.dmgObject) &&
            (num === 0 ? i.power.level === 1 : true) &&
            (damaging ? i.power.damage : true)
        })
        if (options.length > 0) {
          const option = this.randomValue(options)
          list.push(option.power.id)
          this.addDamage(option.dmgObject)
          num++
        } else if (options.length === 0 && !damaging) {
          num++
        } else {
          damaging = false
        }
      }
      return { list }
    },
    pactCasterInfo (level) {
      const numSlots = this.klass.progression.columns.find(i => i.label === 'power_slots').values[level - 1]
      const maxLevel = this.klass.progression.columns.find(i => i.label === 'power_level').values[level - 1]
      const baseOptions = this.powers.map((i) => {
        let damage = 0
        if (i.damage) {
          let addDice = 0
          if (i.damage.higherLevel) {
            addDice = i.damage.higherLevel.dieCount * (maxLevel - i.level)
          }
          damage = this.averageFromDie(i.damage.dieType, i.damage.dieCount + addDice)
        }
        const dmgObject = {
          type: 'power',
          damage,
          uses: Math.ceil(numSlots / 2)
        }
        return {
          dmgObject,
          power: i
        }
      })
      const numPowers = this.numPowers(level)
      let num = 0
      const list = []
      let damaging = this.options.damageFocus === 'powers'
      while (num < numPowers) {
        const options = baseOptions.filter((i) => {
          return i.power.level <= maxLevel &&
            i.power.level > 0 &&
            !list.includes(i.power.id) &&
            this.isDamageAddable(i.dmgObject) &&
            (num === 0 ? i.power.level === 1 : true) &&
            (damaging ? i.power.damage : true)
        })
        if (options.length > 0) {
          const option = this.randomValue(options)
          list.push(option.power.id)
          this.addDamage(option.dmgObject)
          num++
        } else if (options.length === 0 && !damaging) {
          num++
        } else {
          damaging = false
        }
      }
      return { list, pact: { numSlots, maxLevel } }
    },
    numPowers (level) {
      const lookupId = ['adept', 'engineer'].includes(this.options.klass.id) ? 'adept' : 'vanguard'
      const ps = this.$store.getters.getItem('classes', lookupId).progression.columns.find(i => i.label === 'power_slots_by_power_level').values
      const num = ps.map(i => i[level - 1] > 0 ? Math.ceil(i[level - 1] / 2) : 0).reduce((acc, curr) => acc + curr, 0)
      return this.options.klass.id === 'vanguard'
        ? num
        : num === 0
          ? 1
          : num
    },
    setPowercasting () {
      if (this.options.klass.id === 'soldier') {
        return
      }
      // get damage at metaLevel
      const powerCastingLevel = this.randomValue([...Array(this.metaLevel).keys()].reverse().slice(0, (this.options.damageFocus === 'powers' ? 3 : 7))) + 1
      let casterInfo, finalText, abilityMod
      switch (this.options.klass.id) {
        case 'engineer':
        case 'infiltrator':
          casterInfo = this.techCasterInfo(powerCastingLevel)
          finalText = `The ${this.npc.name.toLowerCase()} has ${casterInfo.tech.points} tech points, from which it can cast the following powers:`
          abilityMod = 'int'
          break
        case 'adept':
        case 'vanguard':
          casterInfo = this.bioticCasterInfo(powerCastingLevel)
          casterInfo.list = casterInfo.list.concat(this.getCantrips(powerCastingLevel))
          if (this.options.klass.id === 'vanguard') {
            casterInfo.half = true
          }
          finalText = `The ${this.npc.name.toLowerCase()} has the following powers:`
          abilityMod = this.options.species.id === 'asari' ? 'cha' : 'wis'
          break
        case 'sentinel':
          casterInfo = this.pactCasterInfo(powerCastingLevel)
          casterInfo.list = casterInfo.list.concat(this.getCantrips(powerCastingLevel))
          finalText = 'It regains its expended power slots when it finishes a short or long rest. It knows the following powers:'
          abilityMod = 'cha'
          break
        default:
          break
      }
      const modBonus = this.abilityScoreBonus(this.npc.abilityScores[abilityMod])
      const hitBonus = modBonus + this.npc.profBonus
      const dc = 8 + hitBonus
      this.npc.entries.features.push({
        name: 'Powercasting',
        casterLevel: powerCastingLevel,
        mod: abilityMod,
        text: `The ${this.npc.name.toLowerCase()} is a ${this.$i18n.t(`ordinal_numbers[${powerCastingLevel}]`, 'en')}-level powercaster.
               Its powercasting ability is ${this.$i18n.t(`abilities.${abilityMod}.title`, 'en')}
               (power save DC ${dc}, +${hitBonus} to hit with powers). ${finalText}`,
        id: 'powercasting',
        ...casterInfo
      })
    }
  }
}
