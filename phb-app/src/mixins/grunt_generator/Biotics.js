export const Biotics = {
  methods: {
    setGruntBiotics(config, grunt) {
      const effectiveCrLevel = this.getEffectiveCrAdjustment()
      const crMetaLevel = parseFloat(config.cr.cr) <= 1 ? 0 : Math.ceil(parseFloat(config.cr.cr) / 4);
      switch (config.sc.id) {
        case 'adept': {

        }
      }
    }
  },
  data() {
    return {
      spells: [],
      templates: {
        adept: {
          0: {'cantrip': 2},
        }
      }
    };
  },
  created() {
    return this.$http
    .get('../data/spells.json')
    .then(response => response.json())
    .then(response => {
      this.spells = response.data.filter(spell => spell.type === 'biotic');
    });
  }
};
