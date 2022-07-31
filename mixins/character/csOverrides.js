export const CsOverrides = {
  data () {
    return {
      csOverrides: [
        {
          name: 'Defenses',
          items: [
            { key: 'hp', type: 'number', label: 'Hit Points', min: 1, default: null },
            { key: 'acOverride', type: 'number', label: 'Armor Class (AC)', min: 1, default: null },
            { key: 'shields', type: 'number', label: 'Shield Capacity', min: 5, default: null },
            { key: 'regen', type: 'number', label: 'Shield Regen', min: 5, default: null },
            { key: 'damageRes', type: 'select', label: 'Damage Resistances', items: 'damageTypes', default: [] },
            { key: 'damageImm', type: 'select', label: 'Damage Immunities', items: 'damageTypes', default: [] },
            { key: 'conditionImm', type: 'select', label: 'Condition Immunities', items: 'conditions', default: [] },
            { key: 'damageVul', type: 'select', label: 'Damage Vulnerabilities', items: 'damageTypes', default: [] }
          ]
        }
      ]
    }
  }
}

/*
armor: []
attackMeleeMod: 0
attackMod: 0
attackRangedMod: 0
attackSpellMod: 0
conditionImm: []
damageImm: []
damageMeleeMod: 0
damageMod: 0
damageRangedMod: 0
damageRes: []
damageSpellMod: 0
damageVul: []
expertise: []
powercasting: {}
savingThrow: []
senses: {darkvision: 0, tremorsense: 0, blindsight: 0, infrared-vision: 0, truesight: 0}
shieldSource: "armor"
skill: []
speeds: {walk: 0, swim: 0, fly: 0, burrow: 0, climb: 0}
tool: []
weapon: []
 */
