export const Biotics = {
  methods: {
    setMonsterBiotics(monster) {
      const spells = this.getData('spells');
      for (const spellId of monster.spellcasting.spellList) {
        const spell = spells.find(spell => spell.id === spellId);
        monster.spellcasting.spells[spell.level].spells.push(spell);
      }
      delete monster.spellcasting.spellList;
    }
  }
};
