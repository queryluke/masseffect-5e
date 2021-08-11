export const Hp = {
  computed: {
    csMaxHp () {
      let max = 0
      for (const klass of this.characterClasses) {
        for (const hp of klass.hitPoints) {
          max += hp
        }
      }
      max += (this.level * this.absMod('con'))
      // TODO: these should be on the species
      if (this.speciesId === 'hanar') {
        max -= (this.level)
      }
      if (this.speciesId === 'krogan') {
        max += (this.level)
      }
      return max
    },
    csCurrentHp () {
      return Math.max(this.csMaxHp - this.csHitPointsLost, 0)
    },
    csHitPointsLost: {
      get () {
        return this.character.currentStats.hitPointsLost
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'currentStats.hitPointsLost',
          value
        })
      }
    },
    csTempHp: {
      get () {
        return this.character.currentStats.tempHp.max
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'currentStats.tempHp.max',
          value
        })
      }
    },
    csCurrentTempHp: {
      get () {
        return this.character.currentStats.tempHp.value
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'currentStats.tempHp.value',
          value
        })
      }
    },
    csMaxShields: {
      get () {
        return this.character.settings.shields
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'currentStats.shields.max',
          value
        })
      }
    },
    csCurrentShields: {
      get () {
        return this.character.currentStats.shields.value
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'currentStats.shields.value',
          value
        })
      }
    }
  }

}
