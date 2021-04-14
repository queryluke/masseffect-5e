export const KlassMixins = {
  computed: {
    powerCastingColumnCount () {
      const ps = this.item.progression.columns.find(p => p.label === 'power_slots_by_power_level')
      return ps ? ps.values.length : 0
    },
    powerCastingHeaderOffset () {
      return this.headerArray.length - this.powerCastingColumnCount
    },
    headerArray () {
      const array = [
        {
          text: this.$t('level.title'),
          value: 'level',
          class: 'text-center'
        },
        {
          text: this.$t('character.klass.progression.columns.prof_bonus'),
          value: 'proficiencyBonus',
          class: 'text-center'
        }
      ]
      for (const p of this.item.progression.columns) {
        if (p.label === 'power_slots_by_power_level') {
          for (let l = 0; l < p.values.length; l++) {
            array.push({
              text: this.$t(`numbers.ordinal[${l + 1}]`),
              value: `powerSlots${l}`,
              class: 'text-center'
            })
          }
        } else {
          array.push({
            text: this.$t(`character.klass.progression.columns.${p.label}`),
            value: p.label,
            class: 'text-center'
          })
        }
      }
      return array
    },
    progression () {
      const progression = []
      for (const row of this.characterProgression) {
        const output = {
          cssId: `Level${row.level}`,
          id: row.level,
          level: this.$t(`numbers.ordinal[${row.level}]`),
          proficiencyBonus: `+${row.profBonus}`
        }
        for (const p of this.item.progression.columns) {
          if (typeof p.values === 'undefined') {
            output[p.label] = this.getFeatureTextByLevel(row.level)
          } else if (p.label === 'power_slots_by_power_level') {
            for (let l = 0; l < p.values.length; l++) {
              const val = p.values[l][row.level - 1]
              output[`powerSlots${l}`] = val === 0 ? '-' : val
            }
          } else {
            output[p.label] = p.values[row.level - 1]
          }
        }
        progression.push(output)
      }
      return progression
    }
  },
  methods: {
    createAbiFeatures (first, rest) {
      const atLevel = {
        level: this.$t('level.nth', {
          level: this.$t(`numbers.ordinal[${first}]`)
        })
      }
      if (rest) {
        atLevel.and_list = this.$t(`lists.and_list[${rest.length}]`, rest.map(i => this.$t(`numbers.ordinal[${i}]`)))
      }
      const abiText = this.$t('character.klass.progression.abi.text', {
        at_level: this.$tc('character.klass.progression.abi.at_level', rest ? 2 : 1, atLevel)
      })
      return {
        name: this.$t('character.abi_title'),
        id: `${this.klassId}-ability-score-increase-${first}`,
        level: first,
        klass: this.klassId,
        html: `<p>${abiText}</p><p>${this.$t('character.klass.progression.abi.feat_text')}</p>`
      }
    },
    minHitDieRoll (hitDie) {
      return Math.ceil((hitDie + 1) / 2)
    },
    featuresByLevel (level) {
      const features = this.classFeatures.filter(i => i.level === level && !i.subclass)
      if (this.item.progression.abi.includes(level)) {
        features.push({ name: this.$t('character.abi_title'), id: 'ability-score-increase' })
      }
      if (this.item.progression.subclass.includes(level)) {
        features.push({ name: this.$t(`character.klass.progression.subclass.${this.item.id}`), id: `subclass-feature-${level}` })
      }
      return features
    },
    getFeatureTextByLevel (level) {
      const features = this.featuresByLevel(level).map(i => i.name)
      return features.length === 0 ? '-' : features.join(', ')
    },
    profLabel (prof) {
      switch (prof) {
        case 'weapon':
          return this.$tc('equipment.weapons.title')
        case 'armor':
          return this.$t('equipment.armor.title')
        case 'tool':
          return this.$t('equipment.gear.types.tool')
        case 'skill':
          return this.$t('skills.title')
        case 'savingThrow':
          return this.$t('saving_throws')
      }
    }
  }
}
