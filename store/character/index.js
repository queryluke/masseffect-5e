import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import jsonpack from 'jsonpack/main'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import identString from '~/mixins/indentString'

function updateCharacter ({ oldValue, attr, value }) {
  const character = cloneDeep(oldValue)
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
  return character
}

export const state = () => ({
  character: null,
  id: null,
  customBackground: {
    id: 'custom-background',
    name: 'Custom Background',
    mechanics: [],
    html: '<p>Use the character sheet settings to add any proficiencies</p>'
  },
  viewOnly: false
})

export const getters = {
  character: (state) => {
    return state.character
  },
  characterReady: (state, getters) => {
    if (!getters.character) {
      return false
    }
    return getters.character.species && getters.character.classes.length > 0 && Object.entries(getters.character.abilityScores).every(i => i[1].value)
  },
  id: state => state.id,
  image: (state, getters) => getters.character.image || (getters.character.species ? getters['species/species'].bodyImg : false) || require('~/assets/images/me5e_logo_450w.png'),
  identString: (state, getters, rootState, rootGetters) => {
    const classes = rootGetters['character/klasses/klassesList']
    const subclasses = rootGetters['character/klasses/subklassesList']
    const species = [...rootGetters['character/species/speciesList'], rootState.character.species.customSpecies]
    return identString(getters.character, classes, species, subclasses).replace(/(\{\{ ordinal_levels-\d\d? }})/g, (sub) => {
      const level = sub.split(' ')[1].split('-')[1]
      const ordinals = [null, '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th']
      return ordinals[level]
    })
  },
  logs: (state, getters, rootState, rootGetters) => {
    if (rootGetters['auth/isAuthenticated']) {
      // some call to get logs from API
    } else {
      return rootState.characters.localLogs[getters.id]
    }
  },
  profBonus: (state, getters, rootState, rootGetters) => {
    return [0, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6][rootGetters['character/klasses/level']]
  },
  speeds: (state, getters, rootState, rootGetters) => {
    const speeds = {
      walk: null,
      swim: null,
      fly: null,
      climb: null,
      burrow: null
    }
    for (const speed of Object.keys(speeds)) {
      if (getters.character.settings.speeds[speed]) {
        speeds[speed] = {
          type: 'speed',
          speed,
          distance: getters.character.settings.speeds[speed],
          note: 'overridden',
          bonus: 0
        }
        continue
      }
      const mSpeeds = rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'speed' && i.speed === speed)
      if (mSpeeds.length) {
        const highestSpeed = mSpeeds.sort((a, b) => b.distance - a.distance)[0]
        const bonusSpeed = rootGetters['character/mechanics/mechanics']
          .filter(i => i.type === 'speed-bonus' && i.value.includes(speed))
          .reduce((acc, curr) => acc + rootGetters['character/mechanics/mcBonus'](curr.bonus), 0)
        speeds[speed] = {
          ...highestSpeed,
          distance: highestSpeed.distance + bonusSpeed
        }
      }
    }
    return speeds
  },
  backgroundsList: (state, getters, rootState, rootGetters) => {
    const official = rootGetters.getData('backgrounds')
    const homebrew = [state.customBackground]
    return [...official, ...homebrew]
  },
  background: (state, getters) => {
    return getters.backgroundsList.find(i => i.id === getters.character.background)
  },
  backgroundMechanics: (state, getters) => {
    if (!getters.background) {
      return []
    }
    return [{
      path: `background/${getters.background.id}`,
      mechanics: getters.background.mechanics
    }]
  },
  brewsAsFeatures: (state, getters) => {
    return getters.character.brews.map((i) => {
      return {
        name: i.name,
        type: i.type,
        html: i.html,
        mechanics: [
          {
            type: i.type,
            resource: i.mechanics.uses
              ? {
                  displayType: 'checkbox',
                  reset: i.mechanics.recharge,
                  max: { type: 'flat', value: i.mechanics.uses },
                  id: i.id
                }
              : false,
            moreInfo: {
              bind: i.html
            }
          }
        ]
      }
    })
  }
}

export const mutations = {
  SET_CHARACTER (state, character) {
    state.character = character
  },
  SET_CHARACTER_ID (state, value) {
    state.id = value
  },
  SET_VIEW_ONLY (state, value) {
    state.viewOnly = value
  }
}

