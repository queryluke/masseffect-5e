export const Ac = {
  computed: {
    csAc () {
      if (this.character.settings.acOverride) {
        return this.character.settings.acOverride
      }
      const equippedArmor = this.csArmor.filter(i => i.equipped)
      const head = equippedArmor.find(i => i.stats.placement === 'head')
      const body = equippedArmor.find(i => i.stats.placement === 'body_armor')
      const chest = equippedArmor.find(i => i.stats.placement === 'chest')
      const arms = equippedArmor.find(i => i.stats.placement === 'arms')
      const legs = equippedArmor.find(i => i.stats.placement === 'legs')
      let runningAc = 10
      let numMed = 0
      let numHeavy = 0
      if (body) {
        if (body.stats.type === 'light') {
          runningAc += 1
        } else if (body.stats.type === 'medium') {
          runningAc += 4
          numMed = 3
        } else if (body.stats.type === 'heavy') {
          runningAc += 7
          numHeavy = 3
        }
      } else {
        if (chest) {
          numMed += chest.stats.type === 'medium' ? 1 : 0
          numHeavy += chest.stats.type === 'heavy' ? 1 : 0
          runningAc += chest.stats.type === 'heavy' ? 3 : chest.stats.type === 'medium' ? 2 : 1
        }
        if (arms) {
          numMed += arms.stats.type === 'medium' ? 1 : 0
          numHeavy += arms.stats.type === 'heavy' ? 1 : 0
          runningAc += arms.stats.type === 'heavy' ? 2 : arms.stats.type === 'medium' ? 1 : 0
        }
        if (legs) {
          numMed += legs.stats.type === 'medium' ? 1 : 0
          numHeavy += legs.stats.type === 'heavy' ? 1 : 0
          runningAc += legs.stats.type === 'heavy' ? 2 : legs.stats.type === 'medium' ? 1 : 0
        }
      }
      if (head) {
        numMed += head.stats.type === 'medium' ? 1 : 0
        numHeavy += head.stats.type === 'heavy' ? 1 : 0
      }
      const dexMax = numHeavy > 0 ? 0 : numMed > 0 ? 2 : 999
      const dexMod = this.speciesId === 'elcor' ? this.absMod('con') : this.absMod('dex')
      const appliedDex = Math.min(dexMax, dexMod)
      const selectionsAc = this.selections.filter(i => i.type === 'ac').reduce((acc, curr) => acc + curr.has.bonus, 0)
      return runningAc + appliedDex + selectionsAc + this.character.settings.acBonus
    }
  }

}
