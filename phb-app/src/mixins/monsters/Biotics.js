export const Biotics = {
  methods: {
    setMonsterBiotics(monster) {
      const spells = this.getData('spells');
      if (monster.spellcasting.level === 'innate') {
        const groupList = [];
        for (const group of monster.spellcasting.spells) {
          for (const spellId of group.spells) {
            const spell = spells.find(spell => spell.id === spellId);
            groupList.push(spell);
          }
          group.spells = groupList;
        }
      } else {
        for (const spellId of monster.spellcasting.spellList) {
          const spell = spells.find(spell => spell.id === spellId);
          monster.spellcasting.spells[spell.level].spells.push(spell);
        }
      }
      delete monster.spellcasting.spellList;
    }
  }
};
