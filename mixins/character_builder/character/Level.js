export const Level = {
  computed: {
    level () {
      let level = 0
      for (const item of this.characterClasses) {
        level += item.levels
      }
      return level
    },
    levelInfo () {
      return this.progression[this.level - 1]
    },
    nextLevelInfo () {
      return this.progression[this.level] ? this.progression[this.level] : false
    },
    xp () {
      return this.character.experiencePoints || 0
    }
  }
}
