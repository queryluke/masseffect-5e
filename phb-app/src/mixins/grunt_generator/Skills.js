export const SavingThrows = {
  methods: {
    setGruntSavingThrows(config, grunt) {
      let numSavingThrows = parseFloat(config.cr.cr) <= 1 ? 0 : Math.ceil(parseFloat(config.cr.cr) / 4);
      const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
      if (config.sc.id !== 'none') {
        grunt.savingThrows = config.sc.saving_throw.split(',').map(st => {
          const ability = st.toLowerCase().trim().slice(0, 3);
          abilities.splice(abilities.indexOf(ability), 1);
          numSavingThrows--;
          return ability;
        });
        if (numSavingThrows < 2) {
          grunt.savingThrows.splice(1, 1);
        }
      }
      for (let i = 1; i <= numSavingThrows; i++) {
        const st = this.randomValue(abilities);
        grunt.savingThrows.push(st);
      }

      if (grunt.savingThrows.length > 1) {
        config.effective.ac += 2;
      }
    }
  }
};
