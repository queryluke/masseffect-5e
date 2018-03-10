export const Tech = {
  methods: {
    setMonsterTech(monster) {
      const tech = [];
      const spells = this.getData('spells');
      for (const spellId of monster.techcasting.spells) {
        const spell = spells.find(spell => spell.id === spellId);
        tech.push(spell);
      }
      monster.techcasting.spells = tech;
    }
  }
};
