export const WeaponActions = {
  methods: {
    setGruntWeaponActions(config, grunt, options = {}) {
      const options = Object.assign(JSON.parse(JSON.stringify(this.options)), options);
      console.log(options);
      const targetDamage = targetDamage ? targetDamage : this.getTargetDamage(config, grunt);
      const dmgOptions = this.weapons.map(weapon => {
        // single attack


      });

    },
  },
  data() {
    return {
      weapons: [],
      options: {
        targetDamage: { dmgMin: 0, dmgMax: 5},
        allowHeavyWeapons: true,
        allowMeleeWeapons: true,
      }
    };
  },
  created() {
    return this.$http
    .get('../data/weapons.json')
    .then(response => response.json())
    .then(response => {
      const weapons = response.data.map(weapon => {
        weapon.dpr = parseInt(weapon.rof, 10) * (((parseInt(weapon.damage, 10) * 2) + 1) / 2);
      });
    });
  }
};