export const actions = {
  async FETCH_CB_DATA ({ dispatch }) {
    await dispatch('FETCH_LOTS', [
      'species', 'traits', 'weapons', 'armor', 'mods', 'powers', 'feats', 'backgrounds', 'classes', 'class-features',
      'subclasses', 'character-progression', 'skills', 'gear', 'tool-profs', 'weapon-properties', 'conditions',
      'edges', 'actions'
    ], { root: true })
  },
  async LOAD_CHARACTER ({ dispatch, commit, rootGetters, getters, rootState }, id) {
    // TODO: need to try this and on a 404, try local, and if that also fails, return false
    if (rootGetters['auth/isAuthenticated']) {
      try {
        const character = await dispatch('api/QUERY', { query: 'getCharacter', variables: { id } }, { root: true })
        commit('SET_CHARACTER_ID', character.id)
        let characterData = jsonpack.unpack(character.data)
        let triggerMigration = false
        const viewOnly = character.owner !== rootGetters['auth/username']
        if (characterData.meta.version !== rootState.cbVersion) {
          characterData = await dispatch('character/migrator/migrate', characterData, { root: true })
          triggerMigration = true
        }
        commit('SET_VIEW_ONLY', viewOnly)
        commit('SET_CHARACTER', characterData)
        if (triggerMigration && !viewOnly) {
          characterData.meta.remote = true
          await dispatch('REMOTE_UPDATE_CHARACTER')
        }
      } catch (e) {
        await dispatch('local/LOAD_CHARACTER', id)
      }
    } else {
      await dispatch('local/LOAD_CHARACTER', id)
    }
    return getters.character
  },
  UPDATE_CHARACTER ({ dispatch, rootGetters, commit, getters, state }, { attr, value }) {
    if (state.viewOnly) {
      return
    }
    const newValue = updateCharacter({ oldValue: getters.character, attr, value })
    commit('SET_CHARACTER', newValue)
    if (rootGetters['auth/isAuthenticated'] && newValue.meta.remote) {
      if (rootGetters['user/search'] !== 'syncing') {
        commit('user/SET_SYNC_STATUS', 'editing', { root: true })
      }
      dispatch('DEBOUNCED_REMOTE_UPDATE_CHARACTER')
    } else {
      dispatch('characters/UPSERT_LOCAL_CHARACTER', newValue, { root: true })
    }
  },
  DEBOUNCED_REMOTE_UPDATE_CHARACTER: debounce(({ dispatch }) => {
    dispatch('REMOTE_UPDATE_CHARACTER')
  }, 10000
  ),
  async REMOTE_UPDATE_CHARACTER ({ dispatch, commit, rootGetters, getters }) {
    if (!getters.character.meta.remote) {
      return
    }
    try {
      commit('user/SET_SYNC_STATUS', 'syncing', { root: true })
      await dispatch('api/MUTATE', {
        mutation: 'updateCharacter',
        input: {
          id: getters.id,
          owner: rootGetters['auth/username'],
          data: jsonpack.pack(getters.character)
        }
      }, { root: true })
      commit('user/SET_SYNC_STATUS', 'saved', { root: true })
    } catch (e) {
      commit('user/SET_SYNC_STATUS', 'error', { root: true })
      console.log(e)
    }
  },
  async ROLL ({ dispatch, rootGetters }, payload) {
    // ...stuff that rolls the dice
    const roll = new DiceRoll(payload.roll)
    const output = {
      data: {
        ...payload,
        result: roll.total,
        subtitle: payload.subtitle || rootGetters['character/character'].name,
        type: 'card',
        text: '<h2> Result: ' + roll.total + '</h2><div class="pt-2"><i>' + roll.output + '</i></div>',
        timestamp: new Date()
      }
    }
    await dispatch('LOG_WRITE', output)
  },
  async LOG_WRITE ({ rootGetters, dispatch }, payload) {
    if (rootGetters['auth/isAuthenticated']) {
      // call API to write to DB
    } else {
      await dispatch('local/LOCAL_LOG_WRITE', payload) // note calling this from a separate vuex module
    }
  },
  async LOG_DESTROY ({ rootGetters, dispatch }) {
    if (rootGetters['auth/isAuthenticated']) {
      // call API to write to DB
    } else {
      await dispatch('local/LOCAL_LOG_DESTROY') // note calling this from a separate vuex module
    }
  }
}
