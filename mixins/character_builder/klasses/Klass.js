export const Klass = {
  watch: {
    'klass.levels' (level) {
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
      // update features
      const clonedFeatureSelections = JSON.parse(JSON.stringify(this.klass.featureSelections))
      const availableFeatureIds = this.availableKlassFeatures.map(i => i.id)
      for (const featureId in this.klass.featureSelections) {
        if (!availableFeatureIds.includes(featureId)) {
          delete clonedFeatureSelections[featureId]
        }
      }
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `classes.${this.classIndex}.featureSelections`, value: clonedFeatureSelections })
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
        return this.klass.featureSelections.subclass
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `classes.${this.classIndex}.featureSelections.subclass`, value })
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
    featureSelection: {
      get () {
        return this.klass.featureSelections[this.featureSelectionId]
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `classes.${this.classIndex}.featureSelections.${this.featureSelectionId}`, value })
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