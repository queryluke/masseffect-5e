export const Tech = {
  methods: {
    setMonsterTech(monster, spells) {
      const tech = [];
      for (const spellId of monster.techcasting.spells) {
        const spell = spells.find(spell => spell.id === spellId);
        tech.push(spell);
      }
      monster.techcasting.spells = tech;
    }
  }
};
