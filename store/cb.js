import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
  characterIdIndex: 0,
  characters: {},
  characterStartState: {
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
      },
      shields: {
        value: 0,
        max: 5
      },
      barrier: {
        uses: {
          value: 5,
          max: 5
        },
        ticks: {
          value: 5,
          max: 5
        }
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
    builder: {
      currentStep: 1
    },
    notes: '',
    createdAt: 1615572574654,
    changedAt: 1615572574654,
    localId: 'temp-x7vniqzfa'
  }
})

export const getters = {
  characters: state => state.characters,
  characterStartState: state => state.characterStartState,
  getCharacterHealth: state => (cid) => {
    const c = state.characters[cid].character
    const health = {
      hitPointsMax: 0
    }
    for (const cls of c.classes) {
      for (const hp of cls.hitPoints) {
        health.hitPointsMax += hp
      }
    }
    health.hitPointsLost = c.currentStats.hitPointsLost
    health.temporaryHitPoints = c.currentStats.temporaryHitPoints
    health.deathSaves = c.currentStats.deathSaves
    health.shields = c.currentStats.shields
    health.barrier = c.currentStats.barrier
    return health
  }
}

export const mutations = {
  UPDATE_CHARACTER (state, { cid, attr, value }) {
    if (!state.characters[cid]) {
      console.error('Unable to assign values to selected character. Please make sure the character id is set in the state and is defined')
      return
    }
    const character = cloneDeep(state.characters[cid].character)
    if (typeof attr === 'string' && attr.includes('.')) {
      let schema = character // a moving reference to internal objects within obj
      const pList = attr.split('.')
      const len = pList.length
      for (let i = 0; i < len - 1; i++) {
        const elem = pList[i]
        if (!schema[elem]) {
          schema[elem] = {}
        }
        schema = schema[elem]
      }
      schema[pList[len - 1]] = value
    } else {
      character[attr] = value
    }
    character.changedAt = new Date().getTime()
    state.characters[cid].character = character
  },
  DELETE_CHARACTER (state, { name, cid }) {
    // if obj with matching id exists, update it. If not, insert it
    console.log({ name, cid })
    if (state.characters[cid] && state.characters[cid].character) {
      if (name === state.characters[cid].character.name) {
        delete state.characters[cid]
        return
      }
    }
    console.error('Unable to remove character with id: ' + cid)
  },
  UPDATE_CHARACTERS (state, obj) {
    // if obj with matching id exists, update it. If not, insert it
    state.characters = { ...state.characters, [obj.id]: { character: obj, order: state.characters.length } }
  },
  LOAD_CHARACTER_FROM_FILE (state, data) {
    state.character = cloneDeep(data)
  }
}

/*
export const actions = {

}
*/
