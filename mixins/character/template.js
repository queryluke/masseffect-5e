export const characterTemplate = {
  name: null,
  id: '',
  image: null,
  experiencePoints: {
    points: 0,
    milestone: 1
  },
  species: null,
  classes: [],
  abilityScores: {
    str: {
      value: null,
      other: null,
      override: null
    },
    dex: {
      value: null,
      other: null,
      override: null
    },
    con: {
      value: null,
      other: null,
      override: null
    },
    int: {
      value: null,
      other: null,
      override: null
    },
    wis: {
      value: null,
      other: null,
      override: null
    },
    cha: {
      value: null,
      other: null,
      override: null
    }
  },
  background: null,
  characteristics: {
    alignment: '',
    personality_traits: '',
    ideal: '',
    bond: '',
    flaw: '',
    gender: '',
    place_of_birth: '',
    age: '',
    height: '',
    weight: '',
    hair: '',
    eyes: '',
    skin: '',
    appearance: '',
    backstory: ''
  },
  equipment: [],
  powers: [],
  selected: [],
  currentStats: {
    hitPointsLost: 0,
    tempHp: {
      max: 0,
      value: 0
    },
    shieldsLost: 0,
    barrier: {
      used: 0,
      ticksUsed: 0
    },
    hitDiceUsed: {},
    deathSaves: {
      successes: 0,
      failures: 0
    },
    tpUsed: 0,
    psUsed: [0, 0, 0, 0, 0],
    hasInspiration: false,
    conditions: [],
    exhaustion: 0,
    indoctrination: 0,
    resources: {},
    paragon: 0,
    renegade: 0,
    credits: 0
  },
  settings: {
    acOverride: null,
    acBonus: 0,
    shields: null,
    regen: null,
    speeds: {
      walk: 0,
      swim: 0,
      fly: 0,
      burrow: 0,
      climb: 0
    },
    senses: {
      darkvision: 0,
      tremorsense: 0,
      blindsight: 0,
      'infrared-vision': 0,
      truesight: 0
    },
    attackMod: 0,
    attackMeleeMod: 0,
    attackRangedMod: 0,
    attackSpellMod: 0,
    damageMod: 0,
    damageMeleeMod: 0,
    damageRangedMod: 0,
    damageSpellMod: 0,
    damageRes: [],
    damageImm: [],
    damageVul: [],
    conditionImm: [],
    powercasting: {},
    skill: [],
    expertise: [],
    armor: [],
    savingThrow: [],
    weapon: [],
    tool: []
  },
  notes: '',
  brews: [],
  options: {
    tashas: false,
    asiGenMethod: 'standard',
    weaponSlots: true,
    grenadeSlots: true,
    medigelSlots: true,
    thermalClipSlots: true,
    programInstall: true,
    consumeThermalClips: true,
    armorSpeedPenalty: true,
    armorProficiencyPenalty: true,
    useMilestone: false
  },
  meta: {
    remote: false,
    version: '1.0.1'
  }
}
