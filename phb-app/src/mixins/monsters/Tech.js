export const Tech = {
  methods: {
    setMonsterTech(monster) {
      const tech = [];
      const spells = this.getData('spells');
      for (const spellId of monster.techcasting.spells) {
        const spell = spells.find(spell => spell.id === spellId);
        if (spell) {
          tech.push(spell);
        } else {
          console.log(`Spell not found: ${monster.name} | ${spellId}`);
        }
      }
      monster.techcasting.spells = tech;
    }
  }
};
