export const Klass = {
  watch: {
    'klass.levels' (level, oldLevel) {
      // update hp
      const hpLength = this.klassHitPoints.length
      const clonedHp = [...this.klassHitPoints]
      if (level !== this.klass.hitPoints.length) {
        if (level > hpLength) {
          for (let i = 0; i < level - hpLength; i++) {
            clonedHp.push(Math.floor(this.klassData.hitDie / 2) + 1)
          }
        } else if (level < hpLength) {
          clonedHp.splice(level)
        }
        this.klassHitPoints = clonedHp
      }
      if (level < oldLevel) {
        // remove features no longer at level
        const klassFeatures = this.selections.filter(i => i.source.startsWith(`klass-${this.klass.id}`))
        for (const feature of klassFeatures) {
          const featureLevel = Number.parseInt(feature.source.split('-')[2])
          if (featureLevel >= level) {
            this.$store.dispatch('cb/DELETE_SELECTIONS', { cid: this.cid, id: feature.source })
          }
        }
        // remove fighting styles
        // FIXME
        if (this.klass.id === 'sentinel' && this.klass.levels < 2) {
          const oldFs = [...this.character.fightingStyles]
          const sentIndex = oldFs.findIndex(i => i.id === 'fighting-style-sentinel')
          if (sentIndex > -1) {
            oldFs.splice(sentIndex, 1)
            this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'fightingStyles', value: oldFs })
          }
        }
      } else {
        // add all features from old to new level
        let newSelections = []
        for (const feature of this.availableKlassFeatures) {
          if (feature.level > oldLevel && feature.mechanics) {
            newSelections = newSelections.concat(this.getMechanicsWithoutChoices(`klass-${this.klass.id}-${feature.level}`, feature))
          }
        }
        this.$store.dispatch('cb/ADD_SELECTIONS', { cid: this.cid, selections: newSelections })
      }
    }
  },
  computed: {
    klass () {
      if (!this.character) {
        return false
      }
      return this.character.classes[this.classIndex]
    },
    klassData () {
      return this.classData(this.klass.id)
    },
    subklass: {
      get () {
        return this.klass.subclass
      },
      set (value) {
        // FIXME: fold this into the other selection workflows
        if (this.subklass === 'gladiator') {
          const oldFs = [...this.character.fightingStyles]
          const gladIndex = oldFs.findIndex(i => i.id === 'additional-fighting-style')
          if (gladIndex > -1) {
            oldFs.splice(gladIndex, 1)
            this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'fightingStyles', value: oldFs })
          }
        }
        const subklassFeaturesToDelete = this.selections.filter((i) => {
          if (!i.source.startsWith(`klass-${this.klass.id}`)) {
            return false
          }
          const subklassId = i.source.split('-')[3]
          return subklassId === this.subklass
        })
        for (const sftd of subklassFeaturesToDelete) {
          this.$store.dispatch('cb/DELETE_SELECTIONS', { cid: this.cid, id: sftd.source })
        }
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `classes.${this.classIndex}.subclass`, value })
      }
    },
    firstSubklassLevel () {
      return this.klassData.progression.subclass[0]
    },
    subklassData () {
      return this.subclasses.find(i => i.id === this.subklass)
    },
    subklassOptions () {
      return this.subclasses.filter(i => i.klass === this.klass.id)
    },
    abiLevels () {
      return this.klassData.progression.abi
    },
    availableKlassFeatures () {
      // TODO: Translate these
      let features = []
      for (let level = 1; level <= this.klass.levels; level++) {
        if (level === this.firstSubklassLevel) {
          features.push({
            name: 'Select Subclass',
            id: 'subclass',
            level
          })
        }
        if (this.abiLevels.includes(level)) {
          features.push({
            name: this.$t('ability_score_increase_title'),
            id: 'abi',
            level
          })
        }
        const featuresAtLevel = this.features.filter((i) => {
          return i.klass === this.klass.id &&
            (!i.subclass || (this.subklass ? i.subclass === this.subklass : false)) &&
            i.level === level
        })
        features = features.concat(featuresAtLevel)
      }
      return features
    },
    klassHpOverride: {
      get () {
        return this.klass.hpOverride
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `classes.${this.classIndex}.hpOverride`, value })
      }
    },
    klassHitPoints: {
      get () {
        return this.klass.hitPoints
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `classes.${this.classIndex}.hitPoints`, value })
      }
    },
    klassLevel: {
      get () {
        return this.klass.levels
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `classes.${this.classIndex}.levels`, value })
      }
    },
    klassProficiencyOptions () {
      if (this.classIndex === 0) {
        return this.klassData.profs
      } else {
        return this.multiclassProficiencies[this.klass.id]
      }
    }
  }
}
