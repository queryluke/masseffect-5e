import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
  // Default "empty" character data model
  character: {
    name: '',
    id: '',
    userId: '',
    builderVersion: '0.5.12',
    image: '',
    user: '',
    experiencePoints: 0,
    species: {
      name: '',
      abilityScoreImprovementSelectedOption: 0,
      abilityScoreImprovement: {}
    },
    classes: [],
    baseAbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0
    },
    background: {
      name: '',
      feat: {
        name: '',
        type: 'Feat'
      }
    },
    characteristics: {
      alignment: '',
      'Personality Traits': '',
      Ideal: '',
      Bond: '',
      Flaw: '',
      Gender: '',
      'Place of Birth': '',
      Age: '',
      Height: '',
      Weight: '',
      Hair: '',
      Eyes: '',
      Skin: '',
      Appearance: '',
      Backstory: ''
    },
    credits: 0,
    equipment: [],
    currentStats: {
      hitPointsLost: 0,
      temporaryHitPoints: 0,
      techPointsUsed: 0,
      forcePointsUsed: 0,
      superiorityDiceUsed: 0,
      hitDiceUsed: {},
      deathSaves: {
        successes: 0,
        failures: 0
      },
      hasInspiration: false,
      featuresTimesUsed: {},
      conditions: [],
      exhaustion: 0,
      highLevelCasting: {
        level6: false,
        level7: false,
        level8: false,
        level9: false
      }
    },
    tweaks: {},
    customProficiencies: [],
    customLanguages: [],
    customFeatures: [],
    customFeats: [],
    customTechPowers: [],
    customForcePowers: [],
    customEquipment: [],
    settings: {
      isEnforcingForcePrerequisites: true,
      isFixedHitPoints: false,
      abilityScoreMethod: 'Standard Array'
    },
    notes: '',
    createdAt: 1615572574654,
    changedAt: 1615572574654,
    localId: 'temp-x7vniqzfa'
  }
  /*
  character: {
    version: '1.0.0',
    name: 'New Character',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
    level: 1,
    race: '',
    class: '',
    subclass: '',
    background: '',
    other_info: [],
    traits: [],
    class_features: [],
    feats: [],
    backgrounds: [],
    health: 0,
    max_health: 5,
    shields: 0,
    max_shields: 5,
    barrier_ticks: 0,
    stats: {
      str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10
    },
    skills: [
      { label: 'Acrobatics', prof: 0, advantage: false, stat: 'dex' },
      { label: 'Athletics', prof: 0, advantage: false, stat: 'str' },
      { label: 'Deception', prof: 0, advantage: false, stat: 'cha' },
      { label: 'Electronics', prof: 0, advantage: false, stat: 'int' },
      { label: 'Engineering', prof: 0, advantage: false, stat: 'int' },
      { label: 'History', prof: 0, advantage: false, stat: 'int' },
      { label: 'Insight', prof: 0, advantage: false, stat: 'wis' },
      { label: 'Intimidation', prof: 0, advantage: false, stat: 'cha' },
      { label: 'Investigation', prof: 0, advantage: false, stat: 'int' },
      { label: 'Medicine', prof: 0, advantage: false, stat: 'wis' },
      { label: 'Perception', prof: 0, advantage: false, stat: 'wis' },
      { label: 'Performance', prof: 0, advantage: false, stat: 'cha' },
      { label: 'Persuasion', prof: 0, advantage: false, stat: 'cha' },
      { label: 'Science', prof: 0, advantage: false, stat: 'int' },
      { label: 'Slight of Hand', prof: 0, advantage: false, stat: 'dex' },
      { label: 'Stealth', prof: 0, advantage: false, stat: 'dex' },
      { label: 'Survival', prof: 0, advantage: false, stat: 'wis' },
      { label: 'Vehicle Handling', prof: 0, advantage: false, stat: 'dex' }
    ],
    proficiencies: {
      stats: {
        str: false, dex: false, con: false, int: false, wis: false, cha: false
      },
      armor: {
        light: false,
        medium: false,
        heavy: false
      },
      weapons: {
        pistol: false,
        smg: false,
        assault_rifle: false,
        shotgun: false,
        sniper_rifle: false,
        melee: false,
        heavy_weapons: false
      },
      other: []
    },
    armor: [],
    weapons: [],
    powers: [],
    tech: {
      tech_points: 1
    },
    biotics: {
      spell_slots: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    }
  } */
})

export const getters = {
  character: state => state.character
}

export const mutations = {
  save (state, data) {
    state.character = cloneDeep(data)
  }
}
