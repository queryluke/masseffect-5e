export const Biotics = {
  methods: {
    setMonsterBiotics (monster) {
      const spells = this.getData('spells')
      if (monster.spellcasting.level === 'innate') {
        for (const group of monster.spellcasting.spells) {
          const groupList = []
          for (const spellId of group.spells) {
            const spell = spells.find(spell => spell.id === spellId)
            if (spell) {
              groupList.push(spell)
            } else {
              console.log(`Spell not found: ${monster.name} | ${spellId}`)
            }
          }
          group.spells = groupList
        }
      } else {
        for (const spellId of monster.spellcasting.spellList) {
          const spell = spells.find(spell => spell.id === spellId)
          if (spell) {
            monster.spellcasting.spells[spell.level].spells.push(spell)
          } else {
            console.log(`Spell not found: ${monster.name} | ${spellId}`)
          }
        }
      }
      delete monster.spellcasting.spellList
    }
  }
}
