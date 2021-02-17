export const Features = {
  computed: {
    vanguard () {
      return this.$store.getters.getItem('classes', 'vanguard')
    },
    aggressive () {
      this.adjustments.dpr += 2
      return {
        name: 'Aggressive',
        recharge: null,
        description: `As a bonus action, the ${this.options.klass.id} can move up to its speed toward a hostile creature that it can see.`
      }
    },
    ambusher () {
      this.adjustments.hit += 1
      return {
        name: 'Ambusher',
        recharge: null,
        description: `The ${this.options.klass.id} has advantage on attack rolls against any creature it has surprised.`
      }
    },
    amphibious () {
      return {
        name: 'Amphibious',
        recharge: null,
        description: 'Can breathe both air and water.'
      }
    },
    darkvision () {
      return {
        name: 'darkvision',
        range: 20
      }
    },
    barrier () {
      const spellcastingLevelIndex = this.options.klass.id === 'vanguard' ? this.options.cr.spellcastingLevel : Math.ceil(this.options.cr.spellcastingLevel / 2) - 1
      const barrierTicksArray = this.vanguard.progressionColumns.find(p => p.key === 'barrierTicks')
      const barrierTicks = barrierTicksArray.values[spellcastingLevelIndex]
      const barrierUsesArray = this.vanguard.progressionColumns.find(p => p.key === 'barrierUses')
      this.grunt.barrier = barrierTicks
      this.adjustments.hp += (4 * barrierTicks)
      return {
        name: 'Barrier',
        recharge: `${barrierUsesArray.values[spellcastingLevelIndex]}/Day`,
        description: `As an action or bonus action, the ${this.options.klass.id} gains ${barrierTicks} barrier ticks.`
      }
    },
    tacticalCloak () {
      this.adjustments.ac += 1
      return {
        name: 'Tactical Cloak',
        recharge: `${this.crMetaLevel + 1}/Day`,
        description: 'As a bonus action, the infiltrator may cast Tactical Cloak, becoming invisible. When it makes a melee, ranged, or tech attack, tactical cloak ends.'
      }
    },
    sneakAttack () {
      const sneakAttackDie = `${(1 + this.crMetaLevel) + Math.floor(this.crMetaLevel / 2)}d6`
      const extraDmg = this.averageFromDie(sneakAttackDie)
      this.adjustments.dpr += extraDmg
      return {
        name: 'Sneak Attack',
        recharge: '1/Turn',
        description: `The infiltrator deals an extra ${extraDmg} (${sneakAttackDie}) damage when it hits a target with a weapon attack and has advantage on the attack roll, ` +
        'or when the target is within 5 feet of an ally of the infiltrator that isn\'t incapacitated and the infiltrator doesn\'t have disadvantage on the attack roll.'
      }
    }
  },
  methods: {
    setGruntFeatures () {
      this.grunt.features = []
      this.grunt.reactions = []
      this.grunt.senses = []
      this.grunt.barrier = null
      // mandatory
      if (this.options.klass.id === 'infiltrator') {
        this.addFeature('tacticalCloak', 'features')
        this.addFeature('sneakAttack', 'features')
      }
      if (['vanguard', 'adept', 'sentinel'].includes(this.options.klass.id) && this.options.cr.spellcastingLevel !== false) {
        this.addFeature('barrier', 'features')
      }
      if (this.options.species.id === 'drell') {
        this.addFeature('darkvision', 'senses')
      }
    },
    addFeature (name, type) {
      this.grunt[type].push(this[name])
    }
  },
  data () {
    return {
      numFeatureWeights: {
        0: [0, 0, 0, 1, 1],
        1: [0, 1, 1, 1, 2],
        2: [1, 1, 1, 2, 2],
        3: [1, 2, 2, 3, 3]
      }
    }
  }
}
