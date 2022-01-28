export const characterTemplate = {
  name: null,
  id: '',
  image: null,
  experiencePoints: 0,
  species: null,
  subspecies: null,
  classes: [],
  // TODO: this should be in the selections
  fightingStyles: [],
  abilityScores: {
    genMethod: {
      text: 'Standard Array',
      value: 'standard'
    },
    standard: {
      str: null,
      con: null,
      dex: null,
      wis: null,
      int: null,
      cha: null
    },
    buy: {
      str: null,
      con: null,
      dex: null,
      wis: null,
      int: null,
      cha: null
    },
    manual: {
      str: null,
      con: null,
      dex: null,
      wis: null,
      int: null,
      cha: null
    },
    other: {
      str: null,
      con: null,
      dex: null,
      wis: null,
      int: null,
      cha: null
    },
    override: {
      str: null,
      con: null,
      dex: null,
      wis: null,
      int: null,
      cha: null
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
  credits: 0,
  omnigel: 0,
  medigel: 0,
  equipment: [],
  powers: [],
  selections: [],
  selected: [], // new selection bag
  currentStats: {
    hitPointsLost: 0,
    tempHp: {
      max: 0,
      value: 0
    },
    shields: {
      value: 0,
      max: 0
    },
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
    featuresTimesUsed: {},
    conditions: [],
    exhaustion: 0,
    indoctrination: 0,
    resources: {},
    paragon: 0,
    renegade: 0
  },
  settings: {
    acOverride: null,
    acBonus: 0,
    shields: 5,
    regen: 5,
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
    powerModAbility: null,
    skills: [],
    expertise: []
  },
  notes: '',
  brews: [],
  options: {
    tashas: false
  },
  meta: {
    remote: false,
    version: '1.0.1'
  }
}
