export const Biotics = {
  methods: {
    setMonsterBiotics(monster, spells) {
      for (const spellId of monster.spellcasting.spellList) {
        const spell = spells.find(spell => spell.id === spellId);
        monster.spellcasting.spells[spell.level].spells.push(spellId);
      }
      delete monster.spellcasting.spellList;
    }
  }
};
