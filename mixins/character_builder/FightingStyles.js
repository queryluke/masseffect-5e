export const FightingStyles = {
  data () {
    return {

    }
  },
  computed: {
    selectedFightingStyles () {
      // TODO: remove the character.fightingStyles
      const oldFs = (this.character.fightingStyles || []).map(i => i.name.toLowerCase().replaceAll(' ', '-'))
      const fightingStyles = this.mechanicBagSelections.filter(i => i.type === 'fighting-style').map(i => i.value)
      return [...new Set(oldFs.concat(fightingStyles))]
    },
    csFightingStyles () {
      const fightingStyles = []
      for (const id of this.selectedFightingStyles) {
        const fs = this.getFightingStyle(id)
        if (fs) {
          fightingStyles.push(fs)
        } else {
          // console.log(`${id} fighting style not found`)
        }
      }
      return fightingStyles
    }
  },
  methods: {
    getFightingStyle (id) {
      return this.fightingStyles.find(i => i.id === id)
    }
  }
}
