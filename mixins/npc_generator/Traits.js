export const Traits = {
  methods: {
    setTraits () {
      if (this.options.traits && this[this.options.species.id]) {
        this[this.options.species.id]()
      }
    },
    angara () {
      // be focus
      const damage = {
        type: 'power',
        damage: 3,
        uses: 5
      }
      if (this.isDamageAddable(damage)) {
        this.npc.entries.features.push({
          mod: 'cha',
          list: [
            {
              id: 'shocking-grasp',
              perDay: 'at_will'
            }
          ],
          name: 'Bio-Electric Focus',
          text: `The ${this.lcName}'s innate powercasting ability is Charisma (power save DC ${this.calcDc('cha')}, +${this.npc.profBonus + this.abilityScoreBonus(this.npc.abilityScores.cha)} to hit with power attacks). It can innately cast the following at 1st level:`,
          id: 'innate-powercasting'
        })
        this.addDamage(damage)
      }
      // be ward
      this.npc.ac += 1
      if (!this.npc.irv) {
        this.npc.irv = {}
      }
      if (!this.npc.irv.res) {
        this.npc.irv.res = ['lightning']
      } else if (!this.npc.irv.res.includes('lightning')) {
        this.npc.irv.res.push('lightning')
      }
      this.npc.entries.features.push({
        name: 'Bio-electric Ward',
        text: `The ${this.lcName}'s lightening resistance does not apply to its shields.`,
        id: 'bio-electric-ward'
      })
      // solar dep
      this.npc.entries.features.push({
        name: 'Solar Dependency',
        text: `If the ${this.lcName} fails to immerse itself in sunlight for at least 1 hour during a day, it suffers one level of exhaustion.`,
        id: 'solar-dependency'
      })
      // survivalist
      if (!this.npc.skills) {
        this.npc.skills = []
      }
      if (!this.npc.skills.includes('survival')) {
        this.npc.skills.push('survival')
      }
    },
    asari () {
      // innate biotics
      if (['engineer', 'infiltrator', 'soldier'].includes(this.options.klass.id)) {
        const powers = this.$store.getters.getData('powers').filter(i => i.classes.includes('adept'))
        const baseOptions = powers.filter(i => i.level === 0 || i.level === 1).map((i) => {
          let damage = 0
          if (i.damage) {
            damage = this.averageFromDie(i.damage.dieType, i.damage.dieCount)
          }
          const dmgObject = {
            type: 'power',
            damage,
            uses: i.level === 0 ? 5 : 1
          }
          return {
            dmgObject,
            power: i
          }
        })
        const list = []
        for (let i = 0; i < 2; i++) {
          const options = baseOptions.filter(j => !list.map(k => k.id).includes(j.power.id) && this.isDamageAddable(j.dmgObject) && j.power.level === 0)
          if (options.length > 0) {
            const cantrip = this.randomValue(options)
            list.push({ id: cantrip.power.id, perDay: 'at_will' })
            this.addDamage(cantrip.dmgObject)
          }
        }
        const spellOptions = baseOptions.filter(i => i.power.level === 1 && this.isDamageAddable(i.dmgObject))
        if (spellOptions.length > 0) {
          const power = this.randomValue(spellOptions)
          list.push({ id: power.power.id, perDay: 1 })
        }
        this.npc.entries.features.push({
          mod: 'cha',
          list,
          name: 'Innate Biotics',
          text: `The ${this.lcName}'s innate powercasting ability is Charisma (power save DC ${this.calcDc('cha')}, +${this.npc.profBonus + this.abilityScoreBonus(this.npc.abilityScores.cha)} to hit with power attacks). It can innately cast the following:`,
          id: 'innate-powercasting'
        })
      }

      // mind meld
      this.npc.entries.features.push({
        name: 'Mind Meld',
        text: `The ${this.lcName} can transfer and receive thoughts from a willing, intelligent creature. If the creature is unwilling, the thoughts become jumbled and disjointed.`,
        id: 'mind-meld'
      })

      // survivalist
      if (!this.npc.skills) {
        this.npc.skills = []
      }
      if (!this.npc.skills.includes('persuasion')) {
        this.npc.skills.push('persuasion')
      }
    },
    batarian () {
      // four eyes
      if (!this.npc.skills) {
        this.npc.skills = []
      }
      if (!this.npc.skills.includes('perception')) {
        this.npc.skills.push('perception')
      }
      // shrewd negotiator
      if (!this.npc.skills.includes('insight') && !this.npc.skills.includes('intimidation')) {
        this.npc.skills.push(this.randomValue(['insight', 'intimidation']))
      } else if (this.npc.skills.includes('insight') && !this.npc.skills.includes('intimidation')) {
        this.npc.skills.push('intimidation')
      } else if (!this.npc.skills.includes('insight') && this.npc.skills.includes('intimidation')) {
        this.npc.skills.push('insight')
      }
      this.npc.entries.features.push({
        name: 'Four Eyes',
        text: `The ${this.lcName} can perform the Search action as a bonus action on each of its turns.`,
        id: 'four-eyes'
      })
      // saving face
      this.npc.entries.features.push({
        name: 'Saving Face',
        recharge: 'short',
        text: `When the ${this.lcName} misses with and attack roll or fails an ability check or saving throw, it may gain a bonus to the roll equal to the number of allies it can see (maximum +5).`,
        id: 'saving-face'
      })
    },
    drell () {
      // nh
      if (!this.npc.skills) {
        this.npc.skills = []
      }
      const skillOptions = ['athletics', 'perception', 'stealth', 'survival']
      const options = skillOptions.filter(i => !this.npc.skills.includes(i))
      if (options.length > 0) {
        for (let i = 0; i < (options.length > 2 ? 2 : options.length); i++) {
          this.npc.skills.push(this.randomValue(options.filter(i => !this.npc.skills.includes(i))))
        }
      }
      // raw agility
      this.npc.entries.features.push({
        name: 'Raw Agility',
        text: `When the ${this.lcName} moves on its turn in combat, it can double its speed until the end of the turn. Once it uses this ability, the ${this.lcName} can't use it again until it moves <me-distance length="0" override="0 {metric}"/> on one of its turns.`,
        id: 'raw-agility'
      })
    },
    elcor () {
      // careful
      this.npc.entries.features.push({
        name: 'Careful',
        text: `The ${this.lcName} has disadvantage on initiative rolls.`,
        id: 'careful'
      })
      if (!this.npc.skills) {
        this.npc.skills = []
      }
      if (!this.npc.skills.includes('perception')) {
        this.npc.skills.push('perception')
      }
      if (!this.npc.skills.includes('insight')) {
        this.npc.skills.push('insight')
      }
      this.npc.ac += 2
    },
    geth () {
      // hunter mode
      this.npc.entries.actions.push({
        name: 'Hunter Mode',
        recharge: 'long',
        text: `The ${this.lcName}'s movement speed increases by <me-distance length="5" /> and gains a +1 bonus to weapon attack rolls for 1 minute.`,
        id: 'hunter-mode'
      })
      // integrated protection
      this.npc.ac += this.randomValue([1, 2, 3])
      // living construct
      if (!this.npc.irv) {
        this.npc.irv = {}
      }
      this.npc.irv.damImm = ['poison', 'psychic']
      if (!this.npc.irv.conImm) {
        this.npc.irv.conImm = ['poisoned']
      } else if (!this.npc.irv.conImm.includes('poisoned')) {
        this.npc.irv.conImm.push('poisoned')
      }
      // repair matrix
      const rmUses = Math.ceil(this.npc.profBonus / 2)
      if (this.isHpBonusAddable((rmUses / 2) * 4.5)) {
        this.npc.entries.actions.push({
          name: 'Repair Matrix',
          uses: rmUses,
          perDay: true,
          text: `The ${this.lcName} regains 1d8 hit points.`,
          id: 'repair-matrix'
        })
        this.healthBonus += (rmUses / 2) * 4.5
      }
    },
    hanar () {
      this.npc.abilityScores.con -= 1
      // amphibious
      this.npc.entries.features.push({
        name: 'Amphibious',
        text: `The ${this.lcName} can breathe both air and water.`,
        id: 'amphibious'
      })
      // biolum
      this.npc.entries.features.push({
        name: 'Bioluminescence',
        text: `The ${this.lcName} can shed dim light in a <me-distance length="30" /> radius.`,
        id: 'bioluminescence'
      })
      // con-grav
      this.npc.speed.swim = 30
      this.npc.entries.features.push({
        name: 'Contra-gravitic Levitation',
        text: `When the ${this.lcName} suffers a critical hit, roll a d20. On a roll of 1 or 2, its contra-gravitic levitation device fails and its walking speed becomes 0. It can use its Action to make a DC 15 Intelligence (Engineering) check to repair the device.`,
        id: 'contra-gravitic-levitation'
      })
      this.npc.entries.actions.push({
        attack: 'melee',
        proficient: true,
        range: 5,
        dc: false,
        mod: 'str',
        damage: [
          {
            dieCount: 1,
            dieType: 6,
            mod: true,
            type: 'bludgeoning'
          }
        ],
        target: 'one',
        name: 'Tentacles',
        hit: `The target must succeed on a DC ${this.options.cr.dc} Strength saving throw or be <me-condition id="grappled" />. The ${this.lcName} can have up to six targets grappled at once`,
        id: 'tentacles'
      })
      this.npc.entries.actions.push({
        name: 'Secrete Toxin',
        text: `One creature that is grappled by the ${this.lcName} must make a DC ${this.options.cr.dc} Constitution saving throw or become <me-condition id="poisoned"/> for 1 hour.`,
        id: 'toxin'
      })
    },
    krogan () {
      // blood rage
      if (this.npc.abilityScores.con !== 30) {
        this.npc.abilityScores.con += 1
      }
      const hpGain = this.abilityScoreBonus(this.npc.abilityScores.con) > 0 ? this.abilityScoreBonus(this.npc.abilityScores.con) : 1
      this.npc.entries.features.push({
        name: 'Blood Rage',
        text: `When the ${this.lcName} reduces an enemy's hit points to 0, it may enter a blood range gaining ${hpGain} temporary hit point${hpGain > 1 ? 's' : ''} at the start of each of its turns and is immune to being charmed or frightened. Additionally, it cannot concentrate on powers. This effect lasts 1 minute and it loses any remaining temporary hit points when blood rage ends.`,
        id: 'blood-rage'
      })
      if (!this.npc.skills) {
        this.npc.skills = []
      }
      if (!this.npc.skills.includes('intimidation')) {
        this.npc.skills.push('intimidation')
      }
    },
    prothean () {
      if (!this.npc.skills) {
        this.npc.skills = []
      }
      if (!this.npc.skills.includes('perception')) {
        this.npc.skills.push('perception')
      }
      if (!this.npc.senses) {
        this.npc.senses = {}
      }
      this.npc.senses.truesight = 30
      if (!this.npc.irv) {
        this.npc.irv = {}
      }
      this.npc.irv.res = [...new Set((this.npc.irv.res || []).concat(['cold', 'radiant']))]
    },
    quarian () {
      if (!this.npc.irv) {
        this.npc.irv = {}
      }
      this.npc.irv.res = [...new Set((this.npc.irv.res || []).concat(['necrotic', 'poison']))]
      this.npc.entries.features.push({
        name: 'Hermetic Suit',
        text: `When the ${this.lcName} suffers a critical hit that deals piercing or slashing damage, it suffers 1 level of exhaustion every hour until it patches its suit. It may patch its suit using an action and expending an omni-gel.`,
        id: 'hermetic-suit'
      })
      const upgrade = this.randomValue(['cerebral', 'muscular', 'ocular', 'visceral'])
      let skillOptions, options
      switch (upgrade) {
        case 'cerebral':
          if (this.npc.abilityScores.int !== 30) {
            this.npc.abilityScores.int += 1
          }
          this.npc.entries.features.push({
            name: 'Mind Shielding Unit',
            text: `The ${this.lcName} has advantage on saving throws against being charmed, frightened, or if an effect would cause it to become confused, compelled or put to sleep. Its mind cannot be read by an asari's mind meld.`,
            id: 'mind-shielding-unit'
          })
          if (!this.npc.skills) {
            this.npc.skills = []
          }
          skillOptions = ['electronics', 'engineering', 'investigation', 'science']
          options = skillOptions.filter(i => !this.npc.skills.includes(i))
          if (options.length > 0) {
            this.npc.skills.push(this.randomValue(options))
          }
          break
        case 'muscular':
          if (this.npc.abilityScores.dex !== 30) {
            this.npc.abilityScores.dex += 1
          }
          this.npc.entries.features.push({
            name: 'Overclock Unit',
            text: `When the ${this.lcName} moves on its turn in combat, it can double its speed until the end of the turn. Once it uses this ability, the ${this.lcName} can't use it again until it moves <me-distance length="0" override="0 {metric}"/> on one of its turns.`,
            id: 'overclock-unit'
          })
          skillOptions = ['athletics', 'acrobatics']
          options = skillOptions.filter(i => !this.npc.skills.includes(i))
          if (options.length > 0) {
            this.npc.skills.push(this.randomValue(options))
          }
          break
        case 'ocular':
          if (!this.npc.senses) {
            this.npc.senses = {}
          }
          this.npc.senses.darkvision = 60
          this.npc.entries.features.push({
            name: 'Clarity Unit',
            text: `The ${this.lcName} has advantage on saving throws against being blinded.`,
            id: 'clarity-unit'
          })
          this.npc.entries.features.push({
            name: 'Keen Eyesight',
            text: `The ${this.lcName} has advantage on Wisdom (Perception) checks that rely on sight. Additionally, it can see in an area within <me-distance length="30" /> that is lightly obscured as if it were unobscured and can see in an area within <me-distance length="15" /> that is heavily obscured as if it were lightly obscured.`,
            id: 'keen-eyesight'
          })
          break
        case 'visceral':
          if (this.npc.abilityScores.con <= 28) {
            this.npc.abilityScores.con += 2
          }
          this.npc.entries.features.push({
            name: 'Revival Unit',
            recharge: 'long',
            text: `The first time the ${this.lcName} drops to 0 hit points, it drops to 1 hit point instead.`,
            id: 'revival-unit'
          })
          break
        default:
          break
      }
    },
    salarian () {
      this.npc.entries.features.push({
        name: 'Amphibious',
        text: `The ${this.lcName} can breathe both air and water.`,
        id: 'amphibious'
      })
      if (!this.npc.skills) {
        this.npc.skills = []
      }
      for (let i = 0; i < 2; i++) {
        const options = this.skills.filter(i => !this.npc.skills.includes(i.id))
        if (options.length > 0) {
          this.npc.skills.push(this.randomValue(options).id)
        }
      }
    },
    turian () {
      this.npc.entries.features.push({
        name: 'Esprit De Corps',
        text: `The ${this.lcName} has advantage on attack rolls against a creature if at least one of its allies is within <me-distance length="5" /> of the creature and the ally isn't incapacitated.`,
        id: 'esprit-de-corps'
      })
      if (!this.npc.skills) {
        this.npc.skills = []
      }
      if (!this.npc.skills.includes('athletics')) {
        this.npc.skills.push('athletics')
      }
      if (!this.npc.irv) {
        this.npc.irv = {}
      }
      this.npc.irv.res = [...new Set((this.npc.irv.res || []).concat(['radiant']))]
    },
    volus () {
      this.npc.entries.features.push({
        name: 'Fury of the Small',
        recharge: 'long',
        text: `When the ${this.lcName} deals damage to a creature that is one size larger than itself, it may deal an extra ${this.metaLevel} damage.`,
        id: 'fury-of-the-small'
      })
      this.npc.entries.features.push({
        name: 'Lucky',
        uses: 3,
        perDay: true,
        text: `The ${this.lcName} gains advantage on an attack roll, saving throw, or ability check. The ${this.lcName} can also cause disadvantage on an attack roll that targets it.`,
        id: 'lucky'
      })
      this.npc.entries.features.push({
        name: 'Hermetic Suit',
        text: `When the ${this.lcName} suffers a critical hit that deals piercing or slashing damage, it takes 7 (2d6) poison and 3 (1d6) slashing damage at the end of each of its turns until the suit is patched. It may patch its suit using an action and expending an omni-gel.`,
        id: 'hermetic-suit'
      })
      if (!this.npc.irv) {
        this.npc.irv = {}
      }
      this.npc.irv.res = [...new Set((this.npc.irv.res || []).concat(['necrotic', 'poison']))]
      if (!this.npc.skills) {
        this.npc.skills = []
      }
      if (!this.npc.skills.includes('persuasion')) {
        this.npc.skills.push('persuasion')
      }
    },
    vorcha () {
      this.npc.entries.features.push({
        name: 'Non-Differentiated Cells',
        text: `The ${this.lcName} has advantage on saving throws that would cause it to become poisoned.`,
        id: 'non-differentiated-cells'
      })
      if (!this.npc.irv) {
        this.npc.irv = {}
      }
      this.npc.irv.res = [...new Set((this.npc.irv.res || []).concat(['poison']))]
      this.npc.entries.actions.push({
        attack: 'melee',
        proficient: true,
        range: 5,
        dc: false,
        mod: 'str',
        damage: [
          {
            dieCount: 1,
            dieType: 6,
            mod: true,
            type: 'piercing'
          }
        ],
        target: 'one',
        name: 'Bite',
        id: 'bite'
      })
      const options = ['aquatic', 'desert', 'frozen', 'highGravity', 'underground', 'volcanic', 'zeroGravity']
      const environ = this.randomValue(options)
      switch (environ) {
        case 'aquatic':
          this.npc.entries.features.push({
            name: 'Amphibious',
            text: `The ${this.lcName} can breathe both air and water.`,
            id: 'amphibious'
          })
          this.npc.speed.swim = 30
          break
        case 'desert':
          if (this.npc.abilityScores.con !== 30) {
            this.npc.abilityScores.con += 1
          }
          break
        case 'frozen':
          this.npc.irv.res = [...new Set((this.npc.irv.res || []).concat(['cold']))]
          break
        case 'highGravity':
          if (this.npc.abilityScores.str !== 30) {
            this.npc.abilityScores.str += 1
          }
          break
        case 'underground':
          if (!this.npc.senses) {
            this.npc.senses = {}
          }
          this.npc.senses.darkvision = 60
          this.npc.senses.blindsight = 30
          break
        case 'volcanic':
          this.npc.irv.res = [...new Set((this.npc.irv.res || []).concat(['fire']))]
          break
        case 'zeroGravity':
          this.npc.entries.features.push({
            name: 'Zero-g Aptitude',
            text: `When ${this.lcName} is <me-condition id="lifted" /> its movement speed is <me-distance length="5" /> and it does not have disadvantage on attack rolls.`,
            id: '0g-aptitude'
          })
      }
    }

  }
}
