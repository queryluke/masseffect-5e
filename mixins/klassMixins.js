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
    createAbiFeatures (abis, level) {
      if (!abis.includes(level)) {
        return false
      }
      const abiLevels = abis.slice(abis.indexOf(level))
      const first = abiLevels.shift()
      const abiText = this.$t('character.klass.progression.abi.text', {
        level: this.$t('level.nth', {
          level: this.$t(`numbers.ordinal[${first}]`)
        }),
        and_list: this.$t(`lists.and_list[${abiLevels.length}]`, abiLevels.map(i => this.$t(`numbers.ordinal[${i}]`)))
      })
      return {
        name: this.$t('character.klass.progression.abi.title'),
        id: `${this.klassId}-ability-score-increase-${first}`,
        level: first,
        klass: this.klassId,
        html: `<p>${abiText}</p><p>${this.$t('character.klass.progression.abi.feat_text')}</p>`
      }
    },
    minHitDieRoll (hitDie) {
      return Math.ceil((hitDie + 1) / 2)
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
    },
    featuresByLevel (level) {
      const features = this.classFeatures.filter(i => i.level === level && !i.subclass)
      if (this.item.progression.abi.includes(level)) {
        features.push({ name: this.$t('character.klass.progression.abi.title'), id: 'ability-score-increase' })
      }
      if (this.item.progression.subclass.includes(level)) {
        features.push({ name: this.$t(`character.klass.progression.subclass.${this.item.id}`), id: `subclass-feature-${level}` })
      }
      return features
    },
    getFeatureTextByLevel (level) {
      const features = this.featuresByLevel(level).map(i => i.name)
      return features.length === 0 ? '-' : features.join(', ')
    }
    /*
    profText (prof, values) {
      let tPath = false
      switch (prof) {
        case false:
          return this.$t('none')
        case 'weapon':
          tPath = 'equipment.weapons.types'
          break
        case 'armor':
          tPath = 'equipment.armor.types'
          break
        case 'tool':
          tPath = 'tool_profs.types'
          break
        case 'savingThrow':
          tPath = 'abilities'
          break
      }
      const has = values.has ? this.$tc('lists.comma_list', values.has.length, this.translateProfList(values.has, tPath)) : false
      const chooseObject = values.choices
        ? {
            number: this.$t(`numbers.base[${values.choices.count}]`),
            list: this.$tc('lists.and_list', values.choices.length, this.translateProfList(values.choices.items, tPath))
          }
        : false
      if (has && chooseObject) {
        return this.$t('character.klass.profs.selection_w_options', {
          has,
          choose: this.$t('character.klass.choose', chooseObject)
        })
      }
      if (!has && chooseObject) {
        return this.$t('character.klass.selection_option_only', chooseObject)
      }
      return has
    },
    translateProfList (list, path) {
      return list.map((i) => {
        const fullPath = `${path}.${i}`
        const translation = this.$t(fullPath)
        if (translation === fullPath) {
          // TODO: get the item from an endpoint
        }
        return translation
      })
    },
    */
  }
}
